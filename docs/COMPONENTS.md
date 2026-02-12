# Component Usage Guide

This guide details the HTML structure and CSS classes required to use HeavyLift components.

## Buttons (`buttons.css`)

Buttons support multiple variants: `filled`, `outlined`, `text`, `elevated`, `tonal`.

```html
<!-- Filled Button (Primary) -->
<button class="button filled">
  <span class="material-symbols-outlined">add</span>
  Action
</button>

<!-- Outlined Button -->
<button class="button outlined">Cancel</button>

<!-- Text Button -->
<button class="button text">Learn More</button>
```

### Sizes
Add `.sm` or `.lg` to modify size.
```html
<button class="button filled sm">Small</button>
<button class="button filled lg">Large</button>
```

## Cards (`cards.css`)

Cards are flexible containers with optional semantic sections.

```html
<!-- Elevated Card with sections -->
<div class="card elevated">
  <div class="card-header">
     <h3>Card Title</h3>
  </div>
  <div class="card-content">
    <p>Card content goes here.</p>
  </div>
  <div class="card-actions">
    <button class="button text">Action</button>
  </div>
</div>
```

## Text Fields (`text-fields.css`)

Input fields come in `filled` and `outlined` variants. Requires a placeholder (even empty) for the floating label to work.

```html
<!-- Outlined Text Field -->
<div class="text-field outlined">
  <input type="text" placeholder=" " id="username">
  <label for="username" class="text-field-label">Username</label>
</div>

<!-- Filled Text Field -->
<div class="text-field filled">
  <input type="text" placeholder=" " id="email">
  <label for="email" class="text-field-label">Email</label>
</div>
<!-- With Error State -->
<div class="text-field outlined error">
  <input type="text" placeholder=" " id="err">
  <label for="err" class="text-field-label">Error Field</label>
</div>
<div class="text-field-support">Error message here</div>
```

## Top App Bar (`top-app-bar.css`)

```html
<header class="top-app-bar small">
  <button class="icon-button">
    <span class="material-symbols-outlined">menu</span>
  </button>
  <h1 class="title">Page Title</h1>
  <div class="actions">
    <button class="icon-button">
      <span class="material-symbols-outlined">account_circle</span>
    </button>
  </div>
</header>
```
Variants: `.small`, `.medium`, `.large`, `.center-aligned`.

## Navigation Bar (`navigation-bar.css`)

```html
<nav class="navigation-bar">
  <a href="#" class="item active">
    <span class="icon material-symbols-outlined">home</span>
    <span class="label">Home</span>
  </a>
  <a href="#" class="item">
    <span class="icon material-symbols-outlined">search</span>
    <span class="label">Search</span>
  </a>
</nav>
```
