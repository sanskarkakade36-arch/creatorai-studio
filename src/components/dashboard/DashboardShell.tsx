"use client";

import type { ReactNode } from "react";

import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* Sidebar */}

      <Sidebar />

      {/* Right Section */}

      <div className="flex flex-1 flex-col">

        {/* Top Navigation */}

        <TopNavbar />

        {/* Main Content */}

        <main className="flex-1 overflow-y-auto p-6">

          {children}

        </main>

      </div>

    </div>
  );
}