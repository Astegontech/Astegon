import connectDB from '@/lib/mongodb';
import ContestModel from '@/lib/models/Contest';
import ContestStatusRow from '@/components/contest/ContestStatusRow';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const revalidate = 0;

export default async function AdminManageContestsPage() {
    await connectDB();

    // Fetch all contests to populate the table
    const docs = await ContestModel.find({}).sort({ title: 1 }).lean();
    const contests = JSON.parse(JSON.stringify(docs));

    return (
        <div>
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Manage Contests</h1>
                    <p className="text-gray-400">Control the visibility, status bounds, and metadata of active contests.</p>
                </div>
                <Link href="/admin/contests/editor" className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors">
                    <Plus className="w-4 h-4" /> Add Contest
                </Link>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-white/5 text-xs uppercase border-b border-white/10">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-300">Contest Name</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-300">Current Status</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-300 w-64">Update Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contests.map((contest: any) => (
                            <ContestStatusRow key={contest._id} contest={contest} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
