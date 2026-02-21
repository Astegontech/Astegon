'use client';

import { useState } from 'react';
import { Settings2, Loader2, Check } from 'lucide-react';
import { updateContestStatus } from './actions';

export default function StatusRow({ contest }: { contest: any }) {
    const [isPending, setIsPending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(contest.status);

    const statusStyles: any = {
        'Open': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'Live': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        'Closed': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setSuccess(false);

        const formData = new FormData(e.currentTarget);
        const res = await updateContestStatus(formData);

        setIsPending(false);
        if (res.success) {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        }
    };

    return (
        <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                <div className="flex flex-col">
                    <span className="text-base">{contest.title}</span>
                    <span className="text-xs text-gray-500 font-light mt-1">/contest/{contest.slug}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border ${statusStyles[currentStatus] || statusStyles['Closed']}`}>
                    {currentStatus}
                </span>
            </td>
            <td className="px-6 py-4">
                <form onSubmit={handleUpdate} className="flex items-center gap-3">
                    <input type="hidden" name="id" value={contest._id} />
                    <select
                        name="status"
                        value={currentStatus}
                        onChange={(e) => setCurrentStatus(e.target.value)}
                        className="bg-black border border-white/10 text-white text-xs rounded-lg focus:ring-white/20 focus:border-white/20 block p-2 outline-none"
                    >
                        <option value="Open">Open</option>
                        <option value="Live">Live</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <button
                        type="submit"
                        disabled={isPending}
                        className={`p-2 rounded-lg text-white transition-colors border ${success ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 hover:bg-white/10 border-white/10'} disabled:opacity-50`}
                        title="Save Status"
                    >
                        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> :
                            success ? <Check className="w-4 h-4" /> :
                                <Settings2 className="w-4 h-4" />}
                    </button>
                </form>
            </td>
        </tr>
    );
}
