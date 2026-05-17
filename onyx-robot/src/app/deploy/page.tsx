"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Rocket, Globe, GitBranch, Clock, CheckCircle2, ExternalLink } from "lucide-react";

const deployments = [
  {
    project: "E-Commerce Platform",
    url: "ecommerce.onyx.app",
    branch: "main",
    status: "Live",
    time: "2 min ago",
    commit: "feat: add payment flow",
  },
  {
    project: "Fitness Tracker",
    url: "fitness.onyx.app",
    branch: "develop",
    status: "Building",
    time: "5 min ago",
    commit: "fix: workout timer",
  },
  {
    project: "Restaurant Dashboard",
    url: "restaurant.onyx.app",
    branch: "main",
    status: "Live",
    time: "1 hour ago",
    commit: "style: update theme",
  },
  {
    project: "Portfolio Website",
    url: "portfolio.onyx.app",
    branch: "main",
    status: "Live",
    time: "3 hours ago",
    commit: "feat: add contact form",
  },
];

export default function DeployPage() {
  return (
    <>
      <DashboardHeader title="Deployments" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-[var(--font-heading)] text-2xl font-bold mb-1">Deployments</h2>
            <p className="text-sm text-onyx-muted">Manage and monitor your deployed projects.</p>
          </div>
          <button className="flex items-center gap-2 bg-onyx-purple hover:bg-onyx-purple/90 text-white px-4 py-2.5 rounded-xl text-sm transition-all duration-200 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <Rocket className="w-4 h-4" />
            New Deployment
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Active Deployments", value: "7", icon: Globe },
            { label: "Total Deploys", value: "142", icon: Rocket },
            { label: "Avg. Build Time", value: "1.2s", icon: Clock },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <div className="w-9 h-9 rounded-xl bg-onyx-purple/10 flex items-center justify-center mb-3">
                <stat.icon className="w-4 h-4 text-onyx-purple" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-onyx-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="glass rounded-2xl"
        >
          <div className="p-5 border-b border-onyx-border">
            <h3 className="font-semibold">Recent Deployments</h3>
          </div>
          <div className="divide-y divide-onyx-border/50">
            {deployments.map((deploy) => (
              <div key={deploy.project + deploy.time} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    deploy.status === "Live" ? "bg-green-400" : "bg-yellow-400 animate-pulse"
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{deploy.project}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-onyx-muted flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {deploy.url}
                      </span>
                      <span className="text-xs text-onyx-muted flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        {deploy.branch}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-onyx-muted">{deploy.commit}</p>
                    <p className="text-[10px] text-onyx-muted/60">{deploy.time}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    deploy.status === "Live"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {deploy.status === "Live" && <CheckCircle2 className="w-3 h-3" />}
                    {deploy.status}
                  </span>
                  <button className="text-onyx-muted hover:text-white p-1">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
