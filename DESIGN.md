---
name: High-Tech Terminal
colors:
  surface: '#12131a'
  surface-dim: '#12131a'
  surface-bright: '#383940'
  surface-container-lowest: '#0c0e14'
  surface-container-low: '#1a1b22'
  surface-container: '#1e1f26'
  surface-container-high: '#282a31'
  surface-container-highest: '#33343c'
  on-surface: '#e2e1eb'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e2e1eb'
  inverse-on-surface: '#2f3037'
  outline: '#8b90a0'
  outline-variant: '#414755'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#4b8eff'
  on-primary-container: '#00285c'
  inverse-primary: '#005bc1'
  secondary: '#c8c6c9'
  on-secondary: '#303033'
  secondary-container: '#47464a'
  on-secondary-container: '#b6b4b8'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#929090'
  on-tertiary-container: '#2a2a29'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#e4e1e5'
  secondary-fixed-dim: '#c8c6c9'
  on-secondary-fixed: '#1b1b1e'
  on-secondary-fixed-variant: '#47464a'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#12131a'
  on-background: '#e2e1eb'
  surface-variant: '#33343c'
typography:
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
spacing:
  base: 4px
  unit-1: 4px
  unit-2: 8px
  unit-4: 16px
  unit-8: 32px
  gutter: 16px
  margin: 24px
---

## Brand & Style

The design system is engineered for precision, speed, and technical depth. It draws inspiration from mission-control interfaces and advanced command-line environments, targeting a developer-centric audience that values information density and functional clarity over decorative elements.

The style is a hybrid of **High-Tech Minimalism** and **Digital Brutalism**. It utilizes a "pitch-black" foundation to reduce eye strain and maximize the contrast of data points. The aesthetic is defined by its rigidity, utilizing subtle grid overlays and structural lines to create a sense of infinite, organized space. Every element should feel like a calculated piece of machinery—unapologetically digital, ultra-precise, and futuristic.

## Colors

The palette is strictly controlled to maintain a focused environment. 

- **Background:** The absolute base is `#000000`. This is non-negotiable to ensure the "Terminal" feel.
- **Accent:** Electric Blue (`#007AFF`) is used sparingly for primary actions, focus states, and critical data highlights. It should feel like a light source emitting from the screen.
- **Surfaces:** A monochromatic grayscale defines the hierarchy. Use higher-value grays for elevated panels and lower-value grays for recessed areas.
- **Data Status:** While primarily monochromatic, utility colors (Success: #10B981, Warning: #F59E0B, Error: #EF4444) may be used in desaturated forms for status indicators only.

## Typography

Typography is used as a functional tool for data visualization. 

- **Headlines & Labels:** Uses **JetBrains Mono**. The monospaced nature emphasizes the "terminal" aesthetic and ensures that characters align perfectly in data tables and headers.
- **Body Text:** Uses **Geist**. This provides a clean, highly legible sans-serif for longer descriptions or documentation, maintaining a technical but modern feel.
- **Scaling:** Headlines are kept relatively small to maximize screen real estate. Use uppercase for labels to create a distinctive visual rhythm.
- **Formatting:** Use bold weights only for critical emphasis. Underlining is reserved for interactive text links in the Electric Blue accent.

## Layout & Spacing

This design system operates on a rigorous **4px / 8px grid**. Precision is paramount; every element must align to the grid to prevent visual "jitter."

- **Layout Model:** A 12-column fluid grid for desktop, moving to a single-column layout for mobile. 
- **Grid Pattern:** A subtle background pattern (1px dots or lines at 32px intervals) should be visible at all times to reinforce the "blueprint" feel.
- **Density:** High density is preferred. Padding should be sufficient for legibility but lean towards compact rather than spacious.
- **Breakpoints:**
  - Mobile: < 600px (Margins: 16px, Gutters: 8px)
  - Tablet: 600px - 1024px (Margins: 24px, Gutters: 16px)
  - Desktop: > 1024px (Margins: 32px, Gutters: 16px)

## Elevation & Depth

In a pitch-black environment, traditional shadows are ineffective. This design system communicates depth through **Tonal Layering** and **Luminescence**.

- **Tonal Layers:** Surfaces "rise" by becoming lighter. The background is `#000000`, the next layer (cards/containers) is `#09090B`, and the active/hover state is `#18181B`.
- **Borders:** Use low-contrast 1px outlines (`#27272A`) to define component boundaries. 
- **Luminescence:** Interactive elements use the primary Electric Blue to create "glow" effects. Instead of a shadow, an active button might have a subtle external glow (box-shadow: 0 0 8px rgba(0, 122, 255, 0.4)).
- **Glass:** Occasional use of backdrop blurs (12px) is permitted for transient overlays like tooltips, but the background color must remain a dark gray tint.

## Shapes

The shape language is strictly **Sharp**. 

- **Radius:** All elements—including buttons, cards, input fields, and modals—must have a `0px` border radius. 
- **Visual Logic:** Rounded corners represent softness and approachability; sharp corners represent industrial precision and technical efficiency. 
- **Exceptions:** No exceptions are permitted. Even progress bars and chips must maintain 90-degree corners to preserve the structural integrity of the grid.

## Components

### Buttons
- **Primary:** Solid `#007AFF` with black text. Sharp corners.
- **Secondary:** Transparent with a 1px `#27272A` border. Text is white.
- **Ghost:** No border, text is `#A1A1AA`. Becomes white on hover.

### Input Fields
- Background: `#09090B`.
- Border: 1px `#27272A`.
- Active State: Border becomes `#007AFF` with a vertical "cursor" blink in the same color.

### Chips & Tags
- Rectangular, sharp-edged.
- Monochromatic (Gray scale) unless indicating a specific status.
- Font: JetBrains Mono (Label-sm).

### Lists & Data Tables
- Use subtle 1px horizontal dividers.
- Alternate row colors are not permitted; use hover states (background: `#121212`) to guide the eye.
- Column headers are always uppercase JetBrains Mono.

### Cards
- No shadows. Define boundaries via a 1px border (`#18181B`) or a slightly lighter background than the canvas.
- Title bars should often have a different background tint to act as a "handle."

### Progress & Loading
- Use "stepped" progress bars (blocks) rather than smooth fills to emphasize the digital/discrete nature of data.