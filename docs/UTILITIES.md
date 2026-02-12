# Utility Classes Reference

HeavyLift provides a comprehensive set of utility classes for layout, spacing, typography, and effects. These utilities are designed to be low-specificity (`:where()`) and highly consistent.

## Naming Conventions

HeavyLift utilities follow a predictable naming pattern:
- **Base**: `.utility-name` or `.u-value` (e.g., `.flex`, `.m-md`)
- **Responsive**: `breakpoint:utility-name` (e.g., `sm:flex`, `lg:m-xl`)
- **Shorthands**: Most utilities support standard CSS shorthands (e.g., `mx` for margin-inline, `py` for padding-block).

## Breakpoints

| Prefix | Screen Width |
| :--- | :--- |
| `sm:` | `>= 640px` (40rem) |
| `md:` | `>= 768px` (48rem) |
| `lg:` | `>= 1024px` (64rem) |

---

## Display

| Class | CSS Property |
| :--- | :--- |
| `.block` | `display: block;` |
| `.inline-block` | `display: inline-block;` |
| `.inline` | `display: inline;` |
| `.flex` | `display: flex;` |
| `.grid` | `display: grid;` |
| `.hidden` | `display: none;` |

## Flexbox

### Direction & Wrap
| Class | CSS Property |
| :--- | :--- |
| `.flex-row` | `flex-direction: row;` |
| `.flex-row-reverse` | `flex-direction: row-reverse;` |
| `.flex-col` | `flex-direction: column;` |
| `.flex-col-reverse` | `flex-direction: column-reverse;` |
| `.flex-wrap` | `flex-wrap: wrap;` |
| `.flex-nowrap` | `flex-wrap: nowrap;` |

### Alignment (Justify & Items)
| Class | CSS Property |
| :--- | :--- |
| `.justify-start` | `justify-content: flex-start;` |
| `.justify-center` | `justify-content: center;` |
| `.justify-end` | `justify-content: flex-end;` |
| `.justify-between` | `justify-content: space-between;` |
| `.justify-around` | `justify-content: space-around;` |
| `.items-start` | `align-items: flex-start;` |
| `.items-center` | `align-items: center;` |
| `.items-end` | `align-items: flex-end;` |
| `.items-stretch` | `align-items: stretch;` |
| `.items-baseline` | `align-items: baseline;` |

### Self Alignment
| Class | CSS Property |
| :--- | :--- |
| `.self-start` | `align-self: flex-start;` |
| `.self-center` | `align-self: center;` |
| `.self-end` | `align-self: flex-end;` |
| `.self-stretch` | `align-self: stretch;` |

### Sizing
| Class | CSS Property |
| :--- | :--- |
| `.flex-1` | `flex: 1 1 0%;` |
| `.flex-auto` | `flex: 1 1 auto;` |
| `.flex-none` | `flex: none;` |
| `.grow` | `flex-grow: 1;` |
| `.grow-0` | `flex-grow: 0;` |
| `.shrink` | `flex-shrink: 1;` |
| `.shrink-0` | `flex-shrink: 0;` |

---

## Spacing (Margins & Padding)

Utilities use the Golden Ratio scale: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`.

### Margins (`m-`)
- **Axis**: `.mx-{size}` (horizontal), `.my-{size}` (vertical)
- **Side**: `.mt-` (top), `.mb-` (bottom), `.ms-` (start/left), `.me-` (end/right)
- **All**: `.m-{size}`

### Padding (`p-`)
- **Axis**: `.px-{size}`, `.py-{size}`
- **Side**: `.pt-`, `.pb-`, `.ps-`, `.pe-`
- **All**: `.p-{size}`

---

## Grid

| Class | CSS Property |
| :--- | :--- |
| `.grid-cols-1` to `12` | `grid-template-columns: repeat(N, ...);` |
| `.col-span-1` to `12` | `grid-column: span N;` |
| `.gap-{size}` | Sets both row and column gap |
| `.gap-x-{size}` | `column-gap` |
| `.gap-y-{size}` | `row-gap` |

---

## Typography & Alignment

| Class | CSS Property |
| :--- | :--- |
| `.text-left` / `.text-start` | `text-align: left;` |
| `.text-center` | `text-align: center;` |
| `.text-right` / `.text-end` | `text-align: right;` |
| `.text-justify` | `text-align: justify;` |

---

## Borders & Shapes

| Class | CSS Property |
| :--- | :--- |
| `.rounded-none` | `border-radius: 0;` |
| `.rounded-sm` | `border-radius: var(--sm);` |
| `.rounded` / `.rounded-md` | `border-radius: var(--md);` |
| `.rounded-lg` | `border-radius: var(--lg);` |
| `.rounded-full` | `border-radius: 100em;` |

---

## Effects

### Glassmorphism
Add the `.glass` class to any container to enable the Material Design glass effect.
- Includes automatic `-webkit-` prefixing for Safari.
- Includes a fallback background color for older browsers.
- Interacts with hover states unless `.static` is added.

```html
<div class="card glass">...</div>
```

---

## Visibility & Interaction

| Class | CSS Property |
| :--- | :--- |
| `.opacity-0` to `100` | Opacity in 5% increments |
| `.pointer-events-none` | Disables click/touch |
| `.pointer-events-auto` | Enables click/touch |
| `.overflow-hidden` | `overflow: hidden;` |
| `.overflow-auto` | `overflow: auto;` (with custom scrollbar colors) |
| `.inset-0` | `top: 0; right: 0; bottom: 0; left: 0;` |
