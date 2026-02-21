import connectDB from '@/app/api/lib/mongodb';
import ContestModel, { IContest } from '@/app/api/lib/models/Contest';
import { revalidatePath } from 'next/cache';
import { Settings2 } from 'lucide-react';

export const revalidate = 0; // Ensure fresh data on every load

// Next.js Server Action to update the status
async function updateContestStatus(formData: FormData) {
    'use server';

    const id = formData.get('id') as string;
    const status = formData.get('status') as string;

    if (!id || !status) return;

    await connectDB();
    await ContestModel.findByIdAndUpdate(id, { status });

    // Revalidate all contest pages to push live updates avoiding stale cache
    revalidatePath('/contest');
    revalidatePath('/admin/contests/manage');
}

export default async function ManageContestsPage() {
    await connectDB();

    const docs = await ContestModel.find({}).sort({ title: 1 }).lean();
    const contests = JSON.parse(JSON.stringify(docs));

    // Status Badge Styling logic
    const statusStyles: any = {
        'Open': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'Live': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        'Closed': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    };

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
                            <tr key={contest._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-base">{contest.title}</span>
                                        <span className="text-xs text-gray-500 font-light mt-1">/contest/{contest.slug}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border ${statusStyles[contest.status]}`}>
                                        {contest.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <form action={updateContestStatus} className="flex items-center gap-3">
                                        <input type="hidden" name="id" value={contest._id} />
                                        <select
                                            name="status"
                                            defaultValue={contest.status}
                                            className="bg-black border border-white/10 text-white text-xs rounded-lg focus:ring-white/20 focus:border-white/20 block p-2"
                                        >
                                            <option value="Open">Open</option>
                                            <option value="Live">Live</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                        <button
                                            type="submit"
                                            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
                                            title="Save Status"
                                        >
                                            <Settings2 className="w-4 h-4" />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
