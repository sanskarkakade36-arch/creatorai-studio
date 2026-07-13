"use client";

import { authService } from "@/services/auth";

export function SocialLogin() {
  return (
    <div className="grid grid-cols-2 gap-4">

      <button
        type="button"
        onClick={() => authService.signInWithGoogle()}
        className="rounded-xl border p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        Google
      </button>

      <button
        type="button"
        onClick={() => authService.signInWithGithub()}
        className="rounded-xl border p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        GitHub
      </button>

    </div>
  );
}