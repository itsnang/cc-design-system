"use client"

import { useFormContext, FORM_STEPS } from '../../lib/context/form-context'
import { Progress } from '../ui/progress'
import { CheckCircle, Circle } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Form progress component
 * Shows current step, progress bar, and step indicators
 */
export function FormProgress() {
  const { currentStep, progress, isStepCompleted } = useFormContext()

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Step {currentStep} of {FORM_STEPS.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="w-full h-2" />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-center space-x-4">
        {FORM_STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              {/* Step circle */}
              <div 
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                  {
                    "bg-green-100 border-green-500": isStepCompleted(step.id),
                    "bg-blue-100 border-blue-500": currentStep === step.id,
                    "bg-gray-100 border-gray-300": currentStep !== step.id && !isStepCompleted(step.id),
                  }
                )}
              >
                {isStepCompleted(step.id) ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : currentStep === step.id ? (
                  <Circle className="w-6 h-6 text-blue-600 fill-current" />
                ) : (
                  <span className="text-sm font-medium text-gray-400">{step.id}</span>
                )}
              </div>

              {/* Step info */}
              <div className="mt-2 text-center max-w-[120px]">
                <div 
                  className={cn(
                    "text-sm font-medium",
                    {
                      "text-green-600": isStepCompleted(step.id),
                      "text-blue-600": currentStep === step.id,
                      "text-gray-400": currentStep !== step.id && !isStepCompleted(step.id),
                    }
                  )}
                >
                  {step.title}
                </div>
                <div 
                  className={cn(
                    "text-xs mt-1",
                    {
                      "text-green-500": isStepCompleted(step.id),
                      "text-blue-500": currentStep === step.id,
                      "text-gray-400": currentStep !== step.id && !isStepCompleted(step.id),
                    }
                  )}
                >
                  {step.description}
                </div>
              </div>
            </div>

            {/* Connector line */}
            {index < FORM_STEPS.length - 1 && (
              <div 
                className={cn(
                  "w-12 h-0.5 mx-4 transition-colors duration-200",
                  {
                    "bg-green-500": isStepCompleted(step.id),
                    "bg-gray-300": !isStepCompleted(step.id),
                  }
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 