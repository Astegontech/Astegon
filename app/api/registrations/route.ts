import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/mongodb';
import ContestRegistrationModel from '@/lib/models/ContestRegistration';

export async function POST(req: NextRequest) {
    try {
        const { fullName, email, phone, portfolio, category, problemStatement, reason } = await req.json();

        // Validate required fields
        if (!fullName || !email || !phone || !category || !problemStatement || !reason) {
            return NextResponse.json({
                error: 'Please fill out all required fields.'
            }, { status: 400 });
        }

        // Connect to DB
        await connectDB();

        // Check if user already registered for this category
        const existingReg = await ContestRegistrationModel.findOne({ email: email.toLowerCase().trim(), category });
        if (existingReg) {
            return NextResponse.json({
                error: 'You have already registered for this contest using this email.'
            }, { status: 400 });
        }

        // Save to DB
        const registration = await ContestRegistrationModel.create({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            portfolio: portfolio?.trim() || '',
            category,
            problemStatement: problemStatement.trim(),
            reason: reason.trim(),
        });

        // Email dispatch (only if credentials exist, otherwise gracefully fail emails but succeed registration)
        if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                secure: false,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            // 1. Notify Admin
            await transporter.sendMail({
                from: `"Contest Registration" <${process.env.SMTP_USER}>`,
                to: process.env.SMTP_USER,
                subject: `New Contest Registration: ${category}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
                        <h2>New Registration for ${category}</h2>
                        <p><strong>Name:</strong> ${fullName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Selected Problem:</strong> ${problemStatement}</p>
                        ${portfolio ? `<p><strong>Portfolio:</strong> <a href="${portfolio}">${portfolio}</a></p>` : ''}
                        <p><strong>Reason to win:</strong></p>
                        <p style="background: #f4f4f4; padding: 10px; border-left: 4px solid #333;">${reason}</p>
                    </div>
                `,
            }).catch(e => console.error("Admin Email Failed:", e));

            // 2. Notify User 
            await transporter.sendMail({
                from: `"Astegon Tech" <${process.env.SMTP_USER}>`,
                to: email,
                subject: 'Contest Registration Confirmation - Astegon Tech',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
                        <h2>Registration Confirmed!</h2>
                        <p>Hi ${fullName},</p>
                        <p>You have successfully registered for the <strong>${category}</strong> contest.</p>
                        <p>Our team is currently reviewing applications and will reach out soon with the next steps.</p>
                        <br/>
                        <p>Best of luck,</p>
                        <p><strong>The Astegon Engineering Team</strong></p>
                    </div>
                `,
            }).catch(e => console.error("User Email Failed:", e));
        }

        return NextResponse.json({
            success: true,
            message: 'Registered successfully',
            registrationId: registration._id
        });

    } catch (error) {
        console.error('Registration API Error:', error);
        return NextResponse.json({
            error: 'An error occurred while processing your registration.'
        }, { status: 500 });
    }
}
