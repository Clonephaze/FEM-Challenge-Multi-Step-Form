export type Plan = 'arcade' | 'advanced' | 'pro'
export type Billing = 'monthly' | 'yearly'
export type Addon = 'online' | 'storage' | 'profile'

export interface PlanInfo {
  id: Plan
  label: string
  icon: string
  monthly: number
  yearly: number
}

export interface AddonInfo {
  id: Addon
  label: string
  description: string
  monthly: number
  yearly: number
}

export const PLANS: PlanInfo[] = [
  { id: 'arcade',   label: 'Arcade',   icon: '/images/icon-arcade.svg',   monthly: 9,  yearly: 90  },
  { id: 'advanced', label: 'Advanced', icon: '/images/icon-advanced.svg', monthly: 12, yearly: 120 },
  { id: 'pro',      label: 'Pro',      icon: '/images/icon-pro.svg',      monthly: 15, yearly: 150 },
]

export const ADDONS: AddonInfo[] = [
  { id: 'online',  label: 'Online service',      description: 'Access to multiplayer games', monthly: 1,  yearly: 10 },
  { id: 'storage', label: 'Larger storage',       description: 'Extra 1TB of cloud save',     monthly: 2,  yearly: 20 },
  { id: 'profile', label: 'Customizable profile', description: 'Custom theme on your profile', monthly: 2,  yearly: 20 },
]

interface FormErrors {
  name: string
  email: string
  phone: string
}

const currentStep = ref<number>(1)

const name = ref('')
const email = ref('')
const phone = ref('')
const plan = ref<Plan>('arcade')
const billing = ref<Billing>('monthly')
const addons = ref<Set<Addon>>(new Set())

const errors = ref<FormErrors>({ name: '', email: '', phone: '' })

const selectedPlan = computed(() => PLANS.find(p => p.id === plan.value)!)

const planPrice = computed(() =>
  billing.value === 'monthly'
    ? selectedPlan.value.monthly
    : selectedPlan.value.yearly
)

const periodLabel = computed(() => billing.value === 'monthly' ? 'mo' : 'yr')

const addonsTotal = computed(() =>
  ADDONS
    .filter(a => addons.value.has(a.id))
    .reduce((sum, a) => sum + (billing.value === 'monthly' ? a.monthly : a.yearly), 0)
)

const total = computed(() => planPrice.value + addonsTotal.value)

function formatPrice(amount: number) {
  return `$${amount}/${periodLabel.value}`
}

function toggleAddon(id: Addon) {
  const next = new Set(addons.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  addons.value = next
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateStep1(): boolean {
  errors.value = { name: '', email: '', phone: '' }
  let valid = true

  if (!name.value.trim()) {
    errors.value.name = 'This field is required'
    valid = false
  }
  if (!email.value.trim()) {
    errors.value.email = 'This field is required'
    valid = false
  } else if (!EMAIL_REGEX.test(email.value.trim())) {
    errors.value.email = 'Please enter a valid email'
    valid = false
  }
  if (!phone.value.trim()) {
    errors.value.phone = 'This field is required'
    valid = false
  } else if (phone.value.replace(/\D/g, '').length < 7) {
    errors.value.phone = 'Please enter a valid phone number'
    valid = false
  }

  return valid
}

function goNext() {
  if (currentStep.value === 1 && !validateStep1()) return
  if (currentStep.value < 5) currentStep.value++
}

function goBack() {
  if (currentStep.value > 1) currentStep.value--
}

function goToStep(n: number) {
  currentStep.value = n
}

export function useFormState() {
  return {
    currentStep,
    goNext,
    goBack,
    goToStep,

    name,
    email,
    phone,
    errors,
    validateStep1,

    plan,
    billing,
    selectedPlan,
    planPrice,
    periodLabel,

    addons,
    toggleAddon,

    addonsTotal,
    total,
    formatPrice,

    PLANS,
    ADDONS,
  }
}
