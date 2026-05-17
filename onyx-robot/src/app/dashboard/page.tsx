"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import {
  FolderOpen,
  Clock,
  Zap,
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

const stats = [
  { label: "Total Projects", value: "12", icon: FolderOpen, change: "+3 this month" },
  { label: "AI Generations", value: "847", icon: Zap, change: "+124 this week" },
  { label: "Deploy Time", value: "1.2s", icon: Clock, change: "avg. last 7 days" },
  { label: "Uptime", value: "99.9%", icon: TrendingUp, change: "last 30 days" },
];

const recentProjects = [
  { name: "E-Commerce Platform", tech: "Next.js • Stripe • Supabase", status: "Live", time: "2 hours ago" },
  { name: "Fitness Tracker App", tech: "React Native • Node.js", status: "Building", time: "5 hours ago" },
  { name: "Restaurant Dashboard", tech: "Next.js • Chart.js", status: "Live", time: "1 day ago" },
  { name: "Portfolio Website", tech: "Next.js • Framer Motion", status: "Live", time: "2 days ago" },
  { name: "Chat Application", tech: "React • WebSocket • Redis", status: "Draft", time: "3 days ago" },
];

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-onyx-purple/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-onyx-purple" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-onyx-muted" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-onyx-muted mt-1">{stat.label}</p>
              <p className="text-[10px] text-onyx-purple mt-1">{stat.change}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass rounded-2xl"
        >
          <div className="flex items-center justify-between p-5 border-b border-onyx-border">
            <h2 className="font-semibold">Recent Projects</h2>
            <button className="text-xs text-onyx-purple hover:text-onyx-purple-light">
              View All
            </button>
          </div>
          <div className="divide-y divide-onyx-border/50">
            {recentProjects.map((project) => (
              <div
                key={project.name}
                className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-onyx-purple/10 flex items-center justify-center">
                    <FolderOpen className="w-4 h-4 text-onyx-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{project.name}</p>
                    <p className="text-xs text-onyx-muted">{project.tech}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full ${
                      project.status === "Live"
                        ? "bg-green-500/10 text-green-400"
                        : project.status === "Building"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-white/5 text-onyx-muted"
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="text-xs text-onyx-muted hidden sm:block">{project.time}</span>
                  <button className="text-onyx-muted hover:text-white p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="glass rounded-2xl p-5"
          >
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "New Website", emoji: "🌐" },
                { label: "New Mobile App", emoji: "📱" },
                { label: "New Dashboard", emoji: "📊" },
                { label: "New API", emoji: "⚡" },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex items-center gap-3 p-3 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl text-sm transition-colors text-left"
                >
                  <span className="text-lg">{action.emoji}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="glass rounded-2xl p-5"
          >
            <h3 className="font-semibold mb-4">AI Usage</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-onyx-muted">Generations Used</span>
                  <span>847 / 1,000</span>
                </div>
                <div className="w-full h-2 bg-onyx-dark rounded-full overflow-hidden">
                  <div className="h-full bg-onyx-purple rounded-full" style={{ width: "84.7%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-onyx-muted">Storage Used</span>
                  <span>23.4 GB / 50 GB</span>
                </div>
                <div className="w-full h-2 bg-onyx-dark rounded-full overflow-hidden">
                  <div className="h-full bg-onyx-purple-light rounded-full" style={{ width: "46.8%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-onyx-muted">API Calls</span>
                  <span>12,340 / 50,000</span>
                </div>
                <div className="w-full h-2 bg-onyx-dark rounded-full overflow-hidden">
                  <div className="h-full bg-onyx-purple-dark rounded-full" style={{ width: "24.7%" }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
