import mongoose, { Schema, Document } from 'mongoose';

export interface IContestRegistration extends Document {
    fullName: string;
    email: string;
    phone: string;
    portfolio?: string;
    category: string;
    reason: string;
    submittedAt: Date;
}

const ContestRegistrationSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    portfolio: { type: String },
    category: { type: String, required: true },
    reason: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

export default mongoose.models.ContestRegistration || mongoose.model<IContestRegistration>('ContestRegistration', ContestRegistrationSchema);
