// Shared OTP storage - used by both send-otp and verify-otp routes
export const otpStore = new Map<string, { otp: string; expires: number }>();

// Clean up expired OTPs periodically
setInterval(() => {
    const now = Date.now();
    for (const [email, data] of otpStore.entries()) {
        if (data.expires < now) {
            otpStore.delete(email);
        }
    }
}, 60000); // Every minute
