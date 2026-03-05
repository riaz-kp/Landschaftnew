import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import cloudinary from "@/lib/cloudinary"

// Important: Next.js 15+ needs to handle form data correctly
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const phone = formData.get("phone") as string
        const message = formData.get("message") as string
        const careerId = formData.get("careerId") as string
        const careerTitle = formData.get("careerTitle") as string
        const cvFile = formData.get("cv") as File

        if (!cvFile) {
            return NextResponse.json({ error: "CV file is required" }, { status: 400 })
        }

        // 1. Upload CV to Cloudinary
        // Note: Cloudinary expects a buffer or a base64 string
        const bytes = await cvFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const uploadResult: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "career_applications",
                    resource_type: "raw", // For PDF/DOC files
                    public_id: `cv_${Date.now()}_${name.replace(/\s+/g, '_').toLowerCase()}`,
                },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            )
            uploadStream.end(buffer)
        })

        const cvUrl = uploadResult.secure_url

        // 2. Send Email via Resend
        // If no API key is present, we log it and return success for demonstration
        // but warn the user.
        const resendApiKey = process.env.RESEND_API_KEY
        if (resendApiKey) {
            const resend = new Resend(resendApiKey)

            await resend.emails.send({
                from: 'Landschaft Careers <onboarding@resend.dev>', // Default for testing
                to: 'teamlandschaft@gmail.com',
                subject: `New Job Application: ${careerTitle} - ${name}`,
                html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f1f5f9; border-radius: 12px;">
            <h1 style="color: #0f172a; font-size: 24px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">New Application Received</h1>
            <p style="color: #64748b; font-size: 16px;">A new candidate has applied for the <strong>${careerTitle}</strong> position.</p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Message:</strong></p>
              <p style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">${message}</p>
            </div>
            
            <a href="${cvUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Download CV/Resume</a>
            
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #e2e8f0;" />
            <p style="font-size: 12px; color: #94a3b8; text-align: center;">This application was submitted via the Landschaft website.</p>
          </div>
        `
            })
        } else {
            console.log("-----------------------------------------")
            console.log("RESEND_API_KEY is missing. Email skipped.")
            console.log("Application details:", { name, email, phone, careerTitle, cvUrl })
            console.log("-----------------------------------------")
        }

        return NextResponse.json({ success: true, cvUrl })
    } catch (error: any) {
        console.error("Application error:", error)
        return NextResponse.json({ error: error.message || "Failed to process application" }, { status: 500 })
    }
}
