"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Sparkles,
  Images,
  FolderOpen,
  ArrowRight,
} from "lucide-react";

import Link from "next/link";

import { useAuth } from "@/hooks/useauth";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardPage() {
  const router = useRouter();

  const {
    user,
    loading,
    isAuthenticated,
    logout,
  } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-lg font-medium text-white">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <div className="space-y-8">

      {/* Hero Section */}

      <DashboardHeader />

      {/* Welcome */}

      <section>

        <h2 className="text-3xl font-bold text-white">
          Welcome back,
          {" "}
          {user?.user_metadata?.full_name ||
            user?.email}
          👋
        </h2>

        <p className="mt-2 text-slate-400">
          Create amazing AI-generated images,
          manage your projects and explore
          your history.
        </p>

      </section>

      {/* Statistics */}

      <section className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold text-slate-300">
              Images Generated
            </h3>

            <Images className="text-violet-500" />

          </div>

          <p className="mt-6 text-4xl font-bold text-white">
            0
          </p>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold text-slate-300">
              Credits Used
            </h3>

            <Sparkles className="text-yellow-400" />

          </div>

          <p className="mt-6 text-4xl font-bold text-white">
            0
          </p>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold text-slate-300">
              Projects
            </h3>

            <FolderOpen className="text-green-400" />

          </div>

          <p className="mt-6 text-4xl font-bold text-white">
            0
          </p>

        </div>

      </section>

      {/* Quick Actions */}

      <section>

        <h2 className="mb-5 text-2xl font-bold text-white">
          Quick Actions
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <Link
            href="/dashboard/generate"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-violet-600 hover:bg-slate-800"
          >
            <Sparkles className="mb-5 h-10 w-10 text-violet-500" />

            <h3 className="text-lg font-semibold text-white">
              Generate Image
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Create stunning AI artwork.
            </p>

            <ArrowRight className="mt-6" />
          </Link>

          <Link
            href="/dashboard/history"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-violet-600 hover:bg-slate-800"
          >
            <Images className="mb-5 h-10 w-10 text-violet-500" />

            <h3 className="text-lg font-semibold text-white">
              History
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              View all generated images.
            </p>

            <ArrowRight className="mt-6" />
          </Link>

          <Link
            href="/dashboard/profile"
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-violet-600 hover:bg-slate-800"
          >
            <FolderOpen className="mb-5 h-10 w-10 text-violet-500" />

            <h3 className="text-lg font-semibold text-white">
              Profile
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Manage your account.
            </p>

            <ArrowRight className="mt-6" />
          </Link>

          <button
            onClick={logout}
            className="rounded-2xl border border-red-700 bg-red-600/20 p-6 text-left transition hover:bg-red-600/40"
          >
            <h3 className="text-lg font-semibold text-red-400">
              Logout
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Sign out from CreatorAI Studio.
            </p>
          </button>

        </div>

      </section>

      {/* Account */}

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <h2 className="text-2xl font-bold text-white">
          Account Information
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <div>
            <p className="text-sm text-slate-400">
              Full Name
            </p>

            <p className="mt-1 text-white">
              {user?.user_metadata?.full_name ||
                "Not Available"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Email
            </p>

            <p className="mt-1 text-white">
              {user?.email}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-slate-400">
              User ID
            </p>

            <p className="mt-1 break-all text-white">
              {user?.id}
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}