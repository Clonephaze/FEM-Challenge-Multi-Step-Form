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

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- [Nuxt 3](https://nuxt.com/) — SPA mode (`ssr: false`), which gave me Vue's reactivity without any server overhead I didn't need
- [Vue 3](https://vuejs.org/) + TypeScript — composables, `computed`, `ref`, the whole deal
- CSS custom properties — handled the full design token system without needing Sass
- Flexbox — layout throughout
- Scoped component styles — kept things tidy with no style bleed between steps

### What I learned

The most useful pattern I landed on was centralizing all the form state in a single `useFormState()` composable. Having `billing`, `plan`, and `addons` as shared reactive refs meant the billing toggle in Step 2 automatically updated the prices in Step 3 and the totals in Step 4 — zero manual wiring needed.

```ts
// One billing ref, reflected everywhere automatically
const billing = ref<Billing>('monthly')

const total = computed(() => planPrice.value + addonsTotal.value)
```

Also reinforced how clean Vue's template auto-unwrapping is. No `.value` noise in the template, the reactivity just works.

On the CSS side, building a custom toggle switch with just a checkbox and CSS was a nice exercise — no JS needed, just `:checked` state driving a `transform: translateX()` on the thumb.

```css
.toggle-input:checked ~ .toggle-track .toggle-thumb {
  transform: translateX(18px);
}
```

### Continued development

A few things I want to tighten up going forward:

- **Transitions between steps** — even a simple fade would make the UX feel a lot more polished. I used `v-show` here for simplicity, but swapping to `<Transition>` is a natural next step.
- **Form state persistence** — right now a page refresh wipes everything. `localStorage` or at least `sessionStorage` could fix that with minimal effort.
- **More intentional mobile-first CSS** — I wrote desktop-first here and added mobile breakpoints after the fact. I'd like to flip that habit on the next project.

### AI Collaboration

I do write with vscode and allow the inline editor to occasionally suggest completions, but I didn't use any AI tools in a deliberate way for this project. The code and writeup are 100% my own work, with no AI-generated content.

## Author

- Website - [clonecore.net](https://clonecore.net)
- Frontend Mentor - [@Clonephaze](https://www.frontendmentor.io/profile/Clonephaze)
