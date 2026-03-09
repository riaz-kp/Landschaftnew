"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle2 } from "lucide-react"

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                setSubmitted(true)
                toast.success("Message sent successfully!")
            } else {
                toast.error(data.error || "Something went wrong. Please try again.")
            }
        } catch (error) {
            console.error("Submission error:", error)
            toast.error("Failed to send message. Please check your connection.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-accent/5 border border-accent/20 p-10 rounded-2xl text-center"
            >
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                    <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-light text-foreground">Message Sent</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                    Thank you for reaching out. We've received your message and will get back to you within 24-48 hours.
                </p>
                <Button
                    variant="outline"
                    className="mt-8 rounded-full px-8 border-accent text-accent hover:bg-accent hover:text-white"
                    onClick={() => {
                        setSubmitted(false)
                        setFormData({ name: "", email: "", phone: "", message: "" })
                    }}
                >
                    Send another message
                </Button>
            </motion.div>
        )
    }

    const inputClasses = "w-full bg-transparent border-b border-border py-2 px-0 text-foreground focus:outline-none focus:border-accent transition-colors duration-300 placeholder:text-muted-foreground/50"

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="space-y-1 group">
                    <label htmlFor="name" className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/80 group-focus-within:text-accent transition-colors">
                        Name
                    </label>
                    <input
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-1 group">
                    <label htmlFor="email" className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/80 group-focus-within:text-accent transition-colors">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="space-y-2 group">
                <label htmlFor="phone" className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/80 group-focus-within:text-accent transition-colors">
                    Phone (Optional)
                </label>
                <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="+91 XXXXX XXXXX"
                />
            </div>

            <div className="space-y-2 group">
                <label htmlFor="message" className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/80 group-focus-within:text-accent transition-colors">
                    Message
                </label>
                <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClasses + " min-h-[60px] resize-none"}
                    placeholder="Tell us about your project..."
                />
            </div>

            <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto rounded-full px-10 py-4 bg-primary hover:bg-primary/90 text-primary-foreground group"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    "Sending..."
                ) : (
                    <span className="flex items-center gap-2">
                        Send Message
                        <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                )}
            </Button>
        </form>
    )
}

