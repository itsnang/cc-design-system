import { useReducer, useCallback } from "react";
import {
  MultiStepFormState,
  FormAction,
  FormStep,
  CompleteFormData,
} from "../lib/types";
import {
  personalInfoSchema,
  addressSchema,
  preferencesSchema,
} from "../lib/validations/form-schemas";

// Initial form steps configuration
const initialSteps: FormStep[] = [
  {
    id: 1,
    title: "Personal Information",
    description: "Tell us about yourself",
    isCompleted: false,
    isActive: true,
  },
  {
    id: 2,
    title: "Address Details",
    description: "Where can we reach you?",
    isCompleted: false,
    isActive: false,
  },
  {
    id: 3,
    title: "Preferences",
    description: "Set your preferences",
    isCompleted: false,
    isActive: false,
  },
];

// Initial state
const initialState: MultiStepFormState = {
  currentStep: 1,
  totalSteps: 3,
  steps: initialSteps,
  formData: {},
  isSubmitting: false,
  errors: {},
};

// Form reducer
function formReducer(
  state: MultiStepFormState,
  action: FormAction,
): MultiStepFormState {
  switch (action.type) {
    case "NEXT_STEP":
      if (state.currentStep < state.totalSteps) {
        const newSteps = state.steps.map((step) => ({
          ...step,
          isActive: step.id === state.currentStep + 1,
          isCompleted: step.id <= state.currentStep,
        }));
        return {
          ...state,
          currentStep: state.currentStep + 1,
          steps: newSteps,
          errors: {},
        };
      }
      return state;

    case "PREVIOUS_STEP":
      if (state.currentStep > 1) {
        const newSteps = state.steps.map((step) => ({
          ...step,
          isActive: step.id === state.currentStep - 1,
          isCompleted: step.id < state.currentStep - 1,
        }));
        return {
          ...state,
          currentStep: state.currentStep - 1,
          steps: newSteps,
          errors: {},
        };
      }
      return state;

    case "GO_TO_STEP": {
      const targetStep = action.payload;
      if (targetStep >= 1 && targetStep <= state.totalSteps) {
        const newSteps = state.steps.map((step) => ({
          ...step,
          isActive: step.id === targetStep,
          isCompleted: step.id < targetStep,
        }));
        return {
          ...state,
          currentStep: targetStep,
          steps: newSteps,
          errors: {},
        };
      }
      return state;
    }

    case "UPDATE_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };

    case "MARK_STEP_COMPLETED": {
      const stepId = action.payload;
      const newSteps = state.steps.map((step) =>
        step.id === stepId ? { ...step, isCompleted: true } : step,
      );
      return {
        ...state,
        steps: newSteps,
      };
    }

    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

/**
 * Custom hook for managing multi-step form state and navigation
 * Includes validation logic for each step before allowing navigation
 */
export function useMultiStepForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Validate current step data
  const validateCurrentStep = useCallback(
    (data: Partial<CompleteFormData>): boolean => {
      try {
        switch (state.currentStep) {
          case 1:
            personalInfoSchema.parse({
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              email: data.email || "",
              phone: data.phone || "",
            });
            break;
          case 2:
            addressSchema.parse({
              street: data.street || "",
              city: data.city || "",
              state: data.state || "",
              zipCode: data.zipCode || "",
              country: data.country || "",
            });
            break;
          case 3:
            preferencesSchema.parse({
              newsletter: data.newsletter || false,
              notifications:
                data.notifications !== undefined ? data.notifications : true,
              marketingEmails: data.marketingEmails || false,
              terms: data.terms || false,
            });
            break;
          default:
            return false;
        }
        dispatch({ type: "SET_ERRORS", payload: {} });
        return true;
      } catch (error) {
        const validationErrors: Record<string, string> = {};
        if (
          error &&
          typeof error === "object" &&
          "errors" in error &&
          Array.isArray(error.errors)
        ) {
          error.errors.forEach((err: { path: string[]; message: string }) => {
            validationErrors[err.path[0]] = err.message;
          });
        }
        dispatch({ type: "SET_ERRORS", payload: validationErrors });
        return false;
      }
    },
    [state.currentStep],
  );

  // Navigation functions
  const nextStep = useCallback(() => {
    if (validateCurrentStep(state.formData)) {
      dispatch({ type: "MARK_STEP_COMPLETED", payload: state.currentStep });
      dispatch({ type: "NEXT_STEP" });
    }
  }, [state.currentStep, state.formData, validateCurrentStep]);

  const previousStep = useCallback(() => {
    dispatch({ type: "PREVIOUS_STEP" });
  }, []);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: "GO_TO_STEP", payload: step });
  }, []);

  // Data management
  const updateFormData = useCallback((data: Partial<CompleteFormData>) => {
    dispatch({ type: "UPDATE_FORM_DATA", payload: data });
  }, []);

  const setSubmitting = useCallback((submitting: boolean) => {
    dispatch({ type: "SET_SUBMITTING", payload: submitting });
  }, []);

  const setErrors = useCallback((errors: Record<string, string>) => {
    dispatch({ type: "SET_ERRORS", payload: errors });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
  }, []);

  // Computed values
  const canGoNext = state.currentStep < state.totalSteps;
  const canGoPrevious = state.currentStep > 1;
  const isLastStep = state.currentStep === state.totalSteps;
  const progress = (state.currentStep / state.totalSteps) * 100;

  return {
    // State
    currentStep: state.currentStep,
    totalSteps: state.totalSteps,
    steps: state.steps,
    formData: state.formData,
    isSubmitting: state.isSubmitting,
    errors: state.errors,

    // Computed
    canGoNext,
    canGoPrevious,
    isLastStep,
    progress,

    // Actions
    nextStep,
    previousStep,
    goToStep,
    updateFormData,
    setSubmitting,
    setErrors,
    resetForm,
    validateCurrentStep,
  };
}
