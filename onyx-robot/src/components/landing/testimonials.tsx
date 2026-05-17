"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, TechStart",
    text: "ONYX.robot built our entire SaaS MVP in minutes. The quality of the generated code is incredible — production-ready from day one.",
    avatar: "SC",
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO, AppVenture",
    text: "We switched from Bolt.new to ONYX.robot and the difference in design quality is night and day. Ultra Design Mode is a game-changer.",
    avatar: "MR",
  },
  {
    name: "Emily Park",
    role: "Product Designer",
    text: "As a designer, I was skeptical about AI-generated UIs. ONYX.robot changed my mind — the interfaces it creates are genuinely beautiful.",
    avatar: "EP",
  },
  {
    name: "David Kumar",
    role: "Indie Developer",
    text: "I shipped 5 client projects last month using ONYX.robot. The multi-agent system handles everything from design to deployment.",
    avatar: "DK",
  },
  {
    name: "Lisa Thompson",
    role: "Agency Owner",
    text: "ONYX.robot 10x-ed our agency output. We deliver premium websites and apps faster than ever, and clients love the quality.",
    avatar: "LT",
  },
  {
    name: "Alex Nakamura",
    role: "Startup Founder",
    text: "From prompt to deployed app in under 5 minutes. ONYX.robot is the most impressive AI tool I've ever used. Absolutely mind-blowing.",
    avatar: "AN",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-onyx-purple font-medium tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold mb-4">
            Loved by <span className="gradient-text">Builders</span>
          </h2>
          <p className="text-onyx-muted">
            Join thousands of creators shipping with ONYX.robot.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6"
            >
              <p className="text-sm text-onyx-muted leading-relaxed mb-6">
                &quot;{t.text}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-onyx-purple/20 flex items-center justify-center text-xs font-medium text-onyx-purple">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-onyx-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
