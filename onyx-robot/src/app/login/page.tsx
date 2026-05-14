"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-onyx-purple/8 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-onyx-purple flex items-center justify-center glow-purple">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-[var(--font-heading)] text-xl font-bold">
              ONYX<span className="text-onyx-purple">.robot</span>
            </span>
          </Link>
          <h1 className="font-[var(--font-heading)] text-3xl font-bold mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-onyx-muted">Sign in to continue building</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="text-xs text-onyx-muted block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-onyx-dark border border-onyx-border rounded-xl px-4 py-3 text-sm placeholder:text-onyx-muted/50 focus:outline-none focus:border-onyx-purple/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-onyx-muted block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-onyx-dark border border-onyx-border rounded-xl px-4 py-3 text-sm placeholder:text-onyx-muted/50 focus:outline-none focus:border-onyx-purple/50 transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-onyx-muted hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-onyx-muted cursor-pointer">
                <input type="checkbox" className="rounded border-onyx-border accent-onyx-purple" />
                Remember me
              </label>
              <Link href="#" className="text-xs text-onyx-purple hover:text-onyx-purple-light">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-onyx-purple hover:bg-onyx-purple/90 text-white py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2"
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-onyx-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-onyx-dark px-3 text-onyx-muted">or continue with</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-onyx-border rounded-xl py-2.5 text-sm transition-colors">
                Google
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-onyx-border rounded-xl py-2.5 text-sm transition-colors">
                GitHub
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-onyx-muted mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-onyx-purple hover:text-onyx-purple-light">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
