"use client"

import { useRouter, usePathname } from 'next/navigation'
import { useFormContext, FORM_STEPS } from '../lib/context/form-context'
import { submitMultiStepForm } from '../app/actions/form-actions'
import { CompleteFormData } from '../lib/validations/form-schemas'

/**
 * Custom hook for form navigation with route protection and validation
 */
export function useFormNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const {
    currentStep,
    formData,
    setCurrentStep,
    updateFormData,
    markStepCompleted,
    validateStep,
    canAccessStep,
    setSubmitting,
    setErrors,
    clearErrors,
  } = useFormContext()

  // Get current step from URL
  const getCurrentStepFromUrl = (): number => {
    const currentRoute = FORM_STEPS.find(step => step.path === pathname)
    return currentRoute?.id || 1
  }

  // Navigate to a specific step
  const navigateToStep = (step: number) => {
    const targetStep = FORM_STEPS.find(s => s.id === step)
    if (!targetStep) return

    // Check if user can access this step
    if (!canAccessStep(step)) {
      // Find the highest accessible step
      const accessibleStep = Math.max(...Array.from({ length: step - 1 }, (_, i) => i + 1).filter(canAccessStep))
      const fallbackStep = FORM_STEPS.find(s => s.id === accessibleStep)
      if (fallbackStep) {
        router.push(fallbackStep.path)
        setCurrentStep(accessibleStep)
      }
      return
    }

    setCurrentStep(step)
    router.push(targetStep.path)
  }

  // Navigate to next step
  const nextStep = () => {
    const urlStep = getCurrentStepFromUrl()
    
    // Validate current step before proceeding
    if (!validateStep(urlStep)) {
      return false
    }

    // Mark current step as completed
    markStepCompleted(urlStep)

    // Navigate to next step
    const nextStepNumber = urlStep + 1
    if (nextStepNumber <= FORM_STEPS.length) {
      navigateToStep(nextStepNumber)
      return true
    }

    return false
  }

  // Navigate to previous step
  const previousStep = () => {
    const urlStep = getCurrentStepFromUrl()
    const prevStepNumber = urlStep - 1
    
    if (prevStepNumber >= 1) {
      navigateToStep(prevStepNumber)
      return true
    }

    return false
  }

  // Submit the form (final step)
  const submitForm = async () => {
    const urlStep = getCurrentStepFromUrl()
    
    // Validate final step
    if (!validateStep(urlStep)) {
      return false
    }

    // Mark final step as completed
    markStepCompleted(urlStep)

    setSubmitting(true)
    clearErrors()

    try {
      const result = await submitMultiStepForm(formData as CompleteFormData)
      
      if (result.success) {
        // Navigate to success page
        router.push('/register/success')
        return true
      } else {
        // Handle submission errors
        if (result.errors) {
          setErrors(result.errors)
        }
        return false
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({
        general: 'An unexpected error occurred. Please try again.'
      })
      return false
    } finally {
      setSubmitting(false)
    }
  }

  // Update form data and persist to localStorage
  const updateStepData = (data: Partial<CompleteFormData>) => {
    updateFormData(data)
  }

  // Check if we're on the last step
  const isLastStep = () => {
    const urlStep = getCurrentStepFromUrl()
    return urlStep === FORM_STEPS.length
  }

  // Initialize step based on current URL
  const initializeStep = () => {
    const urlStep = getCurrentStepFromUrl()
    
    // Update context to match URL
    if (urlStep !== currentStep) {
      setCurrentStep(urlStep)
    }

    // Check access permission for current step
    if (!canAccessStep(urlStep) && urlStep > 1) {
      // Redirect to the highest accessible step
      const accessibleSteps = FORM_STEPS.filter(step => canAccessStep(step.id))
      const lastAccessible = accessibleSteps[accessibleSteps.length - 1]
      if (lastAccessible && lastAccessible.id !== urlStep) {
        router.replace(lastAccessible.path)
        setCurrentStep(lastAccessible.id)
      }
    }
  }

  return {
    // Navigation
    nextStep,
    previousStep,
    navigateToStep,
    submitForm,
    
    // Data management
    updateStepData,
    
    // State
    currentStep: getCurrentStepFromUrl(),
    isLastStep: isLastStep(),
    
    // Utilities
    initializeStep,
  }
} 