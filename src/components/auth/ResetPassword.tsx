"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { PasswordInput } from "./PasswordInput";
import { PasswordStrength } from "./PasswordStrength";
import { AuthCard } from "./AuthCard";

import { authService } from "@/services/auth";

import { toast } from "sonner";

interface ResetPasswordData {
  password: string;
  confirmPassword: string;
}

export function ResetPasswordForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordData>();

  const password = watch("password");

  async function onSubmit(data: ResetPasswordData) {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await authService.updatePassword(data.password);

      toast.success(
        "Password updated successfully."
      );

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.message ||
          "Unable to update password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Create a new secure password."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          {...register("password", {
            required: "Password is required",
          })}
          error={errors.password?.message}
        />

        <PasswordStrength
          password={password ?? ""}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          {...register("confirmPassword", {
            required:
              "Please confirm your password",
          })}
          error={errors.confirmPassword?.message}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700 transition disabled:opacity-50"
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </AuthCard>
  );
}