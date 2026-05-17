"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-onyx-purple/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-onyx-purple/10 rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-onyx-muted mb-8">
            <Sparkles className="w-3 h-3 text-onyx-purple" />
            Start building for free
          </div>

          <h2 className="font-[var(--font-heading)] text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Ready to Build
            <br />
            <span className="gradient-text">Something Amazing?</span>
          </h2>

          <p className="text-lg text-onyx-muted mb-10 max-w-xl mx-auto">
            Join thousands of creators using ONYX.robot to turn ideas into
            production-ready applications in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group flex items-center gap-2 bg-onyx-purple hover:bg-onyx-purple/90 text-white px-8 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            >
              Start Building — It&apos;s Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <p className="text-xs text-onyx-muted mt-6">
            No credit card required. Free plan includes 3 projects.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
