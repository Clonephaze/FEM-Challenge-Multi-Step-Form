<template>
  <main class="page">
    <MultiStepForm />
    <footer class="attribution">
      Challenge by
      <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener">Frontend Mentor</a>.
      Coded by
      <a href="https://clonecore.net" target="_blank" rel="noopener">Clonephaze</a>.
    </footer>
  </main>
</template>

<style>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background-color: var(--color-blue-100);
  padding: 1rem;
}

.attribution {
  font-size: 11px;
  text-align: center;
  color: var(--color-grey-500);
}

.attribution a {
  color: hsl(228, 45%, 44%);
  text-decoration: underline;
}

.attribution a:hover {
  color: var(--color-purple-600);
}
</style>
