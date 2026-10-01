import { useState } from 'react';
import { ArrowUpRight, Code2, Download, Mail, Copy } from 'lucide-react';
import { content } from '../content';
import { GhostPhoto, NextPill } from '../components';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const contact = content.contact;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(content.links.email);
    } catch {
      const field = document.createElement('textarea');
      field.value = content.links.email;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.append(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <footer
      id={contact.id}
      data-section
      className='contact section-shell section-wrap'
    >
      <GhostPhoto src='/images/quill.svg' className='ghost-contact' />
      <p className='contact-watermark' aria-hidden='true'>
        {content.who.profileHeading.split(' ')[2]}
      </p>
      <a
        className='contact-seal'
        href='#top'
        aria-label={contact.sealAlt}
        title={contact.sealAlt}
      >
        <svg viewBox='0 0 180 180' aria-hidden='true' focusable='false'>
          <defs>
            <path
              id='contact-seal-ring'
              d='M90 90m-67 0a67 67 0 1 1 134 0a67 67 0 1 1-134 0'
            />
          </defs>
          <circle cx='90' cy='90' r='78' />
          <text>
            <textPath href='#contact-seal-ring'>{contact.seal}</textPath>
          </text>
          <text className='seal-initial' x='90' y='109' textAnchor='middle'>
            {contact.sealInitial}
          </text>
        </svg>
      </a>
      <div className='contact-row' data-reveal>
        <h2>{contact.title}</h2>
        <p>
          {contact.body}{' '}
          <ArrowUpRight className='inline-arrow' size={17} aria-hidden='true' />
        </p>
        <div className='contact-email-group'>
          <button
            className='email-copy'
            type='button'
            onClick={copyEmail}
            aria-label={contact.copyEmailLabel}
          >
            <span>{copied ? contact.copied : content.links.email}</span>
            <Copy size={15} aria-hidden='true' />
          </button>
          <a
            className='email-icon'
            href={content.links.emailHref}
            aria-label={content.labels.email}
            title={content.labels.email}
          >
            <Mail size={16} aria-hidden='true' />
          </a>
        </div>
      </div>
      <div className='contact-actions' data-reveal>
        <a
          className='filled-action'
          href={content.links.resume}
          target='_blank'
          rel='noreferrer'
        >
          <Download size={15} aria-hidden='true' /> {contact.resume}
        </a>
        <a
          className='outlined-action'
          href={content.links.github}
          target='_blank'
          rel='noreferrer'
        >
          <Code2 size={15} aria-hidden='true' /> {contact.github}{' '}
          <ArrowUpRight size={14} aria-hidden='true' />
        </a>
      </div>
      <p className='contact-footer'>{contact.footer}</p>
      <NextPill
        href='#top'
        label={contact.next}
        prefix={content.labels.again}
      />
    </footer>
  );
}
