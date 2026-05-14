"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Book, Code2, Rocket, Zap, Database, Shield, Palette, Terminal } from "lucide-react";

const docSections = [
  {
    icon: Zap,
    title: "Getting Started",
    description: "Learn the basics of ONYX.robot and create your first project.",
    articles: ["Quick Start Guide", "Your First Project", "Understanding Prompts", "Project Settings"],
  },
  {
    icon: Code2,
    title: "AI Generation",
    description: "Master the AI generation system for optimal results.",
    articles: ["Prompt Best Practices", "Multi-Agent System", "Ultra Design Mode", "Custom Instructions"],
  },
  {
    icon: Palette,
    title: "Design System",
    description: "Customize and extend the generated design system.",
    articles: ["Theme Configuration", "Component Library", "Responsive Design", "Animation System"],
  },
  {
    icon: Database,
    title: "Backend & Database",
    description: "Configure databases, APIs, and server-side logic.",
    articles: ["Database Setup", "API Endpoints", "Authentication", "Real-time Features"],
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "Deploy your projects to production with one click.",
    articles: ["Deploy to Vercel", "Custom Domains", "Environment Variables", "CI/CD Pipeline"],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Security best practices and access control.",
    articles: ["Authentication Setup", "Role-Based Access", "API Key Management", "Data Encryption"],
  },
  {
    icon: Terminal,
    title: "API Reference",
    description: "Complete API documentation for developers.",
    articles: ["REST API", "WebSocket API", "Webhooks", "Rate Limits"],
  },
  {
    icon: Book,
    title: "Guides & Tutorials",
    description: "Step-by-step guides for common use cases.",
    articles: ["Build an E-Commerce", "Build a SaaS", "Build a Dashboard", "Build a Mobile App"],
  },
];

export default function DocsPage() {
  return (
    <>
      <DashboardHeader title="Documentation" />
      <div className="p-6">
        <div className="mb-8">
          <h2 className="font-[var(--font-heading)] text-2xl font-bold mb-2">Documentation</h2>
          <p className="text-sm text-onyx-muted">Everything you need to build with ONYX.robot.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {docSections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass rounded-2xl p-5 hover:border-onyx-purple/20 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-onyx-purple/10 flex items-center justify-center mb-4 group-hover:bg-onyx-purple/20 transition-colors">
                <section.icon className="w-4 h-4 text-onyx-purple" />
              </div>
              <h3 className="font-semibold text-sm mb-1">{section.title}</h3>
              <p className="text-xs text-onyx-muted mb-4">{section.description}</p>
              <ul className="space-y-1.5">
                {section.articles.map((article) => (
                  <li key={article}>
                    <button className="text-xs text-onyx-muted hover:text-onyx-purple transition-colors">
                      {article}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
