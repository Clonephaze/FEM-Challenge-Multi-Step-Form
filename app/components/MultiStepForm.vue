<script setup lang="ts">
const { currentStep, goNext, goBack } = useFormState()
</script>

<template>
  <div class="card">
    <SidebarNav />

    <div class="content-area">
      <div class="step-content">
        <StepsStepPersonalInfo v-show="currentStep === 1" />
        <StepsStepSelectPlan   v-show="currentStep === 2" />
        <StepsStepAddons       v-show="currentStep === 3" />
        <StepsStepSummary      v-show="currentStep === 4" />
        <StepsStepThankYou     v-show="currentStep === 5" />
      </div>

      <nav class="nav-bar" v-show="currentStep < 5">
        <button
          v-show="currentStep > 1"
          class="btn-back"
          @click="goBack"
        >
          Go Back
        </button>
        <button
          v-show="currentStep < 4"
          class="btn-next"
          @click="goNext"
        >
          Next Step
        </button>
        <button
          v-show="currentStep === 4"
          class="btn-confirm"
          @click="goNext"
        >
          Confirm
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  background: var(--color-white);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 940px;
  min-height: 568px;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.step-content {
  flex: 1;
  padding: 56px 100px 0;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 40px 32px;
  gap: 16px;
}

/* "Go Back" sits on the left when present */
.btn-back {
  margin-right: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-500);
  padding: 12px 8px;
  transition: color 0.2s;
}
.btn-back:hover { color: var(--color-blue-950); }

.btn-next,
.btn-confirm {
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
  padding: 14px 28px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-next { background-color: var(--color-blue-950); }
.btn-next:hover { opacity: 0.8; }

.btn-confirm { background-color: var(--color-purple-600); }
.btn-confirm:hover { opacity: 0.8; }

@media (max-width: 767px) {
  .card {
    flex-direction: column;
    border-radius: 0;
    box-shadow: none;
    overflow: visible;
    max-width: 100%;
    min-height: 100vh;
    background: transparent;
  }

  .content-area {
    background: var(--color-white);
    border-radius: 12px;
    margin: -40px 1rem 0;
    position: relative;
    z-index: 1;
    padding-bottom: 90px; /* clear fixed nav bar */
  }

  .step-content {
    padding: 32px 24px 24px;
  }

  .nav-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--color-white);
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
    padding: 16px 24px;
    z-index: 100;
  }

  .btn-next,
  .btn-confirm {
    font-size: 0.9375rem;
    padding: 12px 20px;
  }
}
</style>
