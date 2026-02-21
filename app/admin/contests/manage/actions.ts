'use server';

import connectDB from '@/app/api/lib/mongodb';
import ContestModel from '@/app/api/lib/models/Contest';
import { revalidatePath } from 'next/cache';

export async function updateContestStatus(formData: FormData) {
    const id = formData.get('id') as string;
    const status = formData.get('status') as string;

    if (!id || !status) return { success: false, message: 'Missing fields' };

    try {
        await connectDB();
        await ContestModel.findByIdAndUpdate(id, { status });

        revalidatePath('/contest');
        revalidatePath('/admin/contests/manage');

        return { success: true };
    } catch (error: any) {
        console.error('Error updating status:', error);
        return { success: false, message: error.message };
    }
}

export async function saveContest(data: any) {
    try {
        await connectDB();

        // Auto-generate ID and slug if missing
        if (!data.id) {
            data.id = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
        if (!data.slug) {
            data.slug = data.id;
        }

        if (!data._id) {
            const newContest = new ContestModel(data);
            await newContest.save();
        } else {
            const { _id, ...updateData } = data;
            await ContestModel.findByIdAndUpdate(_id, updateData);
        }

        revalidatePath('/contest');
        revalidatePath('/admin/contests/manage');

        return { success: true };
    } catch (error: any) {
        console.error('Error saving contest:', error);
        return { success: false, message: error.message };
    }
}

export async function getContestById(id: string) {
    try {
        await connectDB();
        const doc = await ContestModel.findById(id).lean();
        if (!doc) return null;
        return JSON.parse(JSON.stringify(doc));
    } catch (e) {
        return null;
    }
}

export async function deleteContest(id: string) {
    try {
        await connectDB();
        await ContestModel.findByIdAndDelete(id);
        revalidatePath('/contest');
        revalidatePath('/admin/contests/manage');
        return { success: true };
    } catch (e: any) {
        return { success: false, message: e.message };
    }
}
