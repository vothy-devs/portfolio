export interface Metric {
    value: string;
    label: string;
    description: string;
}

export interface CompetencyTab {
    id: string;
    label: string;
    icon: string;
    highlights: string[];
    tools: string[];
}

export interface CareerRole {
    company: string;
    location: string;
    title: string;
    period: string;
    summary: string;
    achievements: {
        category: 'Predictable Delivery' | 'Security' | 'Automation' | 'Governance';
        title: string;
        description: string;
    }[];
}