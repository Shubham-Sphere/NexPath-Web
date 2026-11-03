export type ServiceTag = { label: string };
export type FaqEntry = { question: string; answer: string };

export interface ServiceCard {
  eyebrow: string;
  title: string;
  body: string;
  tags: ServiceTag[];
  linkLabel: string;
  linkHref: string;
}

export interface AgentSurface {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
}

export interface UseCase {
  title: string;
  body: string;
}

export interface FeatureItem {
  title: string;
  body: string;
}

export interface RolloutStep {
  number: string;
  label: string;
  description: string;
}

export interface MetricCard {
  modality: string;
  headline: string;
  body: string;
  linkLabel: string;
  linkHref: string;
}

export interface PricingPlan {
  name: string;
  seats: string;
  price: string;
  unit: string;
  badge?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface StatCell {
  value: string;
  label: string;
  note: string;
  primary?: boolean;
}

export interface StoryCard {
  quote: string;
  person: string;
  roleLine: string;
  caseStudyUrl: string;
}

export interface ColumnLinks {
  heading: string;
  links: Array<{ label: string; href: string }>;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface EnterpriseData {
  navItems: NavItem[];
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    trustChips: string[];
  };
  statBand: StatCell[];
  valuePillars: {
    eyebrow: string;
    title: string;
    description: string;
    seeMoreLabel: string;
    seeMoreHref: string;
  } & { pillars: Array<{ title: string; body: string }> };
  agentSurfaces: AgentSurface[];
  services: ServiceCard[];
  useCases: UseCase[];
  security: {
    eyebrow: string;
    headline: string;
    paragraph: string;
    badges: Array<{ label: string; placeholder?: string }>;
    note: string;
  } & { subFeatures: Array<{ title: string; body: string }> };
  enterpriseFeatures: {
    eyebrow: string;
    headline: string;
    paragraph: string;
    ctaLabel: string;
    ctaHref: string;
  } & { features: FeatureItem[] };
  rollout: {
    eyebrow: string;
    title: string;
    description: string;
    steps: RolloutStep[];
    quotes: Array<{ quote: string; attribution: string; subLine: string }>;
  } & { nextStepTitle: string; nextStepBody: string; nextStepLink: string; nextStepHref: string };
  promptApi: {
    eyebrow: string;
    headline: string;
    paragraph1: string;
    paragraph2: string;
    strip: Array<{ eyebrow: string; title: string; body: string }>;
  };
  workflowMetrics: {
    eyebrow: string;
    title: string;
    description: string;
    cards: MetricCard[];
    note: string;
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    strip: string;
    plans: PricingPlan[];
  };
  customerStories: {
    eyebrow: string;
    title: string;
    description: string;
    orgCountPlaceholder: string;
    logos: Array<{ label: string }>;
    stories: StoryCard[];
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: FaqEntry[];
  };
  contact: {
    headline: string;
    paragraph: string;
    primaryLabel: string;
    secondaryLabel: string;
    secondaryHref: string;
    terminalLine: string;
    formLabel: string;
    formSub: string;
    submitLabel: string;
    consentNote: string;
    endpointPlaceholder: string;
    fields: Array<{ name: string; type: string; required?: boolean; options?: string[] }>;
  };
  footer: {
    logline: string;
    columns: ColumnLinks[];
    copyright: string;
    hackfest: string;
  };
}
