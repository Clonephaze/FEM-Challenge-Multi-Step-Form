<script setup lang="ts">
const { resetForm } = useFormState()
const router = useRouter()

function handleReset() {
  sessionStorage.removeItem('fem-multistep-state')
  resetForm()
  router.replace({ query: { step: 1 } })
}
</script>

<template>
  <div class="thank-you">
    <img src="/images/icon-thank-you.svg" alt="" aria-hidden="true" />
    <h1 class="step-title">Thank you!</h1>
    <p class="step-subtitle">
      Thanks for confirming your subscription! We hope you have fun using our
      platform. If you ever need support, please feel free to email us at
      <a href="mailto:support@loremgaming.com">support@loremgaming.com</a>.
    </p>
    <button class="btn-restart" @click="handleReset">Start over</button>
  </div>
</template>

<style scoped>
.thank-you {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  min-height: 380px;
  padding: 40px 24px;
  gap: 24px;
}

.thank-you img {
  width: 80px;
  height: 80px;
}

.btn-restart {
  margin-top: 8px;
  background: none;
  border: 1px solid var(--color-purple-200);
  border-radius: 8px;
  padding: 10px 24px;
  font-family: var(--font-family);
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-500);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: var(--color-blue-950);
    color: var(--color-blue-950);
  }
}
</style>
