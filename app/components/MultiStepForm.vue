<script setup lang="ts">
import type { Plan, Billing, Addon } from '~/composables/useFormState'

const route = useRoute()
const router = useRouter()
const { currentStep, goNext, goBack, name, email, phone, plan, billing, addons } = useFormState()

// ── Transition direction ──────────────────────────────────
const isForward = ref(true)
watch(currentStep, (newVal, oldVal) => { isForward.value = newVal > oldVal })
const transitionName = computed(() => isForward.value ? 'step-forward' : 'step-backward')

// ── Accessible step announcement ─────────────────────────
const STEP_NAMES = ['', 'Your info', 'Select plan', 'Add-ons', 'Summary']
const announcement = ref('')
watch(currentStep, (step) => {
  announcement.value = step < 5
    ? `Step ${step} of 4: ${STEP_NAMES[step]}`
    : 'Complete: Thank you!'
})

// ── sessionStorage persistence ────────────────────────────
const STORAGE_KEY = 'fem-multistep-state'
// Prevents the eager watchEffect from overwriting sessionStorage before
// onMounted has a chance to restore the saved values.
const isRestored = ref(false)

watchEffect(() => {
  if (!import.meta.client || !isRestored.value) return
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
    name: name.value,
    email: email.value,
    phone: phone.value,
    plan: plan.value,
    billing: billing.value,
    addons: [...addons.value],
  }))
})

// ── URL query sync ────────────────────────────────────────
watch(currentStep, (step) => {
  router.replace({ query: { step } })
})

// ── Restore on mount ──────────────────────────────────────
onMounted(() => {
  // Restore form fields from sessionStorage
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) {
      const data = JSON.parse(saved)
      if (data.name)                          name.value    = data.name
      if (data.email)                         email.value   = data.email
      if (data.phone)                         phone.value   = data.phone
      if (data.plan)                          plan.value    = data.plan as Plan
      if (data.billing)                       billing.value = data.billing as Billing
      if (Array.isArray(data.addons))         addons.value  = new Set(data.addons as Addon[])
    }
  } catch { /* corrupt storage — ignore */ }

  // Restore step from URL (must come after session restore so prices reflect billing)
  const stepParam = Number(route.query.step)
  if (stepParam >= 1 && stepParam <= 5) {
    currentStep.value = stepParam
  }

  // Sync current step to URL
  router.replace({ query: { step: currentStep.value } })

  // Now safe to start persisting — any write after this point reflects restored state
  isRestored.value = true
})
</script>

<template>
  <!-- Screen-reader step announcements -->
  <div class="sr-only" aria-live="polite" aria-atomic="true">{{ announcement }}</div>

  <div class="card">
    <SidebarNav />

    <div class="content-area">
      <!-- Transition wrapper — key change triggers direction-aware slide -->
      <Transition :name="transitionName" mode="out-in">
        <div :key="currentStep" class="step-content">
          <StepsStepPersonalInfo v-if="currentStep === 1" />
          <StepsStepSelectPlan   v-if="currentStep === 2" />
          <StepsStepAddons       v-if="currentStep === 3" />
          <StepsStepSummary      v-if="currentStep === 4" />
          <StepsStepThankYou     v-if="currentStep === 5" />
        </div>
      </Transition>

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

<style scoped lang="scss">
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

// ── Desktop card ──
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

// ── Navigation buttons ──
@mixin cta-button {
  font-family: var(--font-family);
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
  padding: 14px 28px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover { opacity: 0.8; }
}

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

  &:hover { color: var(--color-blue-950); }
}

.btn-next {
  @include cta-button;
  background-color: var(--color-blue-950);
}

.btn-confirm {
  @include cta-button;
  background-color: var(--color-purple-600);
}

/* ── Step transitions ── */
.step-forward-enter-active,
.step-forward-leave-active,
.step-backward-enter-active,
.step-backward-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

/* Forward: new step slides in from right, old slides out to left */
.step-forward-enter-from {
  opacity: 0;
  transform: translateX(28px);
}
.step-forward-leave-to {
  opacity: 0;
  transform: translateX(-28px);
}

/* Backward: new step slides in from left, old slides out to right */
.step-backward-enter-from {
  opacity: 0;
  transform: translateX(-28px);
}
.step-backward-leave-to {
  opacity: 0;
  transform: translateX(28px);
}

/* ── Mobile ── */
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
