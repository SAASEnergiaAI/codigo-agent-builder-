"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Sparkles,
  Code2,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Download,
  GitBranch,
  Rocket,
  Wand2,
  Settings2,
  ChevronDown,
} from "lucide-react";

const sampleMessages = [
  {
    role: "user" as const,
    content: "Create a modern delivery app with real-time tracking, order management, and payment integration.",
  },
  {
    role: "ai" as const,
    content:
      "I'll create a full-stack delivery application with the following:\n\n• React Native mobile app with maps integration\n• Node.js REST API with 23 endpoints\n• PostgreSQL database with 12 tables\n• Stripe payment integration\n• Real-time WebSocket tracking\n• Admin dashboard\n\nGenerating now...",
  },
];

const previewCode = `import { useState } from 'react';
import { MapView, Marker } from '@/components/Map';
import { OrderCard } from '@/components/OrderCard';
import { useRealTimeTracking } from '@/hooks/tracking';

export default function TrackingPage() {
  const { position, status, eta } = useRealTimeTracking();
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold">Track Order</h1>
        <p className="text-gray-500">ETA: {eta} min</p>
      </header>

      <MapView
        center={position}
        zoom={15}
        className="flex-1"
      >
        <Marker position={position} type="driver" />
        <Marker position={selectedOrder?.location} />
      </MapView>

      <OrderCard
        status={status}
        eta={eta}
        onDetails={() => setSelectedOrder(order)}
      />
    </div>
  );
}`;

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [framework, setFramework] = useState("Next.js");
  const [showFrameworks, setShowFrameworks] = useState(false);

  const frameworks = ["Next.js", "React", "React Native", "Vue.js", "Svelte", "Astro"];

  return (
    <div className="flex h-screen">
      <div className="w-[380px] flex flex-col border-r border-onyx-border">
        <div className="p-4 border-b border-onyx-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-onyx-purple" />
            <span className="text-sm font-semibold">AI Agent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowFrameworks(!showFrameworks)}
                className="flex items-center gap-1.5 text-xs bg-onyx-dark border border-onyx-border rounded-lg px-3 py-1.5 hover:border-onyx-purple/30 transition-colors"
              >
                {framework}
                <ChevronDown className="w-3 h-3 text-onyx-muted" />
              </button>
              {showFrameworks && (
                <div className="absolute right-0 top-full mt-1 bg-onyx-dark border border-onyx-border rounded-xl p-1 z-10 w-36">
                  {frameworks.map((fw) => (
                    <button
                      key={fw}
                      onClick={() => {
                        setFramework(fw);
                        setShowFrameworks(false);
                      }}
                      className="w-full text-left text-xs px-3 py-2 rounded-lg hover:bg-white/5 text-onyx-muted hover:text-white transition-colors"
                    >
                      {fw}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="p-1.5 text-onyx-muted hover:text-white rounded-lg hover:bg-white/5">
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {sampleMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.15 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "ai" && (
                <div className="w-7 h-7 rounded-lg bg-onyx-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-onyx-purple" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-onyx-purple text-white"
                    : "glass"
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-xl p-3 space-y-2"
          >
            <p className="text-xs text-onyx-muted">Generation Progress</p>
            <div className="space-y-1.5">
              {[
                { label: "Project structure", done: true },
                { label: "Components (47/47)", done: true },
                { label: "API endpoints (23/23)", done: true },
                { label: "Database schema", done: true },
                { label: "Authentication", done: true },
                { label: "Deploying...", done: false },
              ].map((step) => (
                <div key={step.label} className="flex items-center gap-2 text-xs">
                  {step.done ? (
                    <span className="text-green-400">✓</span>
                  ) : (
                    <span className="text-onyx-purple animate-pulse">●</span>
                  )}
                  <span className={step.done ? "text-onyx-muted" : "text-onyx-purple"}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="p-4 border-t border-onyx-border">
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-onyx-dark border border-onyx-border rounded-xl px-4 py-3 focus-within:border-onyx-purple/50 transition-colors">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to build..."
                rows={2}
                className="w-full bg-transparent text-sm placeholder:text-onyx-muted/50 focus:outline-none resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <button className="flex items-center gap-1 text-[10px] text-onyx-muted hover:text-onyx-purple transition-colors">
                  <Wand2 className="w-3 h-3" />
                  Ultra Design Mode
                </button>
              </div>
            </div>
            <button className="p-3 bg-onyx-purple hover:bg-onyx-purple/90 rounded-xl transition-all duration-200 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-12 border-b border-onyx-border flex items-center justify-between px-4">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                activeTab === "preview"
                  ? "bg-onyx-purple/10 text-onyx-purple"
                  : "text-onyx-muted hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                activeTab === "code"
                  ? "bg-onyx-purple/10 text-onyx-purple"
                  : "text-onyx-muted hover:text-white"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Code
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-onyx-dark rounded-lg p-0.5">
              <button
                onClick={() => setViewport("desktop")}
                className={`p-1.5 rounded-md ${viewport === "desktop" ? "bg-white/10" : "text-onyx-muted hover:text-white"}`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport("tablet")}
                className={`p-1.5 rounded-md ${viewport === "tablet" ? "bg-white/10" : "text-onyx-muted hover:text-white"}`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewport("mobile")}
                className={`p-1.5 rounded-md ${viewport === "mobile" ? "bg-white/10" : "text-onyx-muted hover:text-white"}`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="h-4 w-px bg-onyx-border" />
            <button className="p-1.5 text-onyx-muted hover:text-white rounded-lg hover:bg-white/5" title="Refresh">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 text-onyx-muted hover:text-white rounded-lg hover:bg-white/5" title="Export">
              <Download className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 text-onyx-muted hover:text-white rounded-lg hover:bg-white/5" title="Git">
              <GitBranch className="w-3.5 h-3.5" />
            </button>
            <button className="flex items-center gap-1.5 bg-onyx-purple hover:bg-onyx-purple/90 text-white px-3 py-1.5 rounded-lg text-xs transition-all">
              <Rocket className="w-3.5 h-3.5" />
              Deploy
            </button>
          </div>
        </div>

        <div className="flex-1 bg-onyx-black p-4 overflow-auto">
          {activeTab === "preview" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mx-auto bg-white rounded-xl overflow-hidden shadow-2xl ${
                viewport === "mobile"
                  ? "max-w-[375px]"
                  : viewport === "tablet"
                  ? "max-w-[768px]"
                  : "max-w-full"
              }`}
            >
              <div className="bg-gray-50 p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-900 font-bold text-lg">DeliveryApp</h2>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-xs text-purple-600">JD</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 h-[300px] flex items-center justify-center relative">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white text-2xl">📍</span>
                  </div>
                  <p className="text-gray-700 font-medium">Real-time Tracking</p>
                  <p className="text-sm text-gray-400">Map preview area</p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-white rounded-xl border p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">Order #4821</p>
                      <p className="text-gray-400 text-xs">Arriving in 12 min</p>
                    </div>
                    <div className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                      On the way
                    </div>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <div className="flex-1 bg-purple-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">Distance</p>
                      <p className="text-sm font-bold text-gray-900">2.4 km</p>
                    </div>
                    <div className="flex-1 bg-purple-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">ETA</p>
                      <p className="text-sm font-bold text-gray-900">12 min</p>
                    </div>
                    <div className="flex-1 bg-purple-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-sm font-bold text-gray-900">$24.90</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-xl overflow-hidden h-full"
            >
              <div className="flex items-center gap-2 px-4 py-2 border-b border-onyx-border">
                <span className="text-xs text-onyx-muted">pages/tracking.tsx</span>
              </div>
              <pre className="p-4 text-sm overflow-auto h-full">
                <code className="text-onyx-muted">
                  {previewCode.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-8 text-right mr-4 text-onyx-muted/30 select-none text-xs leading-6">
                        {i + 1}
                      </span>
                      <span className="leading-6">
                        {line.includes("import") ? (
                          <span className="text-onyx-purple-light">{line}</span>
                        ) : line.includes("export") || line.includes("function") || line.includes("const") ? (
                          <span className="text-blue-400">{line}</span>
                        ) : line.includes("return") ? (
                          <span className="text-yellow-300">{line}</span>
                        ) : (
                          line
                        )}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
