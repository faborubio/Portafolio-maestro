---
name: Cyber-Humanist Portfolio
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#ffdb9d'
  on-secondary: '#412d00'
  secondary-container: '#feb700'
  on-secondary-container: '#6b4b00'
  tertiary: '#f7f7ff'
  on-tertiary: '#293041'
  tertiary-container: '#d3dbf0'
  on-tertiary-container: '#586072'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffdea8'
  secondary-fixed-dim: '#ffba20'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#dbe2f8'
  tertiary-fixed-dim: '#bfc6db'
  on-tertiary-fixed: '#141c2b'
  on-tertiary-fixed-variant: '#3f4758'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
  obsidian-base: '#050a14'
  navy-surface: '#0a1221'
  glass-stroke: rgba(255, 255, 255, 0.1)
  grid-line: rgba(0, 242, 255, 0.05)
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  section-gap: 120px
---

## Brand & Style

This design system is built for a high-tier developer portfolio that balances technical precision with human accessibility. The brand personality is **intelligent, futuristic, and meticulous**. It aims to evoke a sense of "digital craftsmanship," where the code is as beautiful as the interface.

The design style is a sophisticated blend of **Glassmorphism** and **Modern Minimalist SaaS**. It utilizes translucent layers to represent depth and complex architecture, while a foundational **Subtle Grid** pattern provides an underlying structure that references development environments (IDEs). The emotional response should be one of trust in the developer's technical prowess, paired with the warmth of a collaborative partner.

## Colors

The palette is anchored in a deep **Obsidian** and **Navy** foundation to minimize eye strain and provide a premium "pro-tool" backdrop. 

- **Primary Cyan (#00f2ff):** Used for critical actions, terminal highlights, and active states. It represents the "energy" of the code.
- **Soft Amber (#ffb800):** A warm counterpoint used sparingly for warnings, specialized tags, or "human" elements like a call-to-action to connect.
- **Surface Strategy:** The background uses a gradient from `#050a14` to `#0a1221`. Glassmorphic cards use a semi-transparent version of the Navy surface with a subtle `glass-stroke` to define edges without adding heavy visual weight.

## Typography

The typography strategy employs a "Geist/Mono" duality. **Geist** provides a clean, neutral, and highly legible sans-serif for the primary narrative and interface elements. **JetBrains Mono** is reserved for technical metadata, labels, and code snippets, grounding the design in the developer's medium.

- **Headlines:** Use tight letter spacing and heavy weights to create a commanding presence.
- **Body:** Generous line height (1.6) ensures long-form project descriptions remain readable.
- **Labels:** Always use Mono in all-caps for a "system output" feel.

## Layout & Spacing

The layout is governed by a **Fixed Grid** on desktop, centered with a maximum width of 1200px. A subtle 32px CSS grid pattern is rendered in the background to visually reinforce the technical theme.

- **Rhythm:** An 8px linear scale is used for all internal component spacing and padding.
- **Sections:** Large vertical gaps (120px+) create a sense of breathing room and premium pacing.
- **Responsive:** On mobile, margins shrink to 20px, and the grid pattern should be simplified or reduced in opacity to maintain clarity on smaller screens.

## Elevation & Depth

This design system rejects traditional box-shadows in favor of **Tonal Layers** and **Backdrop Blurs**.

1.  **Level 0 (Base):** The deep obsidian background with the subtle cyan grid pattern.
2.  **Level 1 (Cards/Surfaces):** Semi-transparent Navy (`rgba(10, 18, 33, 0.7)`) with a `20px` backdrop blur. Edges are defined by a `1px` solid stroke of `glass-stroke`.
3.  **Level 2 (Popovers/Modals):** Increased transparency and a slight outer glow using the Primary Cyan at 5% opacity to simulate light emitting from the screen.

## Shapes

The shape language is **Soft (0.25rem / 4px)**. This choice leans away from the "bubbly" feel of consumer apps and toward the "sharp but refined" aesthetic of professional developer tools like VS Code or terminal emulators.

- **Standard Elements:** 4px radius (Buttons, Input fields).
- **Large Containers:** 8px radius (Project cards, Modals).
- **Accents:** Use hard 90-degree corners for decorative elements like code-bracket borders to contrast with the soft-rounded UI components.

## Components

### Buttons
- **Primary:** Solid Cyan background with Obsidian text. No shadow, but a subtle Cyan outer glow on hover.
- **Secondary:** Ghost style. Transparent background, 1px Cyan border, Cyan text.
- **Tertiary/Connect:** Soft Amber text with a bottom underline that expands on hover.

### Cards
Project cards should feature a "glass" texture. Use a `1px` top-left highlight and a `1px` bottom-right shadow-stroke to give the glass a sense of physical thickness.

### Input Fields
Darker than the surface background. Use JetBrains Mono for the placeholder text to emphasize the "command line" feel. Focus state is a simple 1px Primary Cyan border.

### Chips / Tags
Small, Mono-font badges. Use low-saturation versions of the primary/secondary colors for background fills (e.g., Cyan at 10% opacity) with high-contrast text.

### Visual Accents
- **Syntax Highlighting:** Apply code-themed coloring to certain keywords in the headlines (e.g., a "Hello World" title where "Hello" is Primary Cyan and "World" is Soft Amber).
- **Scrollbar:** Minimalist, thin Cyan bar with no track background.