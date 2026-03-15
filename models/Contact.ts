import mongoose, { Schema, Model } from 'mongoose';

export interface IContact {
    name: string;
    email: string;
    company?: string;
    message: string;
    verified: boolean;
    submittedAt: Date;
}

const ContactSchema = new Schema<IContact>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    company: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for faster email lookups and sorting by date
ContactSchema.index({ email: 1 });
ContactSchema.index({ submittedAt: -1 });

// Model
const ContactModel: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default ContactModel;
