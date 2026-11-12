// Kept free of server-only imports so client components can use it too.
export const PROJECT_CATEGORIES = [
    "Residential",
    "Commercial",
    "Hospitality & Events",
    "Institutional & Public",
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]
