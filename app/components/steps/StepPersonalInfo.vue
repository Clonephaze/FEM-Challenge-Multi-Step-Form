<script setup lang="ts">
const { name, email, phone, errors } = useFormState()

function formatPhone(value: string): string {
  const hasPlus = value.trimStart().startsWith('+')
  // E.164: max 15 digits (excluding the + itself)
  const digits = value.replace(/\D/g, '').slice(0, 15)
  if (!digits) return hasPlus ? '+' : ''

  if (!hasPlus && digits.length <= 10) {
    // Local 10-digit: XXX XXX XXXX
    let r = digits.slice(0, 3)
    if (digits.length > 3) r += ' ' + digits.slice(3, 6)
    if (digits.length > 6) r += ' ' + digits.slice(6, 10)
    return r
  }

  if (hasPlus && digits.length <= 11) {
    // International up to 11 digits: +X XXX XXX XXXX
    let r = '+' + digits[0]
    if (digits.length > 1) r += ' ' + digits.slice(1, 4)
    if (digits.length > 4) r += ' ' + digits.slice(4, 7)
    if (digits.length > 7) r += ' ' + digits.slice(7, 11)
    return r
  }

  // Longer numbers (12–15 digits): group in 3s after the + prefix
  const groups: string[] = []
  for (let i = 0; i < digits.length; i += 3) {
    groups.push(digits.slice(i, i + 3))
  }
  return (hasPlus ? '+' : '') + groups.join(' ')
}

function handlePhoneInput(event: Event) {
  const input = event.target as HTMLInputElement
  const formatted = formatPhone(input.value)
  phone.value = formatted
  input.value = formatted
}
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
          :value="phone"
          @input="handlePhoneInput"
          type="tel"
          class="field-input"
          :class="{ 'field-input--error': errors.phone }"
          placeholder="e.g. 234 567 8901"
          autocomplete="tel"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

  &::placeholder {
    color: var(--color-grey-500);
    font-weight: var(--font-weight-regular);
  }

  &:hover,
  &:focus {
    border-color: var(--color-purple-600);
  }

  // BEM modifier — error state overrides hover/focus border colour
  &--error {
    border-color: var(--color-red-500);

    &:focus {
      border-color: var(--color-red-500);
    }
  }
}
</style>
