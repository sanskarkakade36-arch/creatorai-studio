"use client";

import {
  Bell,
  Search,
  Menu,
} from "lucide-react";

import { UserMenu } from "./UserMenu";

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">

      {/* Left Section */}

      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}

        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 md:hidden">
          <Menu size={22} />
        </button>

        {/* Search */}

        <div className="hidden md:flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4 py-2">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 bg-transparent outline-none text-sm text-white placeholder:text-slate-500"
          />

        </div>

      </div>

      {/* Right Section */}

      <div className="flex items-center gap-4">

        <button className="relative rounded-lg p-2 hover:bg-slate-800">

          <Bell
            size={22}
            className="text-slate-300"
          />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <UserMenu />

      </div>

    </header>
  );
}