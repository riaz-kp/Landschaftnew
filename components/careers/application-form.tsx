"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, FileText, CheckCircle2, User, Mail, Phone, MessageSquare, Send } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    message: z.string().min(10, "Please tell us a bit more about yourself"),
})

interface ApplicationFormProps {
    careerId: string
    careerTitle: string
}

export function ApplicationForm({ careerId, careerTitle }: ApplicationFormProps) {
    const [file, setFile] = useState<File | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error("File size must be less than 5MB")
                return
            }
            setFile(selectedFile)
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!file) {
            toast.error("Please upload your CV/Resume")
            return
        }

        setIsSubmitting(true)
        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("email", values.email)
        formData.append("phone", values.phone)
        formData.append("message", values.message)
        formData.append("careerId", careerId)
        formData.append("careerTitle", careerTitle)
        formData.append("cv", file)

        try {
            const response = await fetch("/api/apply", {
                method: "POST",
                body: formData,
            })

            if (response.ok) {
                setIsSuccess(true)
                toast.success("Application submitted successfully!")
                reset()
                setFile(null)
            } else {
                const data = await response.json()
                throw new Error(data.error || "Submission failed")
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to submit application. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50/50 border border-emerald-100 p-10 rounded-[40px] text-center space-y-6"
            >
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-emerald-200">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tight">Application Sent!</h3>
                    <p className="text-slate-600 font-medium leading-relaxed">
                        We've received your application for the <span className="text-emerald-700 font-bold">{careerTitle}</span> position. Our team will review it and get back to you.
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => setIsSuccess(false)}
                    className="rounded-2xl border-emerald-200 text-emerald-700 hover:bg-emerald-50 h-12 px-8 font-bold"
                >
                    Submit another application
                </Button>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6">
                <div className="space-y-4">
                    <div className="group relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            {...register("name")}
                            placeholder="Full Name"
                            className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/30 focus:ring-primary/10 transition-all font-medium"
                        />
                        {errors.name && <p className="text-rose-500 text-[10px] font-black uppercase tracking-wider mt-2 ml-4">{errors.name.message}</p>}
                    </div>

                    <div className="group relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            {...register("email")}
                            type="email"
                            placeholder="Email Address"
                            className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/30 focus:ring-primary/10 transition-all font-medium"
                        />
                        {errors.email && <p className="text-rose-500 text-[10px] font-black uppercase tracking-wider mt-2 ml-4">{errors.email.message}</p>}
                    </div>

                    <div className="group relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            {...register("phone")}
                            placeholder="Phone Number"
                            className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/30 focus:ring-primary/10 transition-all font-medium"
                        />
                        {errors.phone && <p className="text-rose-500 text-[10px] font-black uppercase tracking-wider mt-2 ml-4">{errors.phone.message}</p>}
                    </div>

                    <div className="group relative">
                        <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Textarea
                            {...register("message")}
                            placeholder="Tell us about yourself..."
                            className="pl-12 pt-4 min-h-[140px] rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-primary/30 focus:ring-primary/10 transition-all font-medium resize-none"
                        />
                        {errors.message && <p className="text-rose-500 text-[10px] font-black uppercase tracking-wider mt-2 ml-4">{errors.message.message}</p>}
                    </div>
                </div>

                <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Upload CV / Resume</Label>
                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative group/upload"
                            >
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={onFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="border-2 border-dashed border-slate-200 rounded-[24px] p-10 flex flex-col items-center justify-center gap-4 group-hover/upload:border-primary/30 group-hover/upload:bg-primary/[0.02] transition-all bg-slate-50/30">
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover/upload:scale-110 transition-transform duration-300">
                                        <Upload className="w-6 h-6 text-slate-400 group-hover/upload:text-primary transition-colors" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-slate-900">Choose file or drag here</p>
                                        <p className="text-[10px] uppercase font-bold text-slate-400 mt-1 tracking-wider">PDF, DOC (MAX 5MB)</p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-between p-5 bg-primary/[0.03] border border-primary/10 rounded-[24px]"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="max-w-[150px] sm:max-w-[200px]">
                                        <p className="text-sm font-bold text-slate-900 truncate">{file.name}</p>
                                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setFile(null)}
                                    className="h-10 w-10 rounded-full hover:bg-rose-50 hover:text-rose-500 text-slate-400 shrink-0"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <Button
                type="submit"
                size="lg"
                className="w-full h-16 rounded-[24px] bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/20 text-lg font-black tracking-tight transition-all hover:-translate-y-1 active:scale-95 group/btn"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <span className="flex items-center gap-3">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <Send className="w-5 h-5" />
                        </motion.div>
                        Processing...
                    </span>
                ) : (
                    <span className="flex items-center gap-3">
                        Submit Application
                        <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </span>
                )}
            </Button>
        </form>
    )
}
