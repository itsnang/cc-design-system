"use server"

import { completeFormSchema, type CompleteFormData } from "../../lib/validations/form-schemas"
import { FormSubmissionResult } from "../../lib/types"

/**
 * Server action to submit the complete multi-step form
 * Validates all data and simulates processing
 */
export async function submitMultiStepForm(formData: CompleteFormData): Promise<FormSubmissionResult> {
  try {
    // Validate the complete form data
    const validatedData = completeFormSchema.parse(formData)
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate random success/failure for demo purposes
    // In a real app, this would save to database, send emails, etc.
    const isSuccess = Math.random() > 0.1 // 90% success rate for demo
    
    if (!isSuccess) {
      return {
        success: false,
        message: "Something went wrong. Please try again.",
        errors: {
          general: "There was an error processing your registration. Please try again."
        }
      }
    }
    
    // Log the successful submission (in production, save to database)
    console.log("Form submitted successfully:", {
      id: `user-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      data: validatedData
    })
    
    return {
      success: true,
      message: "Registration completed successfully! Welcome aboard.",
      data: validatedData
    }
    
  } catch (error) {
    console.error("Form submission error:", error)
    
    // Handle validation errors
    if (error && typeof error === 'object' && 'errors' in error && Array.isArray(error.errors)) {
      const validationErrors: Record<string, string> = {}
      error.errors.forEach((err: { path: string[]; message: string }) => {
        validationErrors[err.path[0]] = err.message
      })
      
      return {
        success: false,
        message: "Please fix the validation errors and try again.",
        errors: validationErrors
      }
    }
    
    // Handle unexpected errors
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      errors: {
        general: "Internal server error. Please contact support if this persists."
      }
    }
  }
}

/**
 * Server action to validate individual steps
 * Useful for real-time validation feedback
 */
export async function validateFormStep(stepNumber: number, stepData: Partial<CompleteFormData>): Promise<{
  isValid: boolean
  errors: Record<string, string>
}> {
  try {
    const { personalInfoSchema, addressSchema, preferencesSchema } = await import("../../lib/validations/form-schemas")
    
    switch (stepNumber) {
      case 1:
        personalInfoSchema.parse({
          firstName: stepData.firstName || "",
          lastName: stepData.lastName || "",
          email: stepData.email || "",
          phone: stepData.phone || "",
        })
        break
      case 2:
        addressSchema.parse({
          street: stepData.street || "",
          city: stepData.city || "",
          state: stepData.state || "",
          zipCode: stepData.zipCode || "",
          country: stepData.country || "",
        })
        break
      case 3:
        preferencesSchema.parse({
          newsletter: stepData.newsletter || false,
          notifications: stepData.notifications !== undefined ? stepData.notifications : true,
          marketingEmails: stepData.marketingEmails || false,
          terms: stepData.terms || false,
        })
        break
      default:
        throw new Error("Invalid step number")
    }
    
    return {
      isValid: true,
      errors: {}
    }
    
  } catch (error) {
    const validationErrors: Record<string, string> = {}
    
    if (error && typeof error === 'object' && 'errors' in error && Array.isArray(error.errors)) {
      error.errors.forEach((err: { path: string[]; message: string }) => {
        validationErrors[err.path[0]] = err.message
      })
    }
    
    return {
      isValid: false,
      errors: validationErrors
    }
  }
} 