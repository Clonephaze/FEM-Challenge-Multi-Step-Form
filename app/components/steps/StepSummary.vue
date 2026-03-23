<script setup lang="ts">
const { selectedPlan, billing, addons, total, ADDONS, goToStep } = useFormState()

const selectedAddons = computed(() => ADDONS.filter(a => addons.value.has(a.id)))

const planLabel = computed(() =>
  `${selectedPlan.value.label} (${billing.value === 'monthly' ? 'Monthly' : 'Yearly'})`
)
const planPrice = computed(() =>
  billing.value === 'monthly'
    ? `$${selectedPlan.value.monthly}/mo`
    : `$${selectedPlan.value.yearly}/yr`
)
const totalLabel = computed(() =>
  billing.value === 'monthly' ? 'Total (per month)' : 'Total (per year)'
)
const totalFormatted = computed(() =>
  billing.value === 'monthly' ? `+$${total.value}/mo` : `$${total.value}/yr`
)
</script>

<template>
  <div>
    <h1 class="step-title">Finishing up</h1>
    <p class="step-subtitle">Double-check everything looks OK before confirming.</p>

    <div class="summary-box">
      <div class="summary-plan">
        <div class="summary-plan-left">
          <span class="summary-plan-name">{{ planLabel }}</span>
          <button type="button" class="summary-change" @click="goToStep(2)">Change</button>
        </div>
        <span class="summary-plan-price">{{ planPrice }}</span>
      </div>

      <template v-if="selectedAddons.length > 0">
        <hr class="summary-divider" />
        <div class="summary-addons">
          <div
            v-for="addon in selectedAddons"
            :key="addon.id"
            class="summary-addon-row"
          >
            <span class="summary-addon-name">{{ addon.label }}</span>
            <span class="summary-addon-price">
              +{{ billing === 'monthly' ? `$${addon.monthly}/mo` : `$${addon.yearly}/yr` }}
            </span>
          </div>
        </div>
      </template>
    </div>

    <div class="summary-total">
      <span class="summary-total-label">{{ totalLabel }}</span>
      <span class="summary-total-price">{{ totalFormatted }}</span>
    </div>
  </div>
</template>

<style scoped>
.summary-box {
  margin-top: 36px;
  background: var(--color-blue-50);
  border-radius: 8px;
  padding: 20px 24px;
}

.summary-plan {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary-plan-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.summary-plan-name {
  font-size: 0.9375rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-blue-950);
}

.summary-change {
  font-family: var(--font-family);
  font-size: 0.875rem;
  color: var(--color-grey-500);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  text-align: left;
  transition: color 0.2s;
}

.summary-change:hover {
  color: var(--color-purple-600);
}

.summary-plan-price {
  font-size: 0.9375rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-blue-950);
}

.summary-divider {
  border: none;
  border-top: 1px solid var(--color-purple-200);
  margin: 20px 0;
}

.summary-addons {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.summary-addon-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-addon-name {
  font-size: 0.875rem;
  color: var(--color-grey-500);
}

.summary-addon-price {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-blue-950);
}

/* Total row outside the box */
.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0;
}

.summary-total-label {
  font-size: 0.875rem;
  color: var(--color-grey-500);
}

.summary-total-price {
  font-size: 1.25rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-purple-600);
}
</style>
