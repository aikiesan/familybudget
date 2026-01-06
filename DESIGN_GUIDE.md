# 🎨 Design Guide - Minimalist Finance App

## Design Philosophy

The Personal Finance Manager follows a **minimalist and elegant** design approach, inspired by modern fintech applications. The design prioritizes:

- **Clarity**: Information is easy to scan and understand
- **Simplicity**: Clean layouts without unnecessary decoration
- **Sophistication**: Professional appearance suitable for financial management
- **Usability**: Intuitive interactions with clear visual feedback

## Color Palette

### Primary Colors

```css
Background:     #FAFBFC  /* Subtle off-white for reduced eye strain */
Foreground:     #1A1D1F  /* Near-black for text */
Card Background: #FFFFFF  /* Pure white cards for contrast */
Border:         #EFEFEF  /* Subtle borders */
```

### Semantic Colors

```css
Accent (Primary): #2A85FF  /* Blue - Actions, links */
Success:          #83BF6E  /* Green - Income, positive */
Warning:          #FFBC42  /* Yellow - Alerts, caution */
Danger:           #FF6A55  /* Red - Expenses, errors */
```

### Text Colors

```css
Primary Text:    #1A1D1F  /* Main content */
Secondary Text:  #6F767E  /* Descriptions, labels */
Tertiary Text:   #9CA3AF  /* Placeholders, disabled */
```

### Background Variations

```css
Green Backgrounds:  bg-green-50, border-green-100, text-green-600
Blue Backgrounds:   bg-blue-50, border-blue-100, text-blue-600
Red Backgrounds:    bg-red-50, border-red-100, text-red-600
Purple Backgrounds: bg-purple-50, border-purple-100, text-purple-600
Yellow Backgrounds: bg-yellow-50, border-yellow-100, text-yellow-600
Gray Backgrounds:   bg-gray-50, border-gray-100, text-gray-600
```

## Typography

### Font Family

```css
Font: Inter (via next/font/google)
Fallback: system-ui, -apple-system, sans-serif
```

### Type Scale

```css
Headings:
  - Page Title: text-xl (20px), font-bold
  - Section Title: text-lg (18px), font-semibold
  - Card Title: text-base (16px), font-semibold
  - Subsection: text-sm (14px), font-medium

Body Text:
  - Regular: text-base (16px), font-normal
  - Small: text-sm (14px)
  - Extra Small: text-xs (12px)

Labels:
  - Uppercase: text-xs, uppercase, tracking-wide
  - Font Weight: font-medium
  - Color: text-gray-500
```

## Spacing System

### Padding

```css
Cards: p-6 (24px)
Buttons: px-4 py-3 (16px horizontal, 12px vertical)
Form Inputs: px-4 py-3 (16px horizontal, 12px vertical)
Icons: p-2 or p-2.5 (8px or 10px)
```

### Gaps

```css
Component Spacing: gap-6 (24px)
Grid Gaps: gap-4 or gap-3 (16px or 12px)
Small Elements: gap-2 or gap-3 (8px or 12px)
```

### Margins

```css
Section Spacing: space-y-6 (24px vertical)
Form Fields: space-y-4 (16px vertical)
Text Elements: space-y-1 or space-y-2
```

## Border Radius

### Rounded Corners

```css
Cards & Panels: rounded-2xl (16px)
Buttons: rounded-xl (12px)
Inputs: rounded-xl (12px)
Small Elements: rounded-lg (8px)
Icon Containers: rounded-xl (12px)
```

## Shadows & Elevation

### Minimal Shadow System

```css
Default Cards: shadow-sm + border border-gray-100
Hover State: hover:shadow-md
FAB: shadow-xl
Modal Backdrop: shadow-lg
```

No heavy shadows - use subtle shadows combined with borders for depth.

## Components

### Cards

```tsx
<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
  {/* Content */}
</div>
```

**Characteristics:**
- White background
- 2xl rounded corners
- Subtle shadow + border
- 24px padding

### Buttons

#### Primary Button (Dark)
```tsx
<button className="px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800">
  Action
</button>
```

#### Secondary Button (Light)
```tsx
<button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">
  Cancel
</button>
```

#### Icon Button
```tsx
<button className="p-2 hover:bg-gray-50 rounded-lg">
  <Icon className="w-5 h-5 text-gray-400" />
</button>
```

### Form Inputs

```tsx
<input 
  type="text"
  className="w-full px-4 py-3 border border-gray-200 rounded-xl 
             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
             text-gray-900 placeholder-gray-400"
  placeholder="Enter value"
/>
```

**Characteristics:**
- Subtle gray border
- XL rounded corners
- Clear focus state with blue ring
- 12px vertical padding for comfortable touch targets

### Form Labels

```tsx
<label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
  Field Name
</label>
```

**Characteristics:**
- Uppercase for clarity
- Tracking for readability
- Gray color to reduce visual weight
- Small but legible

### Icon Containers

```tsx
<div className="p-2 bg-blue-50 rounded-xl">
  <Icon className="w-5 h-5 text-blue-600" />
</div>
```

**Characteristics:**
- Soft colored background
- Medium sized icons (20px)
- XL rounded corners
- Matching text color

### Summary Cards

```tsx
<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
  <div className="flex items-start justify-between mb-4">
    <div className="p-2.5 bg-green-50 rounded-xl">
      <Icon className="w-5 h-5 text-green-600" />
    </div>
  </div>
  <div className="space-y-1">
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
      Label
    </p>
    <p className="text-2xl font-bold text-gray-900">
      Value
    </p>
    <p className="text-xs text-gray-500">
      Description
    </p>
  </div>
</div>
```

### Badges & Pills

```tsx
{/* Status Badge */}
<span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs 
               font-medium rounded-md border border-purple-100">
  Recurring
</span>

{/* Filter Chip */}
<button className="px-3 py-2 rounded-xl text-xs font-medium border
                   bg-white text-gray-600 border-gray-200 
                   hover:border-gray-300">
  Category
</button>
```

### Progress Bars

```tsx
<div className="h-3 bg-gray-100 rounded-full overflow-hidden">
  <div 
    className="h-full bg-green-500 transition-all duration-500"
    style={{ width: '75%' }}
  />
</div>
```

**Characteristics:**
- Thin height (12px)
- Light gray background
- Solid color fill (no gradients)
- Smooth transitions

## Interactions

### Hover States

```css
Cards: hover:shadow-md, hover:border-gray-200
Buttons: hover:bg-gray-800 (dark), hover:bg-gray-100 (light)
Icons: hover:bg-gray-50
```

### Focus States

```css
Inputs: focus:ring-2 focus:ring-blue-500 focus:border-transparent
Buttons: focus-visible:outline-2 focus-visible:outline-blue-500
```

### Active States

```css
Buttons: active:scale-95
FAB: active:scale-95
```

### Transitions

```css
Default: transition-colors (200ms)
Transform: transition-all
Progress Bars: transition-all duration-500
```

## Layout

### Grid System

```tsx
{/* 4 Column Grid (Cards) */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

{/* 2 Column Grid (Charts) */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

{/* 3 Column Layout (Main + Sidebar) */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2"> {/* Main */}
  <div> {/* Sidebar */}
</div>
```

### Container

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Section Spacing

```css
Between Sections: space-y-6 (24px)
Within Sections: space-y-4 (16px)
Page Margins: py-8 (top/bottom 32px)
```

## Responsive Design

### Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large screens */
```

### Mobile-First Approach

Always design for mobile first, then enhance for larger screens:

```tsx
{/* Mobile: Single column, Desktop: Multiple columns */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

{/* Mobile: Hidden, Desktop: Visible */}
<div className="hidden lg:block">

{/* Mobile: Visible, Desktop: Hidden */}
<div className="lg:hidden">
```

## Accessibility

### Color Contrast

- Text on white: minimum 4.5:1 ratio
- Primary text: #1A1D1F on #FFFFFF = 16:1 ✓
- Secondary text: #6F767E on #FFFFFF = 6.5:1 ✓

### Focus Indicators

All interactive elements have visible focus states:
```css
*:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### Touch Targets

Minimum touch target size: 44×44px
- Buttons: py-3 (48px height minimum)
- Icon buttons: p-2 + icon (44px minimum)

## Best Practices

### DO ✓

- Use semantic HTML elements
- Provide clear visual hierarchy
- Use consistent spacing
- Implement proper focus states
- Test on multiple screen sizes
- Use relative units for typography
- Provide loading and empty states
- Use subtle animations for feedback

### DON'T ✗

- Use heavy drop shadows
- Mix different border radius values
- Use gradients for backgrounds
- Overuse animations
- Ignore accessibility
- Use inconsistent spacing
- Rely only on color for meaning
- Use low contrast text

## Component Checklist

When creating a new component, ensure:

- [ ] Uses consistent border radius (rounded-2xl for cards, rounded-xl for buttons)
- [ ] Has proper spacing (p-6 for cards, px-4 py-3 for inputs/buttons)
- [ ] Uses semantic color system
- [ ] Has hover/focus/active states
- [ ] Is fully responsive
- [ ] Has proper typography hierarchy
- [ ] Uses consistent icon sizing (w-5 h-5 for most icons)
- [ ] Includes empty states (if applicable)
- [ ] Has loading states (if applicable)
- [ ] Follows accessibility guidelines

## Code Examples

### Complete Card Example

```tsx
<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
  {/* Header */}
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-blue-50 rounded-xl">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <h2 className="text-lg font-semibold text-gray-900">Card Title</h2>
  </div>
  
  {/* Content */}
  <div className="space-y-4">
    <p className="text-sm text-gray-600">Card content goes here</p>
  </div>
  
  {/* Action */}
  <button className="w-full mt-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800">
    Action
  </button>
</div>
```

### Complete Form Example

```tsx
<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
      Field Label
    </label>
    <input
      type="text"
      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
      placeholder="Enter value"
    />
  </div>
  
  <div className="flex gap-3">
    <button type="submit" className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800">
      Submit
    </button>
    <button type="button" className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">
      Cancel
    </button>
  </div>
</form>
```

---

**Version**: 2.0 - Minimalist Edition
**Last Updated**: January 6, 2026

