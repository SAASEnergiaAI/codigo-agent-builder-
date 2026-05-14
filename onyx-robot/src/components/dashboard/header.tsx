"use client";

import { Bell, Search, Plus } from "lucide-react";
import Link from "next/link";

export function DashboardHeader({ title }: { title: string }) {
  return (
    <header className="h-16 border-b border-onyx-border flex items-center justify-between px-6">
      <h1 className="font-[var(--font-heading)] text-lg font-bold">{title}</h1>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-onyx-dark border border-onyx-border rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-onyx-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm placeholder:text-onyx-muted/50 focus:outline-none w-40"
          />
        </div>
        <button className="p-2 text-onyx-muted hover:text-white hover:bg-white/5 rounded-xl transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-onyx-purple" />
        </button>
        <Link
          href="/generate"
          className="flex items-center gap-2 bg-onyx-purple hover:bg-onyx-purple/90 text-white px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Project</span>
        </Link>
      </div>
    </header>
  );
}
