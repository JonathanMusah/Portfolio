// Email utility for contact form
// Supports multiple email providers

interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendEmail(data: EmailData): Promise<{ success: boolean; error?: string }> {
  // Option 1: Using Resend (recommended for production)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = await import('resend')
      const resendClient = new resend.Resend(process.env.RESEND_API_KEY)

      await resendClient.emails.send({
        from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.TO_EMAIL || 'your-email@example.com',
        replyTo: data.email,
        subject: `Portfolio Contact: ${data.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
      })

      return { success: true }
    } catch (error) {
      console.error('Resend error:', error)
      return { success: false, error: 'Failed to send email' }
    }
  }

  // Option 2: Using Nodemailer (for SMTP)
  if (process.env.SMTP_HOST) {
    try {
      const nodemailer = await import('nodemailer')

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: process.env.FROM_EMAIL || process.env.SMTP_USER,
        to: process.env.TO_EMAIL || process.env.SMTP_USER,
        replyTo: data.email,
        subject: `Portfolio Contact: ${data.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
      })

      return { success: true }
    } catch (error) {
      console.error('Nodemailer error:', error)
      return { success: false, error: 'Failed to send email' }
    }
  }

  // Fallback: Log to console (for development)
  console.log('Contact Form Submission:', data)
  return { success: true }
}

