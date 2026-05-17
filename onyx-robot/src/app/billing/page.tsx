"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { CreditCard, Check, Sparkles, ArrowUpRight, Receipt } from "lucide-react";

const invoices = [
  { id: "INV-001", date: "May 1, 2026", amount: "$29.00", status: "Paid" },
  { id: "INV-002", date: "Apr 1, 2026", amount: "$29.00", status: "Paid" },
  { id: "INV-003", date: "Mar 1, 2026", amount: "$29.00", status: "Paid" },
  { id: "INV-004", date: "Feb 1, 2026", amount: "$29.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <>
      <DashboardHeader title="Billing" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2 glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-onyx-purple" />
                  <span className="text-xs text-onyx-purple font-medium">Current Plan</span>
                </div>
                <h2 className="text-2xl font-bold">Pro Plan</h2>
                <p className="text-sm text-onyx-muted">$29/month • Renews on June 1, 2026</p>
              </div>
              <button className="bg-onyx-purple/10 text-onyx-purple px-4 py-2 rounded-xl text-sm hover:bg-onyx-purple/20 transition-colors flex items-center gap-1">
                Upgrade
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Projects", used: "12", total: "Unlimited" },
                { label: "Generations", used: "847", total: "1,000" },
                { label: "Storage", used: "23.4 GB", total: "50 GB" },
                { label: "API Calls", used: "12.3k", total: "50k" },
              ].map((item) => (
                <div key={item.label} className="bg-onyx-dark rounded-xl p-3">
                  <p className="text-xs text-onyx-muted mb-1">{item.label}</p>
                  <p className="text-sm font-semibold">
                    {item.used} <span className="text-onyx-muted font-normal">/ {item.total}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold">Plan Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "Unlimited projects",
                  "Advanced AI agents",
                  "Ultra Design Mode",
                  "GitHub export",
                  "Custom domains",
                  "Priority support",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-onyx-muted">
                    <Check className="w-4 h-4 text-onyx-purple" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-onyx-purple" />
              Payment Method
            </h3>
            <div className="bg-onyx-dark rounded-xl p-4 border border-onyx-border mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="text-sm">•••• 4242</p>
                    <p className="text-xs text-onyx-muted">Expires 12/27</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                  Default
                </span>
              </div>
            </div>
            <button className="w-full text-xs text-onyx-muted hover:text-white py-2 border border-onyx-border rounded-xl hover:border-onyx-purple/30 transition-colors">
              + Add Payment Method
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="glass rounded-2xl"
        >
          <div className="flex items-center justify-between p-5 border-b border-onyx-border">
            <h3 className="font-semibold flex items-center gap-2">
              <Receipt className="w-4 h-4 text-onyx-purple" />
              Invoice History
            </h3>
          </div>
          <div className="divide-y divide-onyx-border/50">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-onyx-muted">{inv.id}</span>
                  <span className="text-sm">{inv.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{inv.amount}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                    {inv.status}
                  </span>
                  <button className="text-xs text-onyx-purple hover:text-onyx-purple-light">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
