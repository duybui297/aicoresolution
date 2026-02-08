export interface ServiceTier {
    basic: string;
    standard: string;
    premium: string;
}

export interface Service {
    id: string;
    name: string; // Translation key
    description: string; // Translation key
    features: string[]; // Translation keys
    tiers: ServiceTier;
}

export const SERVICES: Service[] = [
    {
        id: "ai-integration",
        name: "services.items.ai-integration.name",
        description: "services.items.ai-integration.description",
        features: [
            "services.items.ai-integration.features.0",
            "services.items.ai-integration.features.1",
            "services.items.ai-integration.features.2",
            "services.items.ai-integration.features.3"
        ],
        tiers: {
            basic: "50 Tr",
            standard: "200 Tr",
            premium: "500 Tr"
        }
    },
    {
        id: "digital-system",
        name: "services.items.digital-system.name",
        description: "services.items.digital-system.description",
        features: [
            "services.items.digital-system.features.0",
            "services.items.digital-system.features.1",
            "services.items.digital-system.features.2",
            "services.items.digital-system.features.3"
        ],
        tiers: {
            basic: "80 Tr",
            standard: "250 Tr",
            premium: "600 Tr"
        }
    },
    {
        id: "crm-migration",
        name: "services.items.crm-migration.name",
        description: "services.items.crm-migration.description",
        features: [
            "services.items.crm-migration.features.0",
            "services.items.crm-migration.features.1",
            "services.items.crm-migration.features.2",
            "services.items.crm-migration.features.3"
        ],
        tiers: {
            basic: "30 Tr",
            standard: "100 Tr",
            premium: "300 Tr"
        }
    },
    {
        id: "digital-consulting",
        name: "services.items.digital-consulting.name",
        description: "services.items.digital-consulting.description",
        features: [
            "services.items.digital-consulting.features.0",
            "services.items.digital-consulting.features.1",
            "services.items.digital-consulting.features.2",
            "services.items.digital-consulting.features.3"
        ],
        tiers: {
            basic: "20 Tr",
            standard: "80 Tr",
            premium: "200 Tr"
        }
    }
];
