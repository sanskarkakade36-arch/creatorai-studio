"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/lib/validation";

import { authService } from "@/services/auth";

import { AuthCard } from "./AuthCard";
import { Divider } from "./Divider";
import { AuthFooter } from "./AuthFooter";
import { PasswordInput } from "./PasswordInput";
import { SocialLogin } from "./SocialLogin";

export function LoginForm() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(data: any) {
    try {

      setLoading(true);

      await authService.signIn(data);
      // Wait for Supabase to save the session
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.replace("/dashboard");router.refresh();
    } catch (error: any) {

      alert(error.message);

    } finally {

      setLoading(false);

    }
  }

  return (
    <AuthCard
      title="Welcome Back 👋"
      subtitle="Login to continue creating AI images."
    >

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        <div className="space-y-2">

          <label className="text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            {...register("email")}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
          />

          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message as string}
            </p>
          )}

        </div>

        <PasswordInput
          label="Password"
          {...register("password")}
          error={errors.password?.message as string}
        />

        <div className="flex justify-between items-center text-sm">

          <label className="flex items-center gap-2">

            <input type="checkbox" />

            Remember Me

          </label>

          <Link
          href="/auth/forgot-password" className="text-violet-600 hover:underline"
          >
            Forgot Password?
            </Link>

        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white hover:bg-violet-700 transition disabled:opacity-60"
        >

          {loading ? "Signing In..." : "Login"}

        </button>

      </form>

      <Divider />

      <SocialLogin />

      <AuthFooter
        question="Don't have an account?"
        linkText="Create Account"
        href="/register"
      />

    </AuthCard>
  );
}