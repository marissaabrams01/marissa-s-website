# Site Color Palette Specification

## Palette

| Token | Color | Hex | Intended use |
| --- | --- | --- | --- |
| Emerald | Primary accent | `#10B981` | Primary actions, selected states, key highlights, and restrained decorative accents. |
| Cream | Primary surface | `#FFFBF0` | Main page backgrounds and spacious content surfaces. |
| Soft Gray | Neutral support | `#E5E7EB` | Borders, dividers, subtle surface contrast, and secondary UI details. |

## Application

- Treat these colors as the default palette for new and redesigned site UI.
- Define reusable CSS custom properties or framework tokens rather than repeating raw hex values.
- Use Emerald deliberately; do not make every element an accent.
- Use existing dark foreground colors for readable text on Cream. Do not use Emerald for small text on Cream or Cream text on Emerald without verifying contrast.
- Keep focus indicators and interactive states clearly visible and keyboard accessible.
- Preserve established component structure and responsive behavior when applying the palette.
