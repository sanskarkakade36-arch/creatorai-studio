"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/lib/validation";
import type { RegisterFormData } from "@/types/auth";

import { authService } from "@/services/auth";

import { AuthCard } from "./AuthCard";
import { PasswordInput } from "./PasswordInput";
import { PasswordStrength } from "./PasswordStrength";
import { TermsCheckbox } from "./TermsCheckbox";
import { Divider } from "./Divider";
import { SocialLogin } from "./SocialLogin";
import { AuthFooter } from "./AuthFooter";

import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchedPassword = watch("password");

  async function onSubmit(data: RegisterFormData) {
  if (!termsAccepted) {
    toast.error("Please accept the Terms & Conditions.");
    return;
  }

  try {
    setLoading(true);

    const result = await authService.signUp(data);
    console.log("Signup Result:", result);

    if (result.session) {
      toast.success("Account created successfully.");

      router.push("/dashboard");
      return;
    }

    toast.success(
      "Verification email sent successfully."
    );

    router.push(
  `/auth/verify-email?email=${encodeURIComponent(
    data.email
  )}`
);
  } catch (error: any) {
    toast.error(
      error.message || "Registration failed."
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <AuthCard
      title="Create Account"
      subtitle="Start generating AI images today."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Full Name */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            {...register("fullName")}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
          />

          {errors.fullName && (
            <p className="text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />

        {/* Password Strength */}

        <PasswordStrength
          password={watchedPassword ?? ""}
        />

        {/* Confirm Password */}

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {/* Terms */}

        <TermsCheckbox
          checked={termsAccepted}
          onChange={setTermsAccepted}
        />

        {/* Register Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        {/* Divider */}

        <Divider />

        {/* Social Login */}

        <SocialLogin />

        {/* Footer */}

        <AuthFooter
          question="Already have an account?"
          linkText="Login"
          href="/login"
        />
      </form>
    </AuthCard>
  );
}