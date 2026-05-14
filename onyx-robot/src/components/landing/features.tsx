"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  LayoutDashboard,
  ShoppingCart,
  Bot,
  Database,
  Shield,
  Rocket,
  Paintbrush,
  GitBranch,
  FileCode,
  Wand2,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Websites & Landing Pages",
    description: "Create stunning, responsive websites and high-converting landing pages with premium design.",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Generate cross-platform mobile apps with React Native, ready for App Store and Google Play.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboards",
    description: "Build beautiful admin panels with charts, tables, CRUD operations and real-time data.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Platforms",
    description: "Full e-commerce with product catalog, cart, checkout, payments and order management.",
  },
  {
    icon: Bot,
    title: "Multi-Agent AI System",
    description: "Multiple AI agents work together: designer, developer, tester, deployer — all automated.",
  },
  {
    icon: Database,
    title: "Auto Database & API",
    description: "Automatically generates database schemas, migrations, REST/GraphQL APIs and documentation.",
  },
  {
    icon: Shield,
    title: "Built-in Authentication",
    description: "Complete auth system with login, register, OAuth, 2FA, role-based access control.",
  },
  {
    icon: Rocket,
    title: "One-Click Deploy",
    description: "Deploy to production with a single click. CI/CD, SSL, CDN — all configured automatically.",
  },
  {
    icon: Paintbrush,
    title: "Ultra Design Mode",
    description: "AI creates cinematographic interfaces with premium animations and micro-interactions.",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Built-in Git integration with branching, undo/redo, project history and GitHub export.",
  },
  {
    icon: FileCode,
    title: "Clean Code Generation",
    description: "Production-ready code following best practices. Modular, typed, documented and tested.",
  },
  {
    icon: Wand2,
    title: "AI Content & SEO",
    description: "Auto-generate SEO metadata, copy, images and logos. Your project ranks from day one.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-onyx-purple/3 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-onyx-purple font-medium tracking-widest uppercase mb-4 block">
            Features
          </span>
          <h2 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Build & Ship</span>
          </h2>
          <p className="text-onyx-muted max-w-2xl mx-auto">
            From idea to production in minutes. ONYX.robot handles every aspect of
            software development with AI precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:border-onyx-purple/20 transition-all duration-300 group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-onyx-purple/10 flex items-center justify-center mb-4 group-hover:bg-onyx-purple/20 transition-colors">
                <feature.icon className="w-5 h-5 text-onyx-purple" />
              </div>
              <h3 className="font-semibold text-sm mb-2">{feature.title}</h3>
              <p className="text-xs text-onyx-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
