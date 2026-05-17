"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const examples = [
  {
    title: "Delivery App",
    prompt: "Create a modern delivery app with real-time tracking",
    tags: ["React Native", "Node.js", "Maps API"],
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    title: "SaaS Dashboard",
    prompt: "Build an analytics dashboard with charts and KPIs",
    tags: ["Next.js", "Chart.js", "PostgreSQL"],
    gradient: "from-indigo-600 to-blue-600",
  },
  {
    title: "E-Commerce Store",
    prompt: "Create a fashion e-commerce with Stripe checkout",
    tags: ["Next.js", "Stripe", "Supabase"],
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    title: "AI Chat Platform",
    prompt: "Build a ChatGPT-like interface with multiple AI models",
    tags: ["React", "OpenAI", "WebSocket"],
    gradient: "from-cyan-600 to-teal-600",
  },
  {
    title: "Project Manager",
    prompt: "Create a Notion-like workspace with drag and drop",
    tags: ["Next.js", "DnD", "Real-time"],
    gradient: "from-teal-600 to-green-600",
  },
  {
    title: "Social Platform",
    prompt: "Build an Instagram-like social network with stories",
    tags: ["React Native", "Firebase", "Media"],
    gradient: "from-green-600 to-emerald-600",
  },
];

export function Examples() {
  return (
    <section id="examples" className="relative py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-onyx-purple font-medium tracking-widest uppercase mb-4 block">
            Examples
          </span>
          <h2 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold mb-4">
            Built With <span className="gradient-text">ONYX.robot</span>
          </h2>
          <p className="text-onyx-muted max-w-xl mx-auto">
            Real projects created entirely by AI. One prompt, full application.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {examples.map((example, i) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer hover:border-onyx-purple/20 transition-all duration-300"
            >
              <div className={`h-40 bg-gradient-to-br ${example.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
              <div className="p-6 -mt-6 relative">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{example.title}</h3>
                  <ExternalLink className="w-4 h-4 text-onyx-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-onyx-muted mb-4">
                  &quot;{example.prompt}&quot;
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {example.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-onyx-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
