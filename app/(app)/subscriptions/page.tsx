"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Starter",
    description: "Perfect for small print shops getting started",
    price: "Free",
    period: "",
    features: [
      "Up to 50 orders/month",
      "1 team member",
      "Basic order tracking",
      "Email support",
      "Standard analytics",
    ],
    cta: "Current Plan",
    disabled: true,
    icon: Zap,
    popular: false,
    gradient: "from-slate-500 to-slate-600",
  },
  {
    name: "Professional",
    description: "For growing businesses with more needs",
    price: "Rp 299K",
    period: "/month",
    features: [
      "Unlimited orders",
      "Up to 5 team members",
      "Advanced production tracking",
      "Priority support",
      "Advanced analytics & reports",
      "Affiliate management",
      "API access",
    ],
    cta: "Upgrade to Pro",
    disabled: false,
    icon: Sparkles,
    popular: true,
    gradient: "from-violet-500 to-blue-600",
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large operations",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Custom integrations",
      "Dedicated account manager",
      "SLA guarantee",
      "White-label options",
      "Multi-branch support",
    ],
    cta: "Contact Sales",
    disabled: false,
    icon: Crown,
    popular: false,
    gradient: "from-amber-500 to-orange-600",
  }
]

export default function SubscriptionsPage() {
  const [billingPeriod, setBillingPeriod] = React.useState<"monthly" | "yearly">("monthly")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3 h-3" />
          Pricing Plans
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Choose the right plan for your business
        </h1>
        <p className="text-muted-foreground">
          Scale your print business with the tools you need. Upgrade or downgrade at any time.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center animate-fade-in stagger-1">
        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-muted">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              billingPeriod === "monthly" 
                ? "bg-white dark:bg-card shadow-sm text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
              billingPeriod === "yearly" 
                ? "bg-white dark:bg-card shadow-sm text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Yearly
            <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-full font-bold">-20%</span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <Card 
            key={plan.name} 
            className={cn(
              "border shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden animate-fade-in",
              plan.popular 
                ? "border-violet-500/30 shadow-violet-500/10 scale-[1.02]" 
                : "border-border/50",
              `stagger-${i + 1}`
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-blue-500" />
            )}
            {plan.popular && (
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-violet-500 to-blue-500 rounded-b-lg shadow-lg">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader className="pb-4 pt-8">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                <plan.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{plan.description}</p>
              <div className="flex items-baseline gap-1 mt-3">
                <span className="text-3xl font-bold tracking-tight">
                  {billingPeriod === "yearly" && plan.price !== "Free" && plan.price !== "Custom"
                    ? "Rp 239K"
                    : plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                      plan.popular 
                        ? "bg-violet-100 dark:bg-violet-500/20" 
                        : "bg-muted"
                    )}>
                      <Check className={cn(
                        "w-3 h-3",
                        plan.popular ? "text-violet-600 dark:text-violet-400" : "text-muted-foreground"
                      )} />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={cn(
                  "w-full h-11 font-semibold",
                  plan.popular 
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 border-0 shadow-md shadow-violet-500/20" 
                    : plan.disabled 
                      ? "" 
                      : "bg-foreground text-background hover:bg-foreground/90"
                )} 
                variant={plan.disabled ? "outline" : "default"}
                disabled={plan.disabled}
              >
                {plan.cta}
                {!plan.disabled && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ Section Mini */}
      <div className="max-w-2xl mx-auto mt-16">
        <h3 className="text-lg font-bold text-center mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            { q: "Can I switch plans at any time?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be applied immediately." },
            { q: "What payment methods are accepted?", a: "We accept all major credit cards, bank transfers, and popular e-wallets via Stripe." },
            { q: "Is there a free trial for Pro?", a: "Yes, all new accounts get a 14-day free trial of the Professional plan." },
          ].map((faq) => (
            <Card key={faq.q} className="border-border/50 shadow-none hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <h4 className="text-sm font-semibold mb-1">{faq.q}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
