"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Search, Download, Star, Filter } from "lucide-react";

const categories = ["All", "Landing Pages", "E-Commerce", "Dashboards", "Mobile", "SaaS", "Portfolios"];

const templates = [
  { name: "SaaS Starter Kit", category: "SaaS", downloads: "12.4k", rating: 4.9, gradient: "from-purple-600 to-indigo-600", author: "ONYX Team", premium: true },
  { name: "E-Commerce Pro", category: "E-Commerce", downloads: "8.2k", rating: 4.8, gradient: "from-indigo-600 to-blue-600", author: "ONYX Team", premium: true },
  { name: "Dashboard Ultra", category: "Dashboards", downloads: "15.1k", rating: 4.9, gradient: "from-blue-600 to-cyan-600", author: "ONYX Team", premium: false },
  { name: "Portfolio Minimal", category: "Portfolios", downloads: "6.7k", rating: 4.7, gradient: "from-cyan-600 to-teal-600", author: "Community", premium: false },
  { name: "Landing Page Pro", category: "Landing Pages", downloads: "21.3k", rating: 4.9, gradient: "from-teal-600 to-green-600", author: "ONYX Team", premium: true },
  { name: "Fitness App", category: "Mobile", downloads: "4.5k", rating: 4.6, gradient: "from-green-600 to-emerald-600", author: "Community", premium: false },
  { name: "Restaurant App", category: "Mobile", downloads: "3.8k", rating: 4.5, gradient: "from-emerald-600 to-cyan-600", author: "Community", premium: false },
  { name: "Blog Platform", category: "SaaS", downloads: "9.1k", rating: 4.7, gradient: "from-violet-600 to-purple-600", author: "ONYX Team", premium: false },
];

export default function MarketplacePage() {
  return (
    <>
      <DashboardHeader title="Marketplace" />
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-[var(--font-heading)] text-2xl font-bold mb-1">Template Marketplace</h2>
            <p className="text-sm text-onyx-muted">Start with a pre-built template and customize with AI.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-onyx-dark border border-onyx-border rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-onyx-muted" />
              <input
                type="text"
                placeholder="Search templates..."
                className="bg-transparent text-sm placeholder:text-onyx-muted/50 focus:outline-none w-48"
              />
            </div>
            <button className="p-2 bg-onyx-dark border border-onyx-border rounded-xl text-onyx-muted hover:text-white">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`text-xs px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                cat === "All"
                  ? "bg-onyx-purple text-white"
                  : "bg-white/5 text-onyx-muted hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {templates.map((template, i) => (
            <motion.div
              key={template.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass rounded-2xl overflow-hidden group cursor-pointer hover:border-onyx-purple/20 transition-all duration-300"
            >
              <div className={`h-36 bg-gradient-to-br ${template.gradient} opacity-30 group-hover:opacity-40 transition-opacity relative`}>
                {template.premium && (
                  <span className="absolute top-3 right-3 text-[10px] bg-onyx-purple text-white px-2 py-0.5 rounded-full">
                    PRO
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                <p className="text-xs text-onyx-muted mb-3">by {template.author}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-onyx-muted">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {template.rating}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-onyx-muted">
                      <Download className="w-3 h-3" />
                      {template.downloads}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-onyx-muted">
                    {template.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
