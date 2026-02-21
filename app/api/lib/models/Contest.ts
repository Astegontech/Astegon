import mongoose, { Schema, Document } from 'mongoose';

export interface IContest extends Document {
    id: string; // The original string id 'web-development'
    title: string;
    slug: string;
    description: string;
    shortDescription: string;
    rules: string[];
    deadline: string;
    criteria: string[];
    status: 'Open' | 'Live' | 'Closed';
    duration: string;
    teamSize: string;
    iconType: 'Code' | 'Terminal' | 'Smartphone' | 'Apple';
}

const ContestSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    rules: [{ type: String }],
    deadline: { type: String, required: true },
    criteria: [{ type: String }],
    status: { type: String, enum: ['Open', 'Live', 'Closed'], required: true },
    duration: { type: String, required: true },
    teamSize: { type: String, required: true },
    iconType: { type: String, enum: ['Code', 'Terminal', 'Smartphone', 'Apple'], required: true },
});

export default mongoose.models.Contest || mongoose.model<IContest>('Contest', ContestSchema);
