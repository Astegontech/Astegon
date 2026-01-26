import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { otpStore } from '../lib/otpStore';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

        // Store OTP
        otpStore.set(email, { otp, expires });

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

        // Send OTP email
        await transporter.sendMail({
            from: `"AsteGon Tech" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Your OTP Code - AsteGon Contact Form',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 10px;">
                        <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email</h2>
                        <p style="color: #666; font-size: 16px; line-height: 1.6;">Thank you for contacting AsteGon Tech! To complete your submission, please use the following OTP:</p>
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
                            <h1 style="color: #4F46E5; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
                        </div>
                        <p style="color: #666; font-size: 14px;">This OTP will expire in 5 minutes.</p>
                        <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't request this OTP, please ignore this email.</p>
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        console.error('OTP send error:', error);
        return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
    }
}
