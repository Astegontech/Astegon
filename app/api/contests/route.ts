import { NextResponse } from 'next/server';
import connectDB from '../lib/mongodb';
import ContestModel from '../lib/models/Contest';
import { contests as staticContests } from '@/data/contests';

export const revalidate = 0; // Ensure fresh data

export async function GET() {
    try {
        await connectDB();

        let contests = await ContestModel.find({});

        // One-time Seed operation: If DB is completely empty, populate from the static file
        if (contests.length === 0) {
            console.log('Seeding MongoDB Contests collection...');
            await ContestModel.insertMany(staticContests);
            contests = await ContestModel.find({});
        }

        return NextResponse.json({ success: true, data: contests });
    } catch (error) {
        console.error('Error fetching contests:', error);
        return NextResponse.json({ error: 'Failed to fetch contests' }, { status: 500 });
    }
}
