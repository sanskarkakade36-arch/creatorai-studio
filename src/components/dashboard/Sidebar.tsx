"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Sparkles,
  History,
  Heart,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Generate",
    href: "/dashboard/generate",
    icon: Sparkles,
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: History,
  },
  {
    title: "Favorites",
    href: "/dashboard/favorites",
    icon: Heart,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-72 flex-col bg-slate-900 border-r border-slate-800">

      {/* Logo */}

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-2xl font-bold text-white">
          CreatorAI
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          AI Image Studio
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
              ${
                active
                  ? "bg-violet-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-800 p-4">

        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-slate-800 transition"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}