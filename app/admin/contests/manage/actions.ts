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
