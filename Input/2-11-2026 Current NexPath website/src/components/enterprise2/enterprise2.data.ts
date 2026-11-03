import type { ContentItem, SectionHeadingData } from '@/components/enterprise/enterprise.types';

// Enterprise concept page. Unconfirmed details stay as visible placeholders.
export const e2 = {
  brand: 'NexPath',
  badge: 'Enterprise',
  nav: [
    { label: 'Problem', href: '#problem' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Use cases', href: '#use-cases' },
    { label: 'Trust', href: '#trust' },
  ],
  seo: {
    title: 'NexPath Enterprise — Coordinate capacity across time zones',
    description: 'A shared network that connects teams and resources on different schedules and coordinates suitable work when capacity is available.',
  },
  hero: {
    eyebrow: 'Concept preview · details pending confirmation',
    title: 'Different time zones. One connected network.',
    description: 'Connect available resources across industries, teams, and schedules. See where capacity is open, and coordinate suitable work when the right resources are ready.',
    primary: 'Explore the platform',
    secondary: 'How it works',
    sides: ['{{PLACEHOLDER: Industry A}}', '{{PLACEHOLDER: Industry B}}'],
  },
  problem: {
    heading: { eyebrow: 'The problem', title: 'Available capacity shouldn’t sit idle.', description: 'Teams run on different clocks. When one group signs off, another may still have people, systems, or tools with room to spare — but nothing connects the two.' } as SectionHeadingData,
    items: [
      { title: 'Schedules don’t overlap', body: 'Working hours, shifts, and time zones mean capacity opens and closes at different times for each side.' },
      { title: 'Availability is invisible', body: 'Without a shared view, nobody outside a team knows when its resources are free.' },
      { title: 'Coordination is manual', body: 'Matching work to free capacity today takes messages, spreadsheets, and guesswork.' },
    ] as ContentItem[],
  },
  steps: {
    heading: { eyebrow: 'How it works', title: 'Three steps from idle to coordinated.', description: 'A simple journey both sides can follow.' } as SectionHeadingData,
    items: [
      { title: 'Connect', body: 'Bring participating teams, systems, or resources into one coordinated network.' },
      { title: 'Identify availability', body: 'See which resources are available and suitable for a given task.' },
      { title: 'Coordinate work', body: 'Match eligible tasks to available resources according to their capabilities and the rules you define.' },
    ] as ContentItem[],
    note: 'Matching mode: {{PLACEHOLDER: automatic, user-approved, or manually coordinated}}',
    demo: [
      {
        columns: [
          { title: 'Bring both sides together', body: 'In this example, one team offers spare capacity while another brings work that needs a suitable resource.' },
          { title: 'Describe the resources', body: 'Participants outline what they can offer, including resource type, working hours, and practical limits.' },
          { title: 'Set the boundaries', body: 'Both sides agree on what may be shared before considering any work. Exact permissions remain to be confirmed.' },
        ],
        cta: 'Explore the network',
      },
      {
        columns: [
          { title: 'Compare working windows', body: 'A team finishing its day may have capacity available as another team starts its morning.' },
          { title: 'Check the fit', body: 'Compare the task’s needs with the resource’s capabilities and the time available, rather than availability alone.' },
          { title: 'Confirm the opportunity', body: 'Identify a suitable window for both participants. Live availability detection is not claimed in this concept preview.' },
        ],
        cta: 'Explore availability',
      },
      {
        columns: [
          { title: 'Agree on suitable work', body: 'Both sides establish the task, expected outcome, and limits before putting available capacity to use.' },
          { title: 'Choose the handoff', body: 'Work follows the agreed coordination process. Whether matching is manual or approval-based is still to be confirmed.' },
          { title: 'Review the outcome', body: 'Participants check the result against their agreement before considering the next opportunity to coordinate.' },
        ],
        cta: 'Explore coordination',
      },
    ],
  },
  value: {
    eyebrow: 'Core value',
    title: 'Make every available hour count.',
    description: 'Built around one idea: capacity is more useful when both sides can see it and act on it.',
    points: ['Connect resources across different schedules', 'Coordinate work around real availability', 'Reduce idle capacity where practical', 'Build a more flexible, distributed operating model'],
  },
  capabilities: {
    heading: { eyebrow: 'Capabilities', title: 'What the platform is designed to do.', description: 'Each capability is marked with its confirmation status until the feature set is final.' } as SectionHeadingData,
    items: [
      { title: 'Availability awareness', body: 'A shared view of when each participant’s resources are open.', status: '{{PLACEHOLDER: confirm status}}' },
      { title: 'Resource coordination', body: 'Pair suitable work with resources that have room for it.', status: '{{PLACEHOLDER: confirm status}}' },
      { title: 'Task routing', body: 'Send eligible tasks to matching resources under defined rules.', status: '{{PLACEHOLDER: confirm status}}' },
      { title: 'Permissions', body: 'Decide who can offer capacity, who can request it, and what is shared.', status: '{{PLACEHOLDER: confirm status}}' },
      { title: 'Monitoring', body: 'Follow coordinated work from request to completion.', status: '{{PLACEHOLDER: confirm status}}' },
      { title: 'Shared resource type', body: 'The kind of capacity exchanged on the network.', status: '{{PLACEHOLDER: compute, people, coding agents, devices, or other}}' },
    ],
  },
  useCases: {
    heading: { eyebrow: 'Use cases', title: 'Value on both sides of the network.', description: 'Example scenarios to be replaced with the confirmed target industries.' } as SectionHeadingData,
    items: [
      { title: 'Follow-the-sun work', provider: 'A team in one region offers capacity after its core hours.', requester: 'A team in another region gets work moving during its own day.' },
      { title: 'Peak-load relief', provider: 'A group with steady demand puts spare capacity to use.', requester: 'A group facing a busy period finds help without permanent expansion.' },
      { title: 'Cross-industry exchange', provider: '{{PLACEHOLDER: Industry A}} shares resources while its own demand is low.', requester: '{{PLACEHOLDER: Industry B}} accesses suitable resources when it needs them.' },
    ],
  },
  trust: {
    heading: { eyebrow: 'Trust & control', title: 'You decide what is shared.', description: 'Controls are listed by intent; each needs confirmation before launch.' } as SectionHeadingData,
    items: [
      { title: 'Access controls', body: '{{PLACEHOLDER: confirm supported access controls}}' },
      { title: 'Data privacy', body: '{{PLACEHOLDER: confirm what data is shared between participants}}' },
      { title: 'Approval safeguards', body: '{{PLACEHOLDER: confirm whether work requires approval before it runs}}' },
      { title: 'Certifications', body: '{{PLACEHOLDER: no certification claimed until verified}}' },
    ] as ContentItem[],
  },
  cta: {
    title: 'See if the network fits your team.',
    description: 'Join the waitlist for early access and updates as the platform takes shape.',
    primary: 'Join the waitlist',
    secondary: 'Explore NexPath',
  },
};
