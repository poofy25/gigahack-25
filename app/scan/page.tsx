"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { FormSection } from "@/components/sections/FormSection";
import { useSubmitEmail } from "@/lib/hooks";
import { emailSchema, type EmailFormData } from "@/lib/validations";

export default function SignInPage() {
  const router = useRouter();
  const submitEmailMutation = useSubmitEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: EmailFormData) => {
    try {
      const result = await submitEmailMutation.mutateAsync(data);
      // Redirect to scan page after successful email submission
      router.push("/dashboard");
    } catch (error) {
      // Error is handled by the mutation's onError callback
      console.error("Email submission failed:", error);
    }
  };

  return (
    <PageLayout>
      <HeroSection
        title="Sign in to"
        description="We need to verify wether you are part of the organization being tested. "
        highlightText=" CyberDoc"
        highlightColor="#0ea5e9"
      />

      <FormSection
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        fieldName="email"
        placeholder="Enter your corporate email"
        buttonText="Submit"
        isLoading={submitEmailMutation.isPending}
        inputTestId="input-email"
        buttonTestId="button-submit"
      />
    </PageLayout>
  );
}
