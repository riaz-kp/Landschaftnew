import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(req: NextRequest) {
    try {
        const { name, email, phone, message } = await req.json()

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
        }

        const resendApiKey = process.env.RESEND_API_KEY
        if (resendApiKey) {
            const resend = new Resend(resendApiKey)

            await resend.emails.send({
                from: 'Landschaft Contact <onboarding@resend.dev>',
                to: 'teamlandschaft@gmail.com',
                subject: `New Contact Inquiry from ${name}`,
                html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f1f5f9; border-radius: 12px;">
            <h1 style="color: #0f172a; font-size: 24px; border-bottom: 2px solid #10b981; padding-bottom: 10px;">New Inquiry Received</h1>
            <p style="color: #64748b; font-size: 16px;">Someone has reached out via the contact form on your website.</p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Message:</strong></p>
              <p style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #e2e8f0;" />
            <p style="font-size: 12px; color: #94a3b8; text-align: center;">This message was submitted via the Landschaft website contact form.</p>
          </div>
        `
            })
        } else {
            console.log("-----------------------------------------")
            console.log("RESEND_API_KEY is missing. Email skipped.")
            console.log("Contact details:", { name, email, phone, message })
            console.log("-----------------------------------------")
        }

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error("Contact form error:", error)
        return NextResponse.json({ error: error.message || "Failed to send message" }, { status: 500 })
    }
}
