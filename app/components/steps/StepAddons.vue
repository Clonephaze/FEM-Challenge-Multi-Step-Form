<script setup lang="ts">
const { addons, billing, toggleAddon, ADDONS } = useFormState()
</script>

<template>
  <div>
    <h1 class="step-title">Pick add-ons</h1>
    <p class="step-subtitle">Add-ons help enhance your gaming experience.</p>

    <div class="addon-list">
      <button
        v-for="addon in ADDONS"
        :key="addon.id"
        type="button"
        class="addon-row"
        :class="{ 'addon-row--selected': addons.has(addon.id) }"
        :aria-pressed="addons.has(addon.id)"
        @click="toggleAddon(addon.id)"
      >
        <span class="addon-checkbox" :class="{ 'addon-checkbox--checked': addons.has(addon.id) }">
          <svg v-if="addons.has(addon.id)" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M1 4.5L4.5 8L11 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>

        <span class="addon-info">
          <span class="addon-name">{{ addon.label }}</span>
          <span class="addon-desc">{{ addon.description }}</span>
        </span>

        <span class="addon-price">
          +{{ billing === 'monthly' ? `$${addon.monthly}/mo` : `$${addon.yearly}/yr` }}
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.addon-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 36px;
}

.addon-row {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px 24px;
  border: 1px solid var(--color-purple-200);
  border-radius: 8px;
  background: var(--color-white);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s, background-color 0.2s;
  width: 100%;
}

.addon-row:hover {
  border-color: var(--color-purple-600);
}

.addon-row--selected {
  border-color: var(--color-purple-600);
  background-color: var(--color-blue-50);
}

.addon-checkbox {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border: 1px solid var(--color-purple-200);
  border-radius: 4px;
  background: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, border-color 0.2s;
}

.addon-checkbox--checked {
  background-color: var(--color-purple-600);
  border-color: var(--color-purple-600);
}

.addon-checkbox svg {
  width: 12px;
  height: 9px;
}

.addon-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.addon-name {
  font-size: 0.9375rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-blue-950);
}

.addon-desc {
  font-size: 0.875rem;
  color: var(--color-grey-500);
}

.addon-price {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-purple-600);
  white-space: nowrap;
}

@media (max-width: 767px) {
  .addon-row {
    padding: 14px 16px;
    gap: 16px;
  }
}
</style>
