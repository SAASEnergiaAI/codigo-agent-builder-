"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const comparisonData = [
  { feature: "Full-Stack Generation", onyx: true, boltNew: "partial", others: false },
  { feature: "Ultra Design Mode", onyx: true, boltNew: false, others: false },
  { feature: "Mobile App Generation", onyx: true, boltNew: false, others: false },
  { feature: "Multi-Agent AI System", onyx: true, boltNew: false, others: false },
  { feature: "One-Click Deploy", onyx: true, boltNew: true, others: "partial" },
  { feature: "Real-time Preview", onyx: true, boltNew: true, others: "partial" },
  { feature: "Auto Database Schema", onyx: true, boltNew: "partial", others: false },
  { feature: "Premium Animations", onyx: true, boltNew: false, others: false },
  { feature: "GitHub Export", onyx: true, boltNew: true, others: true },
  { feature: "Template Marketplace", onyx: true, boltNew: false, others: "partial" },
  { feature: "Team Collaboration", onyx: true, boltNew: false, others: false },
  { feature: "AI Image & Logo Gen", onyx: true, boltNew: false, others: false },
];

function StatusIcon({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-green-400" />;
  if (value === "partial") return <Minus className="w-4 h-4 text-yellow-400" />;
  return <X className="w-4 h-4 text-onyx-muted/40" />;
}

export function Comparison() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-onyx-purple font-medium tracking-widest uppercase mb-4 block">
            Comparison
          </span>
          <h2 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold mb-4">
            Why <span className="gradient-text">ONYX.robot</span>?
          </h2>
          <p className="text-onyx-muted">
            See how we compare to the competition.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-onyx-border">
                  <th className="text-left py-4 px-6 text-onyx-muted font-medium">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-onyx-purple">ONYX.robot</th>
                  <th className="text-center py-4 px-6 text-onyx-muted font-medium">Bolt.new</th>
                  <th className="text-center py-4 px-6 text-onyx-muted font-medium">Others</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="border-b border-onyx-border/50 hover:bg-white/[0.02]">
                    <td className="py-3 px-6 text-onyx-muted">{row.feature}</td>
                    <td className="py-3 px-6">
                      <div className="flex justify-center">
                        <StatusIcon value={row.onyx} />
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex justify-center">
                        <StatusIcon value={row.boltNew} />
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex justify-center">
                        <StatusIcon value={row.others} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
