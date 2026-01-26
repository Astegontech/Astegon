import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { name, email, company, message, website } = await req.json();

        // Honeypot check
        if (website) {
            return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
        }

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Send notification to yourself
        await transporter.sendMail({
            from: `"Contact Form" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333;">New Contact Form Submission</h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="color: #999; font-size: 12px; margin-top: 20px;">Submitted at: ${new Date().toLocaleString()}</p>
                </div>
            `,
        });

        // Send confirmation to user
        await transporter.sendMail({
            from: `"AsteGon Tech" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Thank you for contacting AsteGon Tech',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px;">
                        <h2 style="color: #333;">Thank You for Reaching Out!</h2>
                        <p style="color: #666; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
                        <p style="color: #666; font-size: 16px; line-height: 1.6;">We've received your message and will get back to you within 24 hours.</p>
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0; color: #666;"><strong>Your message:</strong></p>
                            <p style="white-space: pre-wrap; color: #666;">${message}</p>
                        </div>
                        <p style="color: #666; font-size: 14px;">Best regards,<br>The AsteGon Team</p>
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
