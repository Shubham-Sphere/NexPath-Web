import { createFileRoute } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { EnterpriseHero } from "@/components/enterprise/EnterpriseHero";
import { TrustStrip } from "@/components/enterprise/TrustStrip";
import { StatBand } from "@/components/enterprise/StatBand";
import { ValuePillars } from "@/components/enterprise/ValuePillars";
import { AgentSurfaces } from "@/components/enterprise/AgentSurfaces";
import { ServicesGrid } from "@/components/enterprise/ServicesGrid";
import { UseCases } from "@/components/enterprise/UseCases";
import { SecurityTrust } from "@/components/enterprise/SecurityTrust";
import { EnterpriseFeatures } from "@/components/enterprise/EnterpriseFeatures";
import { RolloutSteps } from "@/components/enterprise/RolloutSteps";
import { PromptApi } from "@/components/enterprise/PromptApi";
import { WorkflowMetrics } from "@/components/enterprise/WorkflowMetrics";
import { PricingPlans } from "@/components/enterprise/PricingPlans";
import { CustomerStories } from "@/components/enterprise/CustomerStories";
import { EnterpriseFaq } from "@/components/enterprise/EnterpriseFaq";
import { ContactCta } from "@/components/enterprise/ContactCta";
import { EnterpriseFooter } from "@/components/enterprise/EnterpriseFooter";

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: [
      {
        title: "NexPath for Enterprise — One Prompt Standard for Every AI Coding Agent",
      },
      {
        name: "description",
        content:
          "NexPath reviews every prompt before your AI coding agent acts, then applies your organisation's standards for scope, verification, safety, and rollback. Works with Claude Code, Cursor, Windsurf, Replit, Lovable, and Bolt.new.",
      },
      {
        property: "og:title",
        content: "NexPath for Enterprise — Build fast. Ship with confidence.",
      },
      {
        property: "og:description",
        content:
          "One prompt quality standard across every AI coding agent your team already uses — centrally governed, fully auditable.",
      },
      { property: "og:url", content: "https://parseos.tech/nexpath/enterprise" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Nexpatha" },
    ],
    links: [{ rel: "canonical", href: "https://parseos.tech/nexpath/enterprise" }],
  }),
  component: Enterprise,
});

function Enterprise() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <EnterpriseHeader />
      <main>
        <EnterpriseHero />
        <TrustStrip />
        <StatBand />
        <ValuePillars />
        <AgentSurfaces />
        <ServicesGrid />
        <UseCases />
        <SecurityTrust />
        <EnterpriseFeatures />
        <RolloutSteps />
        <PromptApi />
        <WorkflowMetrics />
        <PricingPlans />
        <CustomerStories />
        <EnterpriseFaq />
        <ContactCta />
      </main>
      <EnterpriseFooter />
    </div>
  );
}

export default Enterprise;
