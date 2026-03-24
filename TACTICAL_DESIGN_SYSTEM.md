# Tactical Design System

## 🎨 Overview
A military/industrial-inspired design system that feels like a workshop manual or tactical gear - not a wellness app. Sharp, angular, utilitarian, and action-oriented.

## 🎯 Design Philosophy

**Core Principles:**
- **Utilitarian**: Function over form, but make function beautiful
- **Tactical**: Military precision, engineering mindset
- **Industrial**: Workshop aesthetic, tool-like feel
- **Angular**: Sharp edges, no rounded bubbles
- **Textured**: Metal, carbon fiber, technical grids
- **Bold**: Clear typography, high contrast, unmissable CTAs

## 🎨 Color Palette

### Base Blacks & Grays (Carbon/Steel)
```
tactical-black:     #0a0a0a  // Deep carbon black
tactical-carbon:    #0d0d0d  // Carbon fiber base
tactical-darkgray:  #1a1a1a  // Primary background
tactical-steel:     #1f1f1f  // Steel tone
tactical-gray:      #2a2a2a  // Mid gray
tactical-metal:     #333333  // Metal plate
tactical-lightgray: #3f3f3f  // Light gray
tactical-chrome:    #4a4a4a  // Chrome accent
```

### Military Greens
```
tactical-green-dark:   #2d3a22  // Dark military green
tactical-green:        #3d4f2f  // Standard military green
tactical-green-bright: #5a7043  // Bright tactical green
tactical-green-neon:   #7fa159  // Success/completion green
```

### Industrial Oranges
```
tactical-orange-dark:   #a34d12  // Dark industrial
tactical-orange:        #cc6119  // Primary action color
tactical-orange-bright: #e87528  // Hover state
tactical-orange-hot:    #ff8c3a  // Active/hot state
```

### Accent Colors
```
tactical-blue-steel:    #3d5a73  // Info/cool accent
tactical-red-alert:     #cc2936  // Danger/alert
tactical-yellow-caution: #d9a829  // Warning/caution
```

## 🔧 Textures & Patterns

### Carbon Fiber
```css
.bg-carbon
```
- Crosshatch diagonal pattern
- Subtle depth and dimensionality
- Use for: Hero sections, high-impact areas

### Metal Plate
```css
.bg-metal
```
- Brushed metal effect
- Gradient for depth
- Inset highlights/shadows
- Use for: Cards, containers, modals

### Technical Grid
```css
.bg-grid
```
- Subtle blueprint-style grid
- 20px spacing
- Low opacity for background
- Use for: Backgrounds, large containers

### Body Texture
- Automatic technical grid overlay
- 50px spacing
- 3% opacity
- Always present, subtle

## ⚡ Angular UI Elements

### Sharp Corners (Clip-path)
```css
.corner-cut      // All corners cut at 8px
.corner-cut-tl   // Top-left corner only
.angle-right     // Angled right edge (arrow effect)
```

### Default Element Shapes:
- **Buttons**: 4px corner cuts
- **Cards**: 8px corner cuts  
- **Inputs**: 3px corner cuts
- **Progress bars**: 2px corner cuts

**No border-radius!** Everything uses `clip-path` for angular, industrial look.

## 🔤 Typography

### Font Stack
```css
body: System fonts (-apple-system, Segoe UI, Roboto, etc.)
      Medium weight (500), tight letter-spacing

Headings: Bold (700), uppercase, wide letter-spacing (0.05em)

Monospace: 'Courier New', Courier, monospace (for tactical/tech elements)
```

### Usage
- **All headings**: UPPERCASE by default
- **Buttons**: UPPERCASE, wide tracking (tracking-widest)
- **Body**: Normal case, medium weight
- **Codes/Times**: Monospace font-tactical

### Hierarchy
```
H1: 5xl, bold, uppercase, 0.05em spacing
H2: 3xl, bold, uppercase, 0.05em spacing
H3: 2xl, bold, uppercase, 0.05em spacing
H4: xl, bold, uppercase, 0.05em spacing
```

## 🎛️ Components

### Buttons

#### Primary Button (.btn-primary)
- **Color**: Orange gradient (#cc6119 → #e87528)
- **Shape**: Angular clip-path (4px cuts)
- **Shadow**: 3px drop shadow + inset highlight
- **Hover**: Lifts 1px, shadow expands
- **Active**: Depresses 1px
- **Typography**: UPPERCASE, tracking-widest

#### Secondary Button (.btn-secondary)
- **Color**: Steel gray (#1f1f1f → #333333)
- **Border**: 2px light gray, glows green on hover
- **Shape**: Angular clip-path (4px cuts)
- **Shadow**: Subtle inset highlight

### Cards

#### Protocol Card (.protocol-card)
- **Background**: Dark gray (#1a1a1a)
- **Border**: 2px light gray → green on hover
- **Shape**: 8px corner cuts
- **Hover Effect**: Top gradient line appears
- **Shadow**: None (flat, technical look)

### Progress Bars

#### Structure
```html
<div class="progress-bar">
  <div class="progress-fill" style="width: 60%"></div>
</div>
```

#### Styling
- **Track**: Dark steel with inset shadow
- **Fill**: Green gradient with shimmer animation
- **Height**: 12px (chunky, visible)
- **Shape**: Angular corners (2px cuts)
- **Animation**: Shimmer effect on fill

### Inputs

#### Text/Time Inputs
- **Background**: Dark gray
- **Border**: Light gray → orange on focus
- **Shape**: 3px corner cuts
- **Typography**: Monospace preferred

## 🎨 Shadows & Depth

### Tactical Shadows
```css
shadow-tactical:    // Standard button depth
shadow-tactical-lg: // Large element depth
shadow-inset-tactical: // Recessed elements
```

### Usage Rules
- **Buttons**: Drop shadow + inset highlight
- **Raised elements**: Tactical shadows
- **Recessed elements**: Inset shadows
- **Cards**: Minimal/no shadow (flat industrial look)

## 🎯 Iconography

### Style Guide
- **Prefer**: Unicode symbols (⚙, ✓, 🔧, ⚡, 📊, 📅)
- **Why**: Performance, consistency, scalability
- **Fallback**: Font Awesome or similar (if needed)

### Common Icons
```
⚙  Settings/Gear
✓  Checkmark/Complete
🔧 Wrench/Tools
⚡ Lightning/Energy
→  Arrow/Next
←  Arrow/Back
📊 Stats/Analytics
📅 Calendar/Schedule
🔨 Rebuild/Construct
🔥 Streak/Fire
```

## 📏 Spacing System

### Consistency
- Use Tailwind spacing scale (4px base)
- **Tight**: 2-4px (internal padding)
- **Normal**: 8-12px (element padding)
- **Loose**: 16-24px (section spacing)
- **Wide**: 32-48px (page margins)

## 🎬 Animations

### Principles
- **Fast**: 200ms for interactions
- **Smooth**: 500ms for state changes
- **Purposeful**: Every animation has meaning

### Shimmer Effect
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```
- Used on progress bars
- Indicates active/loading state
- 2s duration, infinite

### Hover States
- Buttons: Translate Y + shadow change
- Cards: Border color + gradient line
- Links: Color shift (gray → green/orange)

## 🔍 Scrollbar

### Custom Tactical Scrollbar
- **Track**: Dark carbon (#0a0a0a)
- **Thumb**: Steel gradient with angular cuts
- **Hover**: Green highlight
- **Width**: 12px (substantial, usable)

## ✨ Utility Classes

### Textures
```css
.bg-carbon  // Carbon fiber texture
.bg-metal   // Brushed metal
.bg-grid    // Technical grid
```

### Shapes
```css
.corner-cut     // All corners angled
.corner-cut-tl  // Top-left only
.angle-right    // Arrow shape on right
```

### Icons
```css
.icon-gear
.icon-check
.icon-wrench
.icon-bolt
```

## 🎯 Implementation Examples

### Hero Section
```tsx
<header className="bg-tactical-darkgray border-b-2 border-tactical-orange bg-grid">
  <div className="bg-carbon p-12">
    <h1 className="text-5xl">REBUILD THE MAN</h1>
  </div>
</header>
```

### Action Button
```tsx
<button className="btn-primary">
  START MISSION →
</button>
```

### Info Card
```tsx
<div className="protocol-card p-6 bg-metal">
  <h3>Protocol Name</h3>
  <p>Description</p>
</div>
```

### Progress Display
```tsx
<div className="progress-bar">
  <div className="progress-fill" style={{ width: '75%' }} />
</div>
```

## 🚫 What NOT to Do

❌ **Avoid:**
- Rounded corners (border-radius)
- Soft, pastel colors
- Cursive or decorative fonts
- Excessive animations
- Wellness/spa aesthetic
- Bubble-like elements
- Gradient backgrounds everywhere
- Overly complex textures

✅ **Instead:**
- Angular, clipped corners
- Bold, saturated colors
- Strong, industrial fonts
- Purposeful, snappy animations
- Workshop/tactical aesthetic
- Sharp, mechanical elements
- Subtle, technical textures
- Clean, utilitarian layouts

## 📱 Responsive Behavior

### Breakpoints
- Mobile: Maintain sharp aesthetic
- Tablet: Expand grids, keep angles
- Desktop: Full tactical experience

### Touch Targets
- Minimum 44px for mobile
- Maintain angular shapes
- Clear tap states

## 🔮 Future Enhancements

Potential additions:
- More texture options (riveted metal, diamond plate)
- Sound effects (mechanical clicks)
- Haptic feedback (mobile)
- Dark mode variations (if needed)
- Custom font (military stencil style)
- SVG icon set (tool-themed)

## 🎯 Brand Personality

**We are:**
- Tactical, not trendy
- Industrial, not inspirational
- Workshop, not wellness
- Tool, not toy
- Precision, not perfection
- Action, not ambition

**We feel like:**
- Military field manual
- Workshop equipment manual
- Tactical gear catalog
- Engineering blueprint
- Mechanic's toolkit
- Industrial control panel

**We do NOT feel like:**
- Spa/wellness app
- Meditation guide
- Lifestyle brand
- Social platform
- Game/entertainment
- Fashion/beauty

---

This design system creates a unique, memorable aesthetic that reinforces the app's action-oriented, no-nonsense approach to mental strength training.


