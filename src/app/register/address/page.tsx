"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  type AddressInfo,
} from "../../../lib/validations/form-schemas";
import { useFormContext } from "../../../lib/context/form-context";
import { useFormNavigation } from "../../../hooks/use-form-navigation";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
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
} from "../../../components/ui/form";

export default function AddressPage() {
  const { formData, errors } = useFormContext();
  const { nextStep, previousStep, updateStepData, initializeStep } =
    useFormNavigation();

  // Initialize step on mount
  useEffect(() => {
    initializeStep();
  }, [initializeStep]);

  const form = useForm<AddressInfo>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: formData.street || "",
      city: formData.city || "",
      state: formData.state || "",
      zipCode: formData.zipCode || "",
      country: formData.country || "United States",
    },
  });

  const onSubmit = (data: AddressInfo) => {
    updateStepData(data);
    nextStep();
  };

  // Update context when form values change
  const handleFieldChange = (fieldName: keyof AddressInfo, value: string) => {
    updateStepData({ [fieldName]: value });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Address Information</CardTitle>
        <CardDescription>
          Please provide your address details for our records.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your street address"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("street", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your city"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange("city", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Province</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your state"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange("state", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP/Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your ZIP code"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange("zipCode", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your country"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleFieldChange("country", e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
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
              >
                Previous
              </Button>
              <Button type="submit" className="px-8">
                Next Step
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
