'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './PaperCrumple.css';

const noop = () => {};
const EMPTY_STYLE = {};
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const finite = (value, fallback) => (Number.isFinite(value) ? value : fallback);

function makeGrain(seed) {
  let value = seed | 0;
  const data = new Uint8Array(64 * 64 * 4);
  for (let index = 0; index < data.length; index += 4) {
    value = (value * 1664525 + 1013904223) | 0;
    const shade = 190 + ((value >>> 24) % 66);
    data[index] = data[index + 1] = data[index + 2] = shade;
    data[index + 3] = 255;
  }
  const texture = new THREE.DataTexture(data, 64, 64, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 7);
  texture.needsUpdate = true;
  return texture;
}

function loadTexture(loader, url, textures) {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve(null);
      return;
    }
    loader.load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;
        textures.add(texture);
        resolve(texture);
      },
      undefined,
      () => reject(new Error(`Unable to load paper image: ${url}`)),
    );
  });
}

export default function PaperCrumple({
  src,
  alt = 'Crumplable paper print',
  backSrc = '',
  width = 180,
  height = 230,
  sceneHeight = 290,
  imageFit = 'contain',
  releaseBehavior = 'restore',
  crumpleAmount = 0.78,
  crumpleDuration = 0.55,
  releaseDuration = 0.5,
  foldCount = 5,
  foldSharpness = 0.65,
  wrinkleDepth = 0.55,
  creaseStrength = 0.18,
  paperColor = '#f7f1f5',
  roughness = 0.92,
  paperTexture = 0.08,
  lightIntensity = 1.8,
  lightAngle = -35,
  shadow = true,
  shadowOpacity = 0.18,
  draggable = true,
  dragRotation = 8,
  dragRadius = 100,
  returnToOrigin = true,
  rotation = 0,
  seed = 7,
  detail = 36,
  disabled = false,
  resetKey = 0,
  onStateChange = noop,
  onError = noop,
  className = '',
  style = EMPTY_STYLE,
}) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const hitRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const hit = hitRef.current;
    if (!root || !canvas || !hit) return undefined;

    let renderer;
    let disposed = false;
    let ready = false;
    let frame = 0;
    let previousTime = 0;
    let held = false;
    let keyboard = false;
    let pointerId = null;
    let peakAmount = 0;
    let scale = 1;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let dragStartX = 0;
    let dragStartY = 0;
    let reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const values = {
      amount: { value: 0, target: 0 },
      memory: { value: 0, target: 0 },
      x: { value: 0, target: 0 },
      y: { value: 0, target: 0 },
      tiltX: { value: 0, target: 0 },
      tiltY: { value: 0, target: 0 },
    };
    const textures = new Set();
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthValue = Math.max(1, finite(width, 180));
    const heightValue = Math.max(1, finite(height, 230));
    const shortestSide = Math.min(widthValue, heightValue);
    const segments = Math.round(clamp(finite(detail, 36), 32, 72));
    const creasePhase = (Math.abs(finite(seed, 7)) % 97) * 0.071;

    let scene;
    let camera;
    let sheet;
    let geometry;
    let frontMaterial;
    let backMaterial;
    let floor;
    let floorMaterial;
    let positions;
    let original;
    let imageTexture;
    let backTexture;

    const publish = (state) => onStateChange?.(state);
    const reportError = (error) => {
      setStatus('error');
      onError?.(
        error instanceof Error
          ? error
          : new Error('Interactive paper unavailable.'),
      );
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const wake = () => {
      if (!frame && ready && !disposed && !document.hidden) {
        frame = requestAnimationFrame(render);
      }
    };
    const interpolate = (spring, factor) => {
      if (reduceMotion) {
        spring.value = spring.target;
      } else {
        spring.value += (spring.target - spring.value) * factor;
      }
      return Math.abs(spring.target - spring.value) > 0.001;
    };

    function deform() {
      if (!geometry || !positions || !original) return;
      const fold = clamp(values.amount.value, 0, 1);
      const residual = clamp(values.memory.value, 0, 1);
      const sharpness = clamp(finite(foldSharpness, 0.65), 0, 1);
      const depth = clamp(finite(wrinkleDepth, 0.55), 0, 2);
      const folds = Math.round(clamp(finite(foldCount, 5), 3, 16));
      const angularity = 1 + sharpness * 3;

      for (let index = 0; index < positions.length; index += 3) {
        const x = original[index];
        const y = original[index + 1];
        const nx = x / widthValue;
        const ny = y / heightValue;
        const waveA = Math.sin(
          (nx + ny * 0.73 + creasePhase) * Math.PI * folds,
        );
        const waveB = Math.cos(
          (nx - ny * 0.61 - creasePhase) * Math.PI * (folds + 1),
        );
        const crease =
          Math.sign(waveA) * Math.pow(Math.abs(waveA), angularity) * waveB;
        const compression = fold * (0.48 + depth * 0.06);
        const rippleX =
          Math.sin(ny * Math.PI * folds + creasePhase) *
          fold *
          widthValue *
          0.065;
        const rippleY =
          Math.sin(nx * Math.PI * (folds + 1) - creasePhase) *
          fold *
          heightValue *
          0.045;

        positions[index] = x * (1 - compression) + rippleX;
        positions[index + 1] = y * (1 - compression) + rippleY;
        positions[index + 2] =
          crease * (fold + residual * 0.5) * shortestSide * 0.12 * depth;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
      geometry.computeBoundingSphere();
    }

    function render(time) {
      frame = 0;
      if (disposed || !ready || document.hidden) return;
      const delta = previousTime
        ? Math.min(0.05, (time - previousTime) / 1000)
        : 1 / 60;
      previousTime = time;
      const amountDuration = held
        ? finite(crumpleDuration, 0.55)
        : finite(releaseDuration, 0.5);
      const factor = reduceMotion
        ? 1
        : Math.min(1, (delta * 6) / Math.max(0.06, amountDuration));
      let moving = false;
      moving = interpolate(values.amount, factor) || moving;
      moving = interpolate(values.memory, factor) || moving;
      moving = interpolate(values.x, Math.min(1, delta * 8)) || moving;
      moving = interpolate(values.y, Math.min(1, delta * 8)) || moving;
      moving = interpolate(values.tiltX, Math.min(1, delta * 7)) || moving;
      moving = interpolate(values.tiltY, Math.min(1, delta * 7)) || moving;
      peakAmount = Math.max(peakAmount, values.amount.value);
      deform();
      sheet.position.set(values.x.value, -values.y.value, 0);
      sheet.rotation.set(
        values.tiltX.value,
        values.tiltY.value,
        THREE.MathUtils.degToRad(finite(rotation, 0)),
      );
      renderer.render(scene, camera);
      if (moving) wake();
    }

    function resize() {
      if (!renderer || !root || !camera || !sheet) return;
      const rect = root.getBoundingClientRect();
      const viewWidth = Math.max(1, rect.width);
      const viewHeight = Math.max(1, rect.height);
      camera.left = -viewWidth / 2;
      camera.right = viewWidth / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.position.z = Math.max(viewWidth, viewHeight) * 2;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(viewWidth, viewHeight, false);
      scale = Math.min(
        1,
        Math.max(1, viewWidth - 40) / widthValue,
        Math.max(1, viewHeight - 40) / heightValue,
      );
      sheet.scale.setScalar(scale);
      floor.scale.set(viewWidth * 3, viewHeight * 3, 1);
      root.style.setProperty('--pc-image-width', `${widthValue * scale}px`);
      root.style.setProperty('--pc-image-height', `${heightValue * scale}px`);
      wake();
    }

    function begin() {
      if (!ready || disabled || held) return;
      held = true;
      keyboard = false;
      peakAmount = values.amount.value;
      values.amount.target = clamp(finite(crumpleAmount, 0.78), 0, 1);
      setPressed(true);
      publish('holding');
      wake();
    }

    function finish(instant = false) {
      if (!held) return;
      held = false;
      hit.setAttribute('aria-pressed', 'false');
      setPressed(false);

      if (releaseBehavior === 'stay') {
        values.amount.target = values.amount.value;
        publish('crumpled');
      } else {
        values.amount.target = 0;
        if (releaseBehavior === 'creased') {
          values.memory.target = Math.max(
            values.memory.value,
            peakAmount * clamp(finite(creaseStrength, 0.18), 0, 1),
          );
          publish('creased');
        } else {
          values.memory.target = 0;
          publish('flat');
        }
      }

      values.tiltX.target = 0;
      values.tiltY.target = 0;
      if (returnToOrigin && releaseBehavior !== 'stay') {
        values.x.target = 0;
        values.y.target = 0;
      }
      if (instant || reduceMotion) {
        Object.values(values).forEach((spring) => {
          spring.value = spring.target;
        });
      }
      wake();
    }

    function pointerDown(event) {
      if (disabled || !ready || event.button !== 0 || !event.isPrimary) return;
      event.preventDefault();
      pointerId = event.pointerId;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      dragStartX = values.x.value;
      dragStartY = values.y.value;
      hit.setPointerCapture(event.pointerId);
      begin();
    }

    function pointerMove(event) {
      if (!held || keyboard || event.pointerId !== pointerId || !draggable)
        return;
      const rect = root.getBoundingClientRect();
      const limitX = Math.min(
        finite(dragRadius, 100),
        Math.max(0, rect.width / 2 - (widthValue * scale) / 2 - 12),
      );
      const limitY = Math.min(
        finite(dragRadius, 100),
        Math.max(0, rect.height / 2 - (heightValue * scale) / 2 - 12),
      );
      values.x.target = clamp(
        dragStartX + event.clientX - pointerStartX,
        -limitX,
        limitX,
      );
      values.y.target = clamp(
        dragStartY + event.clientY - pointerStartY,
        -limitY,
        limitY,
      );
      const maxTilt = reduceMotion
        ? 0
        : THREE.MathUtils.degToRad(clamp(finite(dragRotation, 8), 0, 40));
      values.tiltX.target =
        clamp((event.clientY - pointerStartY) / 160, -1, 1) * maxTilt;
      values.tiltY.target =
        clamp((event.clientX - pointerStartX) / 160, -1, 1) * maxTilt;
      wake();
    }

    function pointerUp(event) {
      if (event.pointerId !== pointerId) return;
      pointerId = null;
      finish();
    }

    function keyDown(event) {
      if (disabled || !ready) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        if (held) finish(true);
        values.amount.value = values.amount.target = 0;
        values.memory.value = values.memory.target = 0;
        values.x.value = values.x.target = 0;
        values.y.value = values.y.target = 0;
        publish('flat');
        wake();
        return;
      }
      if ((event.key === ' ' || event.key === 'Enter') && !held) {
        event.preventDefault();
        begin();
        keyboard = true;
        hit.setAttribute('aria-pressed', 'true');
        return;
      }
      if (
        held &&
        keyboard &&
        ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)
      ) {
        event.preventDefault();
        const step = event.shiftKey ? 24 : 10;
        const limit = Math.max(0, finite(dragRadius, 100));
        if (event.key === 'ArrowLeft')
          values.x.target = clamp(values.x.target - step, -limit, limit);
        if (event.key === 'ArrowRight')
          values.x.target = clamp(values.x.target + step, -limit, limit);
        if (event.key === 'ArrowUp')
          values.y.target = clamp(values.y.target - step, -limit, limit);
        if (event.key === 'ArrowDown')
          values.y.target = clamp(values.y.target + step, -limit, limit);
        wake();
      }
    }

    function keyUp(event) {
      if (keyboard && (event.key === ' ' || event.key === 'Enter')) {
        event.preventDefault();
        keyboard = false;
        finish(true);
      }
    }

    function handleMotionChange() {
      reduceMotion = media.matches;
      if (reduceMotion && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        Object.values(values).forEach((spring) => {
          spring.value = spring.target;
        });
        deform();
        if (ready) renderer.render(scene, camera);
      } else {
        wake();
      }
    }

    let frontTexture;
    let rearTexture;
    let grain;
    let resizeObserver;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.shadowMap.enabled = shadow;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 5000);
      camera.position.z = 1000;
      const ambient = new THREE.HemisphereLight(0xffffff, 0xb0a3b0, 1.3);
      const angle = THREE.MathUtils.degToRad(finite(lightAngle, -35));
      const light = new THREE.DirectionalLight(
        0xffffff,
        Math.max(0, finite(lightIntensity, 1.8)),
      );
      light.position.set(Math.sin(angle) * 250, Math.cos(angle) * 250, 600);
      light.castShadow = shadow;
      scene.add(ambient, light);

      const segmentsX = Math.round(
        clamp(segments * (widthValue / heightValue), 12, 72),
      );
      const segmentsY = Math.round(
        clamp(segments * (heightValue / widthValue), 12, 72),
      );
      geometry = new THREE.PlaneGeometry(
        widthValue,
        heightValue,
        segmentsX,
        segmentsY,
      );
      positions = geometry.attributes.position.array;
      original = Float32Array.from(positions);
      const materialOptions = {
        color: 0xffffff,
        roughness: clamp(finite(roughness, 0.92), 0, 1),
        metalness: 0,
        transparent: true,
        alphaTest: 0.035,
        side: THREE.FrontSide,
      };
      grain = makeGrain(finite(seed, 7));
      frontMaterial = new THREE.MeshStandardMaterial({
        ...materialOptions,
        bumpMap: grain,
        bumpScale: clamp(finite(paperTexture, 0.08), 0, 1) * 0.03,
      });
      backMaterial = new THREE.MeshStandardMaterial({
        ...materialOptions,
        color: paperColor,
        side: THREE.BackSide,
      });
      const front = new THREE.Mesh(geometry, frontMaterial);
      const back = new THREE.Mesh(geometry, backMaterial);
      front.castShadow = back.castShadow = shadow;
      front.receiveShadow = back.receiveShadow = shadow;
      sheet = new THREE.Group();
      sheet.add(front, back);
      scene.add(sheet);
      floorMaterial = new THREE.ShadowMaterial({
        opacity: clamp(finite(shadowOpacity, 0.18), 0, 1),
        depthWrite: false,
      });
      floor = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), floorMaterial);
      floor.position.z = -shortestSide * 0.08;
      floor.receiveShadow = true;
      scene.add(floor);
    } catch (error) {
      reportError(error);
      return undefined;
    }

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    Promise.all([
      loadTexture(loader, src, textures),
      loadTexture(loader, backSrc, textures),
    ])
      .then(([front, rear]) => {
        if (disposed) return;
        frontTexture = front;
        rearTexture = rear;
        const fitTexture = (texture) => {
          if (!texture) return;
          const imageAspect = texture.image.width / texture.image.height;
          const targetAspect = widthValue / heightValue;
          let repeatX = 1;
          let repeatY = 1;
          if (imageFit === 'cover') {
            if (imageAspect > targetAspect)
              repeatX = targetAspect / imageAspect;
            else repeatY = imageAspect / targetAspect;
          } else if (imageAspect > targetAspect) {
            repeatY = targetAspect / imageAspect;
          } else {
            repeatX = imageAspect / targetAspect;
          }
          texture.repeat.set(repeatX, repeatY);
          texture.offset.set((1 - repeatX) / 2, (1 - repeatY) / 2);
        };
        fitTexture(frontTexture);
        fitTexture(rearTexture);
        if (frontTexture) {
          frontMaterial.map = frontTexture;
          frontMaterial.needsUpdate = true;
        }
        if (rearTexture) {
          backMaterial.map = rearTexture;
          backMaterial.needsUpdate = true;
        }
        ready = true;
        setStatus('ready');
        hit.disabled = disabled;
        deform();
        resize();
        wake();
      })
      .catch(reportError);

    const visibility = () => {
      if (document.hidden && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else {
        wake();
      }
    };
    hit.addEventListener('pointerdown', pointerDown);
    hit.addEventListener('pointermove', pointerMove);
    hit.addEventListener('pointerup', pointerUp);
    hit.addEventListener('pointercancel', pointerUp);
    hit.addEventListener('lostpointercapture', pointerUp);
    hit.addEventListener('keydown', keyDown);
    hit.addEventListener('keyup', keyUp);
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', handleMotionChange);
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);
    resize();

    return () => {
      disposed = true;
      stop();
      if (pointerId !== null && hit.hasPointerCapture(pointerId))
        hit.releasePointerCapture(pointerId);
      hit.removeEventListener('pointerdown', pointerDown);
      hit.removeEventListener('pointermove', pointerMove);
      hit.removeEventListener('pointerup', pointerUp);
      hit.removeEventListener('pointercancel', pointerUp);
      hit.removeEventListener('lostpointercapture', pointerUp);
      hit.removeEventListener('keydown', keyDown);
      hit.removeEventListener('keyup', keyUp);
      document.removeEventListener('visibilitychange', visibility);
      media.removeEventListener('change', handleMotionChange);
      resizeObserver?.disconnect();
      geometry?.dispose();
      frontMaterial?.dispose();
      backMaterial?.dispose();
      floorMaterial?.dispose();
      floor?.geometry?.dispose();
      grain?.dispose();
      textures.forEach((texture) => texture.dispose());
      renderer?.dispose();
    };
  }, [
    src,
    alt,
    backSrc,
    width,
    height,
    imageFit,
    releaseBehavior,
    crumpleAmount,
    crumpleDuration,
    releaseDuration,
    foldCount,
    foldSharpness,
    wrinkleDepth,
    creaseStrength,
    paperColor,
    roughness,
    paperTexture,
    lightIntensity,
    lightAngle,
    shadow,
    shadowOpacity,
    draggable,
    dragRotation,
    dragRadius,
    returnToOrigin,
    rotation,
    seed,
    detail,
    disabled,
    resetKey,
    onStateChange,
    onError,
  ]);

  return (
    <div
      ref={rootRef}
      className={`paper-crumple ${className}`}
      style={{ height: sceneHeight, ...style }}
      data-status={status}
    >
      <canvas
        ref={canvasRef}
        className='paper-crumple-canvas'
        aria-hidden='true'
        style={{ visibility: status === 'ready' ? 'visible' : 'hidden' }}
      />
      {status !== 'ready' && (
        <img
          className='paper-crumple-fallback'
          src={src || undefined}
          alt={alt}
          draggable={false}
          style={{
            objectFit: imageFit,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        />
      )}
      <button
        ref={hitRef}
        type='button'
        className='paper-crumple-hit'
        disabled={disabled || status !== 'ready'}
        aria-label={`${alt}. Hold to crumple and drag. Keyboard: hold Space or Enter, arrow keys to move, Escape to reset.`}
        aria-pressed={pressed}
      />
      <span className='paper-crumple-focus' aria-hidden='true' />
      <span className='paper-crumple-sr' role='status'>
        {status === 'loading'
          ? 'Loading interactive paper.'
          : status === 'error'
            ? 'Interactive paper unavailable. Showing the original image.'
            : ''}
      </span>
    </div>
  );
}
