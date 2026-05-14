"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { Users, Activity, Server, AlertTriangle, MoreHorizontal } from "lucide-react";

const adminStats = [
  { label: "Total Users", value: "2,847", icon: Users, change: "+12%" },
  { label: "Active Now", value: "342", icon: Activity, change: "+8%" },
  { label: "Server Load", value: "23%", icon: Server, change: "Normal" },
  { label: "Error Rate", value: "0.02%", icon: AlertTriangle, change: "-5%" },
];

const users = [
  { name: "Sarah Chen", email: "sarah@techstart.com", plan: "Pro", projects: 23, status: "Active" },
  { name: "Marcus Rodriguez", email: "marcus@appventure.io", plan: "Business", projects: 47, status: "Active" },
  { name: "Emily Park", email: "emily@design.co", plan: "Pro", projects: 12, status: "Active" },
  { name: "David Kumar", email: "david@indie.dev", plan: "Free", projects: 3, status: "Active" },
  { name: "Lisa Thompson", email: "lisa@agency.com", plan: "Enterprise", projects: 89, status: "Active" },
];

export default function AdminPage() {
  return (
    <>
      <DashboardHeader title="Admin Panel" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-onyx-purple/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-onyx-purple" />
                </div>
                <span className="text-xs text-green-400">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-onyx-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="glass rounded-2xl"
        >
          <div className="flex items-center justify-between p-5 border-b border-onyx-border">
            <h2 className="font-semibold">User Management</h2>
            <button className="text-xs bg-onyx-purple/10 text-onyx-purple px-3 py-1.5 rounded-lg hover:bg-onyx-purple/20 transition-colors">
              Export Users
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-onyx-border">
                  <th className="text-left py-3 px-5 text-xs text-onyx-muted font-medium">User</th>
                  <th className="text-left py-3 px-5 text-xs text-onyx-muted font-medium">Plan</th>
                  <th className="text-left py-3 px-5 text-xs text-onyx-muted font-medium">Projects</th>
                  <th className="text-left py-3 px-5 text-xs text-onyx-muted font-medium">Status</th>
                  <th className="text-right py-3 px-5 text-xs text-onyx-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className="border-b border-onyx-border/50 hover:bg-white/[0.02]">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-onyx-purple/20 flex items-center justify-center text-xs text-onyx-purple font-medium">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-onyx-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                        user.plan === "Enterprise" ? "bg-onyx-purple/10 text-onyx-purple" :
                        user.plan === "Business" ? "bg-blue-500/10 text-blue-400" :
                        user.plan === "Pro" ? "bg-green-500/10 text-green-400" :
                        "bg-white/5 text-onyx-muted"
                      }`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-onyx-muted">{user.projects}</td>
                    <td className="py-3 px-5">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button className="text-onyx-muted hover:text-white p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </>
  );
}
