"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Code2, Layers, Zap } from "lucide-react";

function FloatingCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-onyx-purple/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-onyx-purple-dark/10 rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-onyx-muted">
            <span className="w-2 h-2 rounded-full bg-onyx-purple animate-pulse" />
            Powered by Advanced AI Agents
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-[var(--font-heading)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          Build Anything
          <br />
          <span className="gradient-text">With AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg sm:text-xl text-onyx-muted leading-relaxed mb-10"
        >
          ONYX.robot creates beautiful apps, websites and SaaS platforms
          instantly using advanced AI agents. From idea to production in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link
            href="/register"
            className="group flex items-center gap-2 bg-onyx-purple hover:bg-onyx-purple/90 text-white px-8 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
          >
            Start Building
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <button className="group flex items-center gap-2 glass hover:bg-white/5 text-white px-8 py-3.5 rounded-xl text-sm font-medium transition-all duration-200">
            <Play className="w-4 h-4" />
            Watch Demo
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <FloatingCard delay={0.4} className="glass rounded-2xl p-6 text-left hover:border-onyx-purple/20 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-onyx-purple/10 flex items-center justify-center mb-4 group-hover:bg-onyx-purple/20 transition-colors">
              <Code2 className="w-5 h-5 text-onyx-purple" />
            </div>
            <h3 className="font-semibold mb-2">Full-Stack Generation</h3>
            <p className="text-sm text-onyx-muted">
              Frontend, backend, database, auth — everything generated from a single prompt.
            </p>
          </FloatingCard>

          <FloatingCard delay={0.5} className="glass rounded-2xl p-6 text-left hover:border-onyx-purple/20 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-onyx-purple/10 flex items-center justify-center mb-4 group-hover:bg-onyx-purple/20 transition-colors">
              <Layers className="w-5 h-5 text-onyx-purple" />
            </div>
            <h3 className="font-semibold mb-2">Premium Design</h3>
            <p className="text-sm text-onyx-muted">
              Ultra Design Mode creates cinematographic interfaces automatically.
            </p>
          </FloatingCard>

          <FloatingCard delay={0.6} className="glass rounded-2xl p-6 text-left hover:border-onyx-purple/20 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-onyx-purple/10 flex items-center justify-center mb-4 group-hover:bg-onyx-purple/20 transition-colors">
              <Zap className="w-5 h-5 text-onyx-purple" />
            </div>
            <h3 className="font-semibold mb-2">Instant Deploy</h3>
            <p className="text-sm text-onyx-muted">
              One-click deployment. Your project goes live in seconds, not hours.
            </p>
          </FloatingCard>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-t from-onyx-black via-transparent to-transparent z-10 pointer-events-none" />
          <div className="glass rounded-2xl overflow-hidden glow-purple">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-onyx-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-onyx-muted ml-2">ONYX.robot — AI Generation</span>
            </div>
            <div className="p-6 sm:p-8 font-mono text-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 rounded-full bg-onyx-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-onyx-purple">AI</span>
                </div>
                <div>
                  <p className="text-onyx-muted text-xs mb-1">ONYX Agent</p>
                  <p className="text-onyx-purple-light">
                    Building your delivery app with React Native, Node.js, PostgreSQL...
                  </p>
                </div>
              </div>
              <div className="space-y-1 text-onyx-muted/60 text-xs">
                <p>
                  <span className="text-green-400">✓</span> Generated 47 components
                </p>
                <p>
                  <span className="text-green-400">✓</span> Created REST API with 23 endpoints
                </p>
                <p>
                  <span className="text-green-400">✓</span> Database schema with 12 tables
                </p>
                <p>
                  <span className="text-green-400">✓</span> Authentication & authorization
                </p>
                <p>
                  <span className="text-green-400">✓</span> Admin dashboard ready
                </p>
                <p className="text-onyx-purple animate-pulse">
                  ● Deploying to production...
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
