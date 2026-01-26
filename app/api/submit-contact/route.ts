import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import ContactModel from '../lib/models/Contact';

export async function POST(req: NextRequest) {
    try {
        const { name, email, company, message } = await req.json();

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json({
                error: 'Name, email, and message are required'
            }, { status: 400 });
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({
                error: 'Invalid email address'
            }, { status: 400 });
        }

        // Connect to MongoDB
        await connectDB();

        // Create new contact submission
        const contact = await ContactModel.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            company: company?.trim() || '',
            message: message.trim(),
            verified: true,
            submittedAt: new Date(),
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
