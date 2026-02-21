import connectDB from '@/app/api/lib/mongodb';
import ContestModel from '@/app/api/lib/models/Contest';
import StatusRow from './StatusRow';

export const revalidate = 0;

export default async function ManageContestsPage() {
    await connectDB();

    // Fetch all contests to populate the table
    const docs = await ContestModel.find({}).sort({ title: 1 }).lean();
    const contests = JSON.parse(JSON.stringify(docs));

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Manage Contests</h1>
                <p className="text-gray-400">Control the visibility and status bounds of active contests.</p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-white/5 text-xs uppercase border-b border-white/10">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-300">Contest Name</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-300">Current Status</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-300">Update Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contests.map((contest: any) => (
                            <StatusRow key={contest._id} contest={contest} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
