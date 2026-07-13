"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

import {
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { authService } from "@/services/auth";

import { toast } from "sonner";

export function UserMenu() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  async function handleLogout() {
    try {
      await authService.logout();

      toast.success("Logged out successfully.");

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.message || "Logout failed."
      );
    }
  }

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 hover:bg-slate-700 transition"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white font-semibold">
          U
        </div>

        <div className="hidden text-left md:block">
          <p className="text-sm font-medium text-white">
            User
          </p>

          <p className="text-xs text-slate-400">
            user@example.com
          </p>
        </div>

        <ChevronDown
          size={18}
          className="text-slate-400"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-700 bg-slate-900 shadow-xl">

          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800"
          >
            <User size={18} />

            Profile
          </Link>

          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800"
          >
            <Settings size={18} />

            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800"
          >
            <LogOut size={18} />

            Logout
          </button>

        </div>
      )}

    </div>
  );
}