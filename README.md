# Frontend Mentor - Multi-step form solution

This is my solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). These challenges are a solid way to build real-world UI skills — this one in particular had enough moving parts to make it actually interesting.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- ✓ Complete each step of the sequence
- ✓ Go back to a previous step to update their selections
- ✓ See a summary of their selections on the final step and confirm their order
- ✓ View the optimal layout for the interface depending on their device's screen size
- ✓ See hover and focus states for all interactive elements on the page
- ✓ Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

Additionally, the following optional enhancements were implemented:
- ✓ Write styles using a pre-processor — Sass with `@mixin`, BEM nesting, and a design-token map looped into CSS custom properties at build time
- ✓ Persist form state across page refreshes using `sessionStorage`
- ✓ Sync the current step with the URL query string for better browser history navigation
- ✓ Direction-aware slide transitions between steps using a single `<Transition>` component
- ✓ `aria-live` region that announces the current step name on every navigation
- ✓ Programmatic focus management — keyboard focus is moved to the new step content after each navigation so Tab lands in the right place
- ✓ Phone number auto-formatting as you type (E.164-aware: `234 567 8901` or `+1 234 567 8901`)
- ✓ Reset button in the nav bar and on the confirmation page to clear state and start over

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- [Nuxt 3](https://nuxt.com/) — SPA mode (`ssr: false`), Vue reactivity without server overhead
- [Vue 3](https://vuejs.org/) + TypeScript — composables, `computed`, `ref`, scoped component styles
- [Sass (SCSS)](https://sass-lang.com/) — design tokens, `@mixin`, BEM nesting, and a Sass map looped into CSS custom properties at build time
- CSS custom properties — runtime token consumption across all components
- Flexbox — layout throughout
- `<Transition>` — direction-aware slide animations between steps
- `sessionStorage` — form state survives a page refresh
- URL query sync — `?step=N` keeps the browser history coherent

### What I learned

The most useful pattern I landed on was centralizing all the form state in a single `useFormState()` composable. Having `billing`, `plan`, and `addons` as shared reactive refs meant the billing toggle in Step 2 automatically updated the prices in Step 3 and the totals in Step 4 — zero manual wiring needed.

```ts
// One billing ref, reflected everywhere automatically
const billing = ref<Billing>('monthly')

const total = computed(() => planPrice.value + addonsTotal.value)
```

The Sass design-token setup was genuinely useful rather than just checkbox Sass. A single `$color-map` in `_variables.scss` is looped at compile time to emit every CSS custom property:

```scss
// _variables.scss
$color-map: (
  'blue-950': hsl(213, 96%, 18%),
  'purple-600': hsl(243, 100%, 62%),
  // ...
);

// main.scss
:root {
  @each $name, $value in $color-map {
    --color-#{$name}: #{$value};
  }
}
```

One value to update, both the Sass variable and the runtime custom property stay in sync automatically.

For step transitions I tracked navigation direction and swapped the `<Transition>` name to get a real directional slide — forward goes right-to-left, back goes left-to-right — without two separate transition components.

```ts
const isForward = ref(true)
watch(currentStep, (newVal, oldVal) => { isForward.value = newVal > oldVal })
const transitionName = computed(() => isForward.value ? 'step-forward' : 'step-backward')
```

For accessibility I added an `aria-live="polite"` region that announces the current step name whenever navigation happens. It starts empty so there's no announcement on first load — screen readers only hear it when something actually changes:

```ts
watch(currentStep, (step) => {
  announcement.value = step < 5
    ? `Step ${step} of 4: ${STEP_NAMES[step]}`
    : 'Complete: Thank you!'
})
```

Phone formatting felt like a small thing but it's the kind of polish that's immediately visible. Stripping to digits and re-inserting spaces on each keystroke required swapping from `v-model` to `:value` + `@input` so the DOM value is overwritten in-place rather than via the default event flow.

On the CSS side, building a custom toggle switch with just a checkbox and CSS was a nice exercise — no JS needed, just `:checked` state driving a `transform: translateX()` on the thumb.

```css
.toggle-input:checked ~ .toggle-track .toggle-thumb {
  transform: translateX(18px);
}
```

### Continued development

- **More intentional mobile-first CSS** — I wrote desktop-first here and added mobile breakpoints after the fact. I'd like to flip that habit on the next project.

### AI Collaboration

I do write with vscode and allow the inline editor to occasionally suggest completions, but I didn't use any AI tools in a deliberate way for this project. The code and writeup are 100% my own work, with no AI-generated content.

## Author

- Website - [clonecore.net](https://clonecore.net)
- Frontend Mentor - [@Clonephaze](https://www.frontendmentor.io/profile/Clonephaze)
