<script setup lang="ts">
const { name, email, phone, errors } = useFormState()
</script>

<template>
  <div>
    <h1 class="step-title">Personal info</h1>
    <p class="step-subtitle">Please provide your name, email address, and phone number.</p>

    <div class="fields">
      <!-- Name -->
      <div class="field">
        <div class="field-header">
          <label class="field-label" for="name">Name</label>
          <span v-if="errors.name" class="field-error" role="alert">{{ errors.name }}</span>
        </div>
        <input
          id="name"
          v-model="name"
          type="text"
          class="field-input"
          :class="{ 'field-input--error': errors.name }"
          placeholder="e.g. Stephen King"
          autocomplete="name"
        />
      </div>

      <!-- Email -->
      <div class="field">
        <div class="field-header">
          <label class="field-label" for="email">Email Address</label>
          <span v-if="errors.email" class="field-error" role="alert">{{ errors.email }}</span>
        </div>
        <input
          id="email"
          v-model="email"
          type="email"
          class="field-input"
          :class="{ 'field-input--error': errors.email }"
          placeholder="e.g. stephenking@lorem.com"
          autocomplete="email"
        />
      </div>

      <!-- Phone -->
      <div class="field">
        <div class="field-header">
          <label class="field-label" for="phone">Phone Number</label>
          <span v-if="errors.phone" class="field-error" role="alert">{{ errors.phone }}</span>
        </div>
        <input
          id="phone"
          v-model="phone"
          type="tel"
          class="field-input"
          :class="{ 'field-input--error': errors.phone }"
          placeholder="e.g. +1 234 567 890"
          autocomplete="tel"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.fields {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 36px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.field-label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-blue-950);
}

.field-error {
  font-size: 0.875rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-red-500);
}

.field-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-purple-200);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-blue-950);
  background: var(--color-white);
  outline: none;
  transition: border-color 0.2s;
  cursor: pointer;
}

.field-input::placeholder {
  color: var(--color-grey-500);
  font-weight: var(--font-weight-regular);
}

.field-input:hover,
.field-input:focus {
  border-color: var(--color-purple-600);
}

.field-input--error {
  border-color: var(--color-red-500);
}

.field-input--error:focus {
  border-color: var(--color-red-500);
}
</style>
