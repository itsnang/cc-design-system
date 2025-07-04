"use client"

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { CompleteFormData, personalInfoSchema, addressSchema, preferencesSchema } from '../validations/form-schemas'

// Form steps configuration
export const FORM_STEPS = [
  { id: 1, path: '/register/personal', title: 'Personal Information', description: 'Basic details' },
  { id: 2, path: '/register/address', title: 'Address Information', description: 'Location details' },
  { id: 3, path: '/register/preferences', title: 'Preferences', description: 'Communication settings' },
] as const

export type FormStep = typeof FORM_STEPS[number]

// Form state interface
interface FormState {
  currentStep: number
  formData: Partial<CompleteFormData>
  completedSteps: number[]
  isSubmitting: boolean
  errors: Record<string, string>
}

// Form actions
type FormAction =
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<CompleteFormData> }
  | { type: 'MARK_STEP_COMPLETED'; payload: number }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'RESET_FORM' }
  | { type: 'LOAD_FROM_STORAGE'; payload: FormState }

// Initial state
const initialState: FormState = {
  currentStep: 1,
  formData: {},
  completedSteps: [],
  isSubmitting: false,
  errors: {},
}

// localStorage key
const STORAGE_KEY = 'multi-step-form-data'

// Form reducer
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload, errors: {} }
    
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
        errors: {},
      }
    
    case 'MARK_STEP_COMPLETED': {
      const step = action.payload
      const completedSteps = state.completedSteps.includes(step)
        ? state.completedSteps
        : [...state.completedSteps, step].sort()
      
      return { ...state, completedSteps }
    }
    
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload }
    
    case 'SET_ERRORS':
      return { ...state, errors: action.payload }
    
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} }
    
    case 'RESET_FORM':
      return initialState
    
    case 'LOAD_FROM_STORAGE':
      return action.payload
    
    default:
      return state
  }
}

// Context interface
interface FormContextType {
  // State
  currentStep: number
  formData: Partial<CompleteFormData>
  completedSteps: number[]
  isSubmitting: boolean
  errors: Record<string, string>
  
  // Computed values
  totalSteps: number
  progress: number
  canAccessStep: (step: number) => boolean
  isStepCompleted: (step: number) => boolean
  
  // Actions
  setCurrentStep: (step: number) => void
  updateFormData: (data: Partial<CompleteFormData>) => void
  markStepCompleted: (step: number) => void
  setSubmitting: (submitting: boolean) => void
  setErrors: (errors: Record<string, string>) => void
  clearErrors: () => void
  resetForm: () => void
  
  // Validation
  validateStep: (step: number) => boolean
}

// Create context
const FormContext = createContext<FormContextType | undefined>(undefined)

// Custom hook to use form context
export function useFormContext() {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}

// localStorage utilities
const saveToStorage = (state: FormState) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  } catch (error) {
    console.error('Failed to save form data to localStorage:', error)
  }
}

const loadFromStorage = (): FormState | null => {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    }
  } catch (error) {
    console.error('Failed to load form data from localStorage:', error)
  }
  return null
}

const clearStorage = () => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch (error) {
    console.error('Failed to clear form data from localStorage:', error)
  }
}

// Form Provider component
interface FormProviderProps {
  children: ReactNode
}

export function FormProvider({ children }: FormProviderProps) {
  const [state, dispatch] = useReducer(formReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedState = loadFromStorage()
    if (savedState) {
      dispatch({ type: 'LOAD_FROM_STORAGE', payload: savedState })
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(state)
  }, [state])

  // Validation function for each step
  const validateStep = (step: number): boolean => {
    try {
      switch (step) {
        case 1:
          personalInfoSchema.parse({
            firstName: state.formData.firstName || '',
            lastName: state.formData.lastName || '',
            email: state.formData.email || '',
            phone: state.formData.phone || '',
          })
          return true
        case 2:
          addressSchema.parse({
            street: state.formData.street || '',
            city: state.formData.city || '',
            state: state.formData.state || '',
            zipCode: state.formData.zipCode || '',
            country: state.formData.country || '',
          })
          return true
        case 3:
          preferencesSchema.parse({
            newsletter: state.formData.newsletter || false,
            notifications: state.formData.notifications !== undefined ? state.formData.notifications : true,
            marketingEmails: state.formData.marketingEmails || false,
            terms: state.formData.terms || false,
          })
          return true
        default:
          return false
      }
    } catch {
      return false
    }
  }

  // Check if user can access a specific step
  const canAccessStep = (step: number): boolean => {
    if (step === 1) return true
    
    // Can access step if previous step is completed
    return state.completedSteps.includes(step - 1)
  }

  // Check if step is completed
  const isStepCompleted = (step: number): boolean => {
    return state.completedSteps.includes(step)
  }

  // Context value
  const contextValue: FormContextType = {
    // State
    currentStep: state.currentStep,
    formData: state.formData,
    completedSteps: state.completedSteps,
    isSubmitting: state.isSubmitting,
    errors: state.errors,
    
    // Computed values
    totalSteps: FORM_STEPS.length,
    progress: (state.completedSteps.length / FORM_STEPS.length) * 100,
    canAccessStep,
    isStepCompleted,
    
    // Actions
    setCurrentStep: (step: number) => dispatch({ type: 'SET_CURRENT_STEP', payload: step }),
    updateFormData: (data: Partial<CompleteFormData>) => dispatch({ type: 'UPDATE_FORM_DATA', payload: data }),
    markStepCompleted: (step: number) => dispatch({ type: 'MARK_STEP_COMPLETED', payload: step }),
    setSubmitting: (submitting: boolean) => dispatch({ type: 'SET_SUBMITTING', payload: submitting }),
    setErrors: (errors: Record<string, string>) => dispatch({ type: 'SET_ERRORS', payload: errors }),
    clearErrors: () => dispatch({ type: 'CLEAR_ERRORS' }),
    resetForm: () => {
      dispatch({ type: 'RESET_FORM' })
      clearStorage()
    },
    
    // Validation
    validateStep,
  }

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  )
} 