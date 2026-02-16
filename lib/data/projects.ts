export interface Project {
    slug: string
    title: string
    location: string
    category: "Residential" | "Commercial"
    area: string
    year: string
    description: string
    image: string
    gallery: string[]
}

export const projects: Project[] = [
    {
        slug: "hillside-residence",
        title: "Hillside Residence",
        location: "Calicut, Kerala",
        category: "Residential",
        area: "1.5 Acres",
        year: "2023",
        description: "A private residence nestled into a steep slope, utilizing native vegetation to stabilize the soil and create a seamless transition between the built form and the wild landscape. The design focuses on privacy and framing views of the distant hills.",
        image: "/images/project1.jpg",
        gallery: ["/images/project1-1.jpg", "/images/project1-2.jpg"]
    },
    {
        slug: "urban-oasis",
        title: "Urban Oasis",
        location: "Kochi, Kerala",
        category: "Commercial",
        area: "5000 Sq. Ft",
        year: "2024",
        description: "A rooftop sanctuary in the heart of the city. This project transforms a concrete expanse into a lush , cooling retreat for office workers, featuring a series of rain gardens and shaded seating areas.",
        image: "/images/project2.jpg",
        gallery: ["/images/project2-1.jpg", "/images/project2-2.jpg"]
    },

    {
        slug: "courtyard-house",
        title: "The Courtyard House",
        location: "Malappuram, Kerala",
        category: "Residential",
        area: "25 Cents",
        year: "2023",
        description: "Centering the home around a living core. A modern take on the traditional Nalukettu, this garden brings light, air, and rain into the heart of the living space.",
        image: "/images/project4.jpg",
        gallery: ["/images/project4-1.jpg"]
    },
    {
        slug: "corporate-park",
        title: "Tech Park Plaza",
        location: "Trivandrum, Kerala",
        category: "Commercial",
        area: "2 Acres",
        year: "2021",
        description: "A formal yet ecological approach to corporate landscaping. Structured hardscapes meet wilder planting zones to create a dynamic environment for collaboration and rest.",
        image: "/images/project5.jpg",
        gallery: ["/images/project5-1.jpg"]
    }
]
