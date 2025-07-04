import { z } from "zod"

// Step 1: Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
})

// Step 2: Address Information Schema
export const addressSchema = z.object({
  street: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
})

// Step 3: Preferences Schema
export const preferencesSchema = z.object({
  newsletter: z.boolean(),
  notifications: z.boolean(),
  marketingEmails: z.boolean(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

// Complete form schema combining all steps
export const completeFormSchema = personalInfoSchema
  .merge(addressSchema)
  .merge(preferencesSchema)

// Individual step types
export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type AddressInfo = z.infer<typeof addressSchema>
export type PreferencesInfo = z.infer<typeof preferencesSchema>
export type CompleteFormData = z.infer<typeof completeFormSchema> 