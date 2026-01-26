import { NextRequest, NextResponse } from 'next/server';
import { otpStore } from '../lib/otpStore';

export async function POST(req: NextRequest) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }

        const stored = otpStore.get(email);

        if (!stored) {
            return NextResponse.json({ error: 'OTP not found or expired' }, { status: 400 });
        }

        if (stored.expires < Date.now()) {
            otpStore.delete(email);
            return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
        }

        if (stored.otp !== otp) {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }

        // OTP verified successfully, remove it
        otpStore.delete(email);

        return NextResponse.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        console.error('OTP verification error:', error);
        return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
    }
}
