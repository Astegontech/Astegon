import mongoose, { Schema, Model } from 'mongoose';

export interface IOTP {
    email: string;
    otp: string;
    expires: Date;
    createdAt: Date;
}

const OTPSchema = new Schema<IOTP>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expires: {
        type: Date,
        required: true,
        index: { expires: 0 }, // TTL index - automatically delete when expires
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for faster email lookups
OTPSchema.index({ email: 1 });

// Model
const OTPModel: Model<IOTP> = mongoose.models.OTP || mongoose.model<IOTP>('OTP', OTPSchema);

export default OTPModel;
