"use client"

import { useState } from "react"
import { useMultiStepForm } from "../../hooks/use-multi-step-form"
import { submitMultiStepForm } from "../../app/actions/form-actions"
import { CompleteFormData } from "../../lib/validations/form-schemas"
import { PersonalInfoStep } from "./personal-info-step"
import { AddressStep } from "./address-step"
import { PreferencesStep } from "./preferences-step"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { CheckCircle, Circle, AlertCircle } from "lucide-react"

/**
 * Main multi-step form component
 * Manages form state, navigation, and submission
 */
export function MultiStepForm() {
  const {
    currentStep,
    totalSteps,
    steps,
    formData,
    isSubmitting,
    errors,
    progress,
    nextStep,
    previousStep,
    updateFormData,
    setSubmitting,
    setErrors,
    resetForm,
    validateCurrentStep,
  } = useMultiStepForm()

  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean
    message: string
  } | null>(null)

  // Handle form submission for the final step
  const handleFormSubmit = async () => {
    if (!validateCurrentStep(formData)) {
      return
    }

    setSubmitting(true)
    setErrors({})

    try {
      const result = await submitMultiStepForm(formData as CompleteFormData)
      setSubmissionResult({
        success: result.success,
        message: result.message,
      })

      if (!result.success && result.errors) {
        setErrors(result.errors)
      }
    } catch (error) {
      console.error("Submission error:", error)
      setSubmissionResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Step navigation handlers
  const handleNext = () => {
    if (currentStep === totalSteps) {
      handleFormSubmit()
    } else {
      nextStep()
    }
  }

  const handlePrevious = () => {
    previousStep()
  }

  // Reset form and start over
  const handleStartOver = () => {
    resetForm()
    setSubmissionResult(null)
  }

  // Render step indicator
  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors">
              {step.isCompleted ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : step.isActive ? (
                <Circle className="w-6 h-6 text-blue-600 fill-current" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <div className="mt-2 text-center">
              <div className={`text-sm font-medium ${
                step.isActive ? 'text-blue-600' : 
                step.isCompleted ? 'text-green-600' : 'text-gray-400'
              }`}>
                Step {step.id}
              </div>
              <div className={`text-xs ${
                step.isActive ? 'text-blue-600' : 
                step.isCompleted ? 'text-green-600' : 'text-gray-400'
              }`}>
                {step.title}
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-12 h-0.5 mx-4 ${
              step.isCompleted ? 'bg-green-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  // Render current step content
  const renderCurrentStep = () => {
    const stepProps = {
      onNext: handleNext,
      onPrevious: handlePrevious,
      isSubmitting,
      currentData: formData,
      updateData: updateFormData,
    }

    switch (currentStep) {
      case 1:
        return <PersonalInfoStep {...stepProps} />
      case 2:
        return <AddressStep {...stepProps} />
      case 3:
        return <PreferencesStep {...stepProps} />
      default:
        return null
    }
  }

  // Render submission success/error state
  if (submissionResult) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {submissionResult.success ? (
                <CheckCircle className="w-16 h-16 text-green-600" />
              ) : (
                <AlertCircle className="w-16 h-16 text-red-600" />
              )}
            </div>
            <CardTitle className={submissionResult.success ? 'text-green-600' : 'text-red-600'}>
              {submissionResult.success ? 'Success!' : 'Error'}
            </CardTitle>
            <CardDescription>
              {submissionResult.message}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            {submissionResult.success ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Thank you for completing the registration form. You should receive a confirmation email shortly.
                </p>
                <Button onClick={handleStartOver} variant="outline">
                  Fill Out Another Form
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Please review your information and try again.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => setSubmissionResult(null)} variant="outline">
                    Try Again
                  </Button>
                  <Button onClick={handleStartOver}>
                    Start Over
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Step indicator */}
      {renderStepIndicator()}

      {/* Error messages */}
      {Object.keys(errors).length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Please fix the following errors:</span>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-red-600">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>• {message}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Current step content */}
      {renderCurrentStep()}
    </div>
  )
} 