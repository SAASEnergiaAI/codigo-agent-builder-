"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { User, Bell, Palette, Key, Globe, Shield } from "lucide-react";

const tabs = [
  { icon: User, label: "Profile" },
  { icon: Bell, label: "Notifications" },
  { icon: Palette, label: "Appearance" },
  { icon: Key, label: "API Keys" },
  { icon: Globe, label: "Domains" },
  { icon: Shield, label: "Security" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <>
      <DashboardHeader title="Settings" />
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-56 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    activeTab === tab.label
                      ? "bg-onyx-purple/10 text-onyx-purple"
                      : "text-onyx-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <div className="glass rounded-2xl p-6">
              <h2 className="font-semibold text-lg mb-6">{activeTab}</h2>

              {activeTab === "Profile" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-onyx-purple/20 flex items-center justify-center text-xl font-bold text-onyx-purple">
                      U
                    </div>
                    <div>
                      <button className="text-xs bg-onyx-purple/10 text-onyx-purple px-3 py-1.5 rounded-lg hover:bg-onyx-purple/20 transition-colors">
                        Change Avatar
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-onyx-muted block mb-1.5">Full Name</label>
                      <input
                        type="text"
                        defaultValue="John Doe"
                        className="w-full bg-onyx-dark border border-onyx-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-onyx-purple/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-onyx-muted block mb-1.5">Email</label>
                      <input
                        type="email"
                        defaultValue="john@example.com"
                        className="w-full bg-onyx-dark border border-onyx-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-onyx-purple/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-onyx-muted block mb-1.5">Company</label>
                      <input
                        type="text"
                        placeholder="Optional"
                        className="w-full bg-onyx-dark border border-onyx-border rounded-xl px-4 py-3 text-sm placeholder:text-onyx-muted/50 focus:outline-none focus:border-onyx-purple/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-onyx-muted block mb-1.5">Website</label>
                      <input
                        type="url"
                        placeholder="https://"
                        className="w-full bg-onyx-dark border border-onyx-border rounded-xl px-4 py-3 text-sm placeholder:text-onyx-muted/50 focus:outline-none focus:border-onyx-purple/50 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-onyx-purple hover:bg-onyx-purple/90 text-white px-6 py-2.5 rounded-xl text-sm transition-all duration-200 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "API Keys" && (
                <div className="space-y-4">
                  <p className="text-sm text-onyx-muted">Manage your API keys for external integrations.</p>
                  <div className="space-y-3">
                    {[
                      { name: "OpenAI API Key", key: "sk-...4f2a", status: "Active" },
                      { name: "Claude API Key", key: "sk-ant-...8b3c", status: "Active" },
                      { name: "Supabase Key", key: "eyJ...xNQ", status: "Active" },
                    ].map((apiKey) => (
                      <div key={apiKey.name} className="flex items-center justify-between p-4 bg-onyx-dark rounded-xl border border-onyx-border">
                        <div>
                          <p className="text-sm font-medium">{apiKey.name}</p>
                          <p className="text-xs text-onyx-muted font-mono">{apiKey.key}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                            {apiKey.status}
                          </span>
                          <button className="text-xs text-onyx-muted hover:text-red-400 transition-colors">
                            Revoke
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="bg-onyx-purple/10 text-onyx-purple px-4 py-2.5 rounded-xl text-sm hover:bg-onyx-purple/20 transition-colors">
                    + Add New Key
                  </button>
                </div>
              )}

              {activeTab !== "Profile" && activeTab !== "API Keys" && (
                <p className="text-sm text-onyx-muted">
                  {activeTab} settings will be available soon.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
