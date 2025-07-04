import type { CompleteFormData } from "./validations/form-schemas";

// Re-export for convenience
export type { CompleteFormData } from "./validations/form-schemas";

// Form step definitions
export interface FormStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

// Multi-step form state
export interface MultiStepFormState {
  currentStep: number;
  totalSteps: number;
  steps: FormStep[];
  formData: Partial<CompleteFormData>;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

// Form actions
export type FormAction =
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "GO_TO_STEP"; payload: number }
  | { type: "UPDATE_FORM_DATA"; payload: Partial<CompleteFormData> }
  | { type: "MARK_STEP_COMPLETED"; payload: number }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_ERRORS"; payload: Record<string, string> }
  | { type: "RESET_FORM" };

// Form submission result
export interface FormSubmissionResult {
  success: boolean;
  message: string;
  data?: CompleteFormData;
  errors?: Record<string, string>;
}

// Step component props
export interface StepProps {
  onNext: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
  currentData: Partial<CompleteFormData>;
  updateData: (data: Partial<CompleteFormData>) => void;
}
