import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/db/client';
import ContactModel from '@/models/Contact';

export async function POST(req: NextRequest) {
    try {
        const { name, email, mobileNumber, company, message } = await req.json();

        // Validate required fields
        if (!name || !email || !mobileNumber || !message) {
            return NextResponse.json({
                error: 'Name, email, mobile number, and message are required'
            }, { status: 400 });
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({
                error: 'Invalid email address'
            }, { status: 400 });
        }

        const normalizedMobileNumber = String(mobileNumber).replace(/[\s-]/g, '');
        if (!/^(?:\+91)?[6-9]\d{9}$/.test(normalizedMobileNumber)) {
            return NextResponse.json({ error: 'Invalid mobile number' }, { status: 400 });
        }

        const smtpHost = process.env.SMTP_HOST;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;

        if (!smtpHost || !smtpUser || !smtpPass) {
            return NextResponse.json({
                error: 'Email service is not configured. Add SMTP_HOST, SMTP_USER, and SMTP_PASS to .env.'
            }, { status: 503 });
        }

        // Connect to MongoDB
        await connectDB();

        // Create new contact submission
        const contact = await ContactModel.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            mobileNumber: normalizedMobileNumber,
            company: company?.trim() || '',
            message: message.trim(),
            verified: true,
            submittedAt: new Date(),
        });

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        // Send notification to admin
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
                        <p><strong>Mobile Number:</strong> ${normalizedMobileNumber}</p>
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
                        <p style="color: #666; font-size: 14px;">Email: contact@astegon.com</p>
                        <p style="color: #666; font-size: 14px;">Website: https://astegon.com</p>
                    </div>
                </div>
            `,
        });

        return NextResponse.json({
            success: true,
            message: 'Contact form submitted successfully',
            contactId: contact._id
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        return NextResponse.json({
            error: 'Failed to submit contact form'
        }, { status: 500 });
    }
}
