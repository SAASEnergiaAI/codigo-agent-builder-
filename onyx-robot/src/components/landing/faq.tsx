"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What can ONYX.robot create?",
    a: "ONYX.robot can create complete websites, landing pages, web apps, mobile apps, dashboards, SaaS platforms, e-commerce stores, APIs, automations, and AI tools — all from natural language prompts.",
  },
  {
    q: "How is ONYX.robot different from Bolt.new?",
    a: "ONYX.robot offers Ultra Design Mode for cinematographic interfaces, multi-agent AI system, mobile app generation, template marketplace, team collaboration, and superior design quality. We generate production-ready, full-stack applications.",
  },
  {
    q: "Do I need coding experience?",
    a: "No. ONYX.robot is designed for everyone — from non-technical founders to experienced developers. Just describe what you want in plain language, and our AI handles the rest.",
  },
  {
    q: "Can I export my code?",
    a: "Yes. You can export your entire project to GitHub, download the source code, or deploy it directly. You own 100% of the code generated.",
  },
  {
    q: "What technologies does it use?",
    a: "ONYX.robot generates code using modern stacks: React, Next.js, React Native, Node.js, Python, PostgreSQL, Supabase, and more. The AI selects the best stack for your project.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. The free plan includes 3 projects, basic AI generation, and community templates. Upgrade to Pro for unlimited projects and advanced features.",
  },
  {
    q: "How fast is the generation?",
    a: "Most projects are generated in under 60 seconds. Complex applications with multiple modules may take a few minutes. Real-time preview is available during generation.",
  },
  {
    q: "Can I customize the generated code?",
    a: "Absolutely. You can edit any part of the generated code through our integrated code editor, chat with the AI to make changes, or modify the code in your favorite IDE after export.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-onyx-purple font-medium tracking-widest uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-medium pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-onyx-muted flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-5 pb-5 text-sm text-onyx-muted leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
