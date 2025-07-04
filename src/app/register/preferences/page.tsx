"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  preferencesSchema,
  type PreferencesInfo,
} from "../../../lib/validations/form-schemas";
import { useFormContext } from "../../../lib/context/form-context";
import { useFormNavigation } from "../../../hooks/use-form-navigation";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../../../components/ui/form";
import { Checkbox } from "../../../components/ui/checkbox";

export default function PreferencesPage() {
  const { formData, errors, isSubmitting } = useFormContext();
  const { previousStep, submitForm, updateStepData, initializeStep } =
    useFormNavigation();

  // Initialize step on mount
  useEffect(() => {
    initializeStep();
  }, [initializeStep]);

  const form = useForm<PreferencesInfo>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      newsletter: formData.newsletter ?? false,
      notifications: formData.notifications ?? true,
      marketingEmails: formData.marketingEmails ?? false,
      terms: formData.terms ?? false,
    },
  });

  const onSubmit = (data: PreferencesInfo) => {
    updateStepData(data);
    submitForm();
  };

  // Update context when form values change
  const handleFieldChange = (
    fieldName: keyof PreferencesInfo,
    value: boolean
  ) => {
    updateStepData({ [fieldName]: value });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Choose your communication preferences and accept our terms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="notifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          handleFieldChange(
                            "notifications",
                            checked as boolean
                          );
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Enable notifications</FormLabel>
                      <FormDescription>
                        Receive important updates and account notifications.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newsletter"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          handleFieldChange("newsletter", checked as boolean);
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Subscribe to newsletter</FormLabel>
                      <FormDescription>
                        Get weekly updates, tips, and product announcements.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marketingEmails"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          handleFieldChange(
                            "marketingEmails",
                            checked as boolean
                          );
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Receive marketing emails</FormLabel>
                      <FormDescription>
                        Get promotional offers, special deals, and product
                        recommendations.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          handleFieldChange("terms", checked as boolean);
                        }}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium">
                        I accept the terms and conditions *
                      </FormLabel>
                      <FormDescription>
                        You must accept our terms and conditions to continue.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Display general errors */}
            {errors.general && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                {errors.general}
              </div>
            )}

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={previousStep}
                className="px-8"
                disabled={isSubmitting}
              >
                Previous
              </Button>
              <Button type="submit" className="px-8" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Complete Registration"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
