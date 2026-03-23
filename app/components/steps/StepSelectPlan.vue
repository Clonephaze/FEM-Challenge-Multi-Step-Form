<script setup lang="ts">
const { plan, billing, PLANS, formatPrice } = useFormState()

const isYearly = computed({
  get: () => billing.value === 'yearly',
  set: (val: boolean) => { billing.value = val ? 'yearly' : 'monthly' },
})
</script>

<template>
  <div>
    <h1 class="step-title">Select your plan</h1>
    <p class="step-subtitle">You have the option of monthly or yearly billing.</p>

    <div class="plans">
      <button
        v-for="p in PLANS"
        :key="p.id"
        type="button"
        class="plan-card"
        :class="{ 'plan-card--selected': plan === p.id }"
        @click="plan = p.id"
      >
        <img :src="p.icon" :alt="p.label" class="plan-icon" />
        <div class="plan-info">
          <span class="plan-name">{{ p.label }}</span>
          <span class="plan-price">{{ formatPrice(billing === 'monthly' ? p.monthly : p.yearly) }}</span>
          <span v-if="billing === 'yearly'" class="plan-badge">2 months free</span>
        </div>
      </button>
    </div>

    <div class="billing-toggle">
      <span class="billing-label" :class="{ 'billing-label--active': billing === 'monthly' }">Monthly</span>

      <label class="toggle" for="billing-switch" aria-label="Switch billing period">
        <input
          id="billing-switch"
          v-model="isYearly"
          type="checkbox"
          class="toggle-input"
        />
        <span class="toggle-track">
          <span class="toggle-thumb" />
        </span>
      </label>

      <span class="billing-label" :class="{ 'billing-label--active': billing === 'yearly' }">Yearly</span>
    </div>
  </div>
</template>

<style scoped>
.plans {
  display: flex;
  gap: 18px;
  margin-top: 36px;
}

.plan-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 16px;
  border: 1px solid var(--color-purple-200);
  border-radius: 8px;
  background: var(--color-white);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s, background-color 0.2s;
}

.plan-card:hover {
  border-color: var(--color-purple-600);
}

.plan-card--selected {
  border-color: var(--color-purple-600);
  background-color: var(--color-blue-50);
}

.plan-icon {
  width: 40px;
  height: 40px;
}

.plan-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.plan-name {
  font-size: 1rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-blue-950);
}

.plan-price {
  font-size: 0.875rem;
  color: var(--color-grey-500);
}

.plan-badge {
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-blue-950);
  margin-top: 4px;
}

.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background-color: var(--color-blue-50);
  border-radius: 8px;
  padding: 14px;
  margin-top: 32px;
}

.billing-label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-grey-500);
  transition: color 0.2s;
}

.billing-label--active {
  color: var(--color-blue-950);
  font-weight: var(--font-weight-bold);
}

.toggle {
  position: relative;
  cursor: pointer;
}

.toggle-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-track {
  display: block;
  width: 38px;
  height: 20px;
  background-color: var(--color-blue-950);
  border-radius: 10px;
  position: relative;
  transition: background-color 0.2s;
}

.toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 14px;
  height: 14px;
  background: var(--color-white);
  border-radius: 50%;
  transition: transform 0.2s;
}

.toggle-input:checked ~ .toggle-track .toggle-thumb {
  transform: translateX(18px);
}

@media (max-width: 767px) {
  .plans {
    flex-direction: column;
    gap: 12px;
  }

  .plan-card {
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 16px;
  }

  .plan-card .plan-info {
    gap: 3px;
  }
}
</style>
