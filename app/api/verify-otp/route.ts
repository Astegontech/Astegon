import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import OTPModel from '../lib/models/OTP';

export async function POST(req: NextRequest) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }

        // Connect to MongoDB
        await connectDB();

        // Find OTP record
        const stored = await OTPModel.findOne({ email: email.toLowerCase() });

        if (!stored) {
            return NextResponse.json({ error: 'OTP not found or expired' }, { status: 400 });
        }

        // Check if OTP has expired
        if (stored.expires < new Date()) {
            await OTPModel.deleteOne({ email: email.toLowerCase() });
            return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
        }

        // Verify OTP
        if (stored.otp !== otp) {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }

        // OTP verified successfully, remove it
        await OTPModel.deleteOne({ email: email.toLowerCase() });

        return NextResponse.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        console.error('OTP verification error:', error);
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
    }
}
