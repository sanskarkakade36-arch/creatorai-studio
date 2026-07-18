"use client";

import { authService } from "@/services/auth";

export function SocialLogin() {
  return (
    <button
      onClick={async () => {
        console.log("Button clicked");

        try {
          await authService.signInWithGoogle();
          console.log("Finished");
        } catch (e) {
          console.error(e);
        }
      }}
      className="border p-4 rounded"
    >
      Google Login
    </button>
  );
}