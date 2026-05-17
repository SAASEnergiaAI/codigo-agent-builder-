"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  Wand2,
  Store,
  Settings,
  CreditCard,
  Shield,
  FileText,
  Rocket,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Wand2, label: "Generate", href: "/generate" },
  { icon: FolderOpen, label: "Projects", href: "/dashboard" },
  { icon: Store, label: "Marketplace", href: "/marketplace" },
  { icon: Rocket, label: "Deploy", href: "/deploy" },
  { icon: FileText, label: "Docs", href: "/docs" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: CreditCard, label: "Billing", href: "/billing" },
  { icon: Shield, label: "Admin", href: "/admin" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-onyx-dark border-r border-onyx-border flex flex-col z-40 transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-onyx-border">
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-onyx-purple flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <span className="font-[var(--font-heading)] text-sm font-bold whitespace-nowrap">
              ONYX<span className="text-onyx-purple">.robot</span>
            </span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-onyx-muted hover:text-white p-1 hidden lg:block"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                  isActive
                    ? "bg-onyx-purple/10 text-onyx-purple"
                    : "text-onyx-muted hover:text-white hover:bg-white/5"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-onyx-border py-4 px-3 space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                isActive
                  ? "bg-onyx-purple/10 text-onyx-purple"
                  : "text-onyx-muted hover:text-white hover:bg-white/5"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      <div className="p-3 border-t border-onyx-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-onyx-purple/20 flex items-center justify-center flex-shrink-0 text-xs font-medium text-onyx-purple">
            U
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">User</p>
              <p className="text-xs text-onyx-muted truncate">Pro Plan</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
