"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  type AddressInfo,
} from "../../lib/validations/form-schemas";
import { StepProps } from "../../lib/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

/**
 * Address Information step component
 * Collects user's address details with validation
 */
export function AddressStep({
  onNext,
  onPrevious,
  currentData,
  updateData,
}: StepProps) {
  const form = useForm<AddressInfo>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: currentData.street || "",
      city: currentData.city || "",
      state: currentData.state || "",
      zipCode: currentData.zipCode || "",
      country: currentData.country || "United States",
    },
  });

  const onSubmit = (data: AddressInfo) => {
    updateData(data);
    onNext();
  };

  // Update parent data when form values change
  const handleFieldChange = (fieldName: keyof AddressInfo, value: string) => {
    updateData({ [fieldName]: value });
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

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
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
