import careersData from "./careers.json"

export interface Career {
    id: string
    title: string
    department: string
    type: string
    location: string
    description: string
    requirements: string[]
    published: boolean
    createdAt: string
}

export const careers: Career[] = careersData as Career[]
