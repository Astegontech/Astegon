import connectDB from '@/app/api/lib/mongodb';
import ContestModel, { IContest } from '@/app/api/lib/models/Contest';
import { contests as staticContests } from '@/data/contests';

export async function getContests(): Promise<IContest[]> {
    try {
        await connectDB();

        // Find existing contests, sorted by creation or title if preferred.
        let contests = await ContestModel.find({}).lean();

        // Database seeding failsafe
        if (contests.length === 0) {
            console.log('Seeding MongoDB Contests collection...');
            await ContestModel.insertMany(staticContests);
            contests = await ContestModel.find({}).lean();
        }

        return JSON.parse(JSON.stringify(contests));
    } catch (error) {
        console.error('Database connection failed. Falling back to static data.', error);
        return staticContests as any;
    }
}

export async function getContestBySlug(slug: string): Promise<IContest | null> {
    try {
        await connectDB();
        const contest = await ContestModel.findOne({ slug }).lean();
        if (!contest) return null;

        return JSON.parse(JSON.stringify(contest));
    } catch (error) {
        console.error('Failed to fetch contest by slug.', error);
        return staticContests.find((c) => c.slug === slug) as any || null;
    }
}
