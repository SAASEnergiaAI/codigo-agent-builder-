"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring and learning.",
    features: [
      "3 projects",
      "Basic AI generation",
      "Community templates",
      "Standard preview",
      "1GB storage",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For professionals building real products.",
    features: [
      "Unlimited projects",
      "Advanced AI agents",
      "Ultra Design Mode",
      "GitHub export",
      "Custom domains",
      "Priority support",
      "50GB storage",
      "Team collaboration (3 seats)",
    ],
    cta: "Get Pro",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$99",
    period: "/month",
    description: "For teams and agencies.",
    features: [
      "Everything in Pro",
      "10 team seats",
      "White-label deploys",
      "API access",
      "Custom integrations",
      "Priority queue",
      "200GB storage",
      "Advanced analytics",
    ],
    cta: "Get Business",
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations at scale.",
    features: [
      "Everything in Business",
      "Unlimited seats",
      "On-premise option",
      "Custom AI models",
      "SLA guarantee",
      "Dedicated support",
      "Unlimited storage",
      "SSO & SAML",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-onyx-purple/5 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-onyx-purple font-medium tracking-widest uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="font-[var(--font-heading)] text-4xl sm:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="text-onyx-muted max-w-xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl p-6 flex flex-col ${
                plan.highlighted
                  ? "bg-onyx-purple/10 border border-onyx-purple/30 glow-purple"
                  : "glass"
              }`}
            >
              {plan.highlighted && (
                <div className="flex items-center gap-1 text-xs text-onyx-purple font-medium mb-4">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}
              <h3 className="font-[var(--font-heading)] text-lg font-bold">{plan.name}</h3>
              <div className="mt-2 mb-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-sm text-onyx-muted">{plan.period}</span>}
              </div>
              <p className="text-xs text-onyx-muted mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-onyx-purple flex-shrink-0 mt-0.5" />
                    <span className="text-onyx-muted">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className={`text-sm text-center py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-onyx-purple hover:bg-onyx-purple/90 text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                    : "bg-white/5 hover:bg-white/10 text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
