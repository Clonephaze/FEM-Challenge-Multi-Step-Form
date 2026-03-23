<script setup lang="ts">
const { currentStep } = useFormState()

const STEPS = [
  { number: 1, step: 'STEP 1', label: 'YOUR INFO' },
  { number: 2, step: 'STEP 2', label: 'SELECT PLAN' },
  { number: 3, step: 'STEP 3', label: 'ADD-ONS' },
  { number: 4, step: 'STEP 4', label: 'SUMMARY' },
]

// Step 4 stays highlighted on the thank-you screen (step 5)
const isActive = (stepNum: number) =>
  currentStep.value === stepNum || (currentStep.value === 5 && stepNum === 4)
</script>

<template>
  <aside class="sidebar">
    <ol class="step-list">
      <li
        v-for="step in STEPS"
        :key="step.number"
        class="step-item"
      >
        <span class="step-circle" :class="{ active: isActive(step.number) }">
          {{ step.number }}
        </span>
        <span class="step-text">
          <span class="step-hint">{{ step.step }}</span>
          <span class="step-name">{{ step.label }}</span>
        </span>
      </li>
    </ol>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 274px;
  flex-shrink: 0;
  background-image: url('/images/bg-sidebar-desktop.svg');
  background-size: cover;
  background-position: center;
  padding: 40px 32px;
}

.step-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.step-circle {
  width: 33px;
  height: 33px;
  border-radius: 50%;
  border: 1px solid var(--color-white);
  color: var(--color-white);
  font-size: 0.875rem;
  font-weight: var(--font-weight-bold);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.step-circle.active {
  background-color: var(--color-blue-200);
  color: var(--color-blue-950);
  border-color: var(--color-blue-200);
}

.step-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.step-hint {
  font-size: 0.75rem;
  font-weight: var(--font-weight-regular);
  color: var(--color-blue-300);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.step-name {
  font-size: 0.875rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-white);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 767px) {
  .sidebar {
    width: 100%;
    min-height: 172px;
    background-image: url('/images/bg-sidebar-mobile.svg');
    padding: 32px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .step-list {
    flex-direction: row;
    gap: 16px;
    align-items: center;
  }

  /* Hide text labels on mobile — circles only */
  .step-text {
    display: none;
  }
}
</style>
