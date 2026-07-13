"use client";

import { useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";

import { authService } from "@/services/auth";

import { AuthCard } from "./AuthCard";
import { AuthFooter } from "./AuthFooter";

import { toast } from "sonner";

interface ForgotPasswordData {
  email: string;
}

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>();

  async function onSubmit(data: ForgotPasswordData) {
    try {
      setLoading(true);

      await authService.forgotPassword(data.email);

      toast.success(
        "Password reset email sent successfully."
      );
    } catch (error: any) {
      toast.error(
        error.message ||
          "Unable to send reset email."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Forgot Password"
      subtitle="Enter your email to receive a password reset link."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700 transition disabled:opacity-50"
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        <AuthFooter
          question="Remember your password?"
          linkText="Login"
          href="/login"
        />
      </form>
    </AuthCard>
  );
}