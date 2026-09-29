# Design Decision Record

## Adopt Emerald, Cream, and Soft Gray as the site palette

- **Status:** Accepted
- **Date:** 2026-09-28

### Decision

Use Emerald (`#10B981`), Cream (`#FFFBF0`), and Soft Gray (`#E5E7EB`) as the default palette for future site design and UI changes.

### Roles

- Emerald is the primary accent for actions, selected states, and highlights.
- Cream is the primary page and content-surface color.
- Soft Gray supports borders, dividers, and secondary UI details.

### Rationale

A consistent palette makes future pages and component updates feel cohesive while retaining a warm light surface, a clear action accent, and a restrained neutral.

### Accessibility and implementation

Keep text readable against each surface; retain dark foreground colors where needed rather than forcing the three palette colors into every text role. Define reusable design tokens and verify focus visibility and contrast when implementing components.
