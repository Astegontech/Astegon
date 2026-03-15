'use client';

import { useState } from 'react';
import { Settings2, Loader2, Check, Edit2 } from 'lucide-react';
import { updateContestStatus } from '@/app/admin/contests/actions';
import Link from 'next/link';

const styles = {
    row: "border-b border-white/5 hover:bg-white/[0.02] transition-colors",
    cellPrimary: "px-6 py-4 font-medium text-white whitespace-nowrap",
    titleContainer: "flex flex-col",
    titleText: "text-base",
    slugText: "text-xs text-gray-500 font-light mt-1",
    cellStatus: "px-6 py-4",
    badgeBase: "px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border",
    cellActions: "px-6 py-4",
    actionsContainer: "flex items-center gap-2",
    formContainer: "flex items-center gap-2",
    selectInput: "bg-black border border-white/10 text-white text-xs rounded-lg focus:ring-white/20 focus:border-white/20 block p-2 outline-none",
    saveButtonBase: "p-2 rounded-lg text-white transition-colors border disabled:opacity-50",
    saveButtonSuccess: "bg-emerald-500/20 border-emerald-500/50 text-emerald-400",
    saveButtonDefault: "bg-white/5 hover:bg-white/10 border-white/10",
    iconSpin: "w-4 h-4 animate-spin",
    iconNormal: "w-4 h-4",
    editLink: "p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
};

export default function ContestStatusRow({ contest }: { contest: any }) {
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
        <tr className={styles.row}>
            <td className={styles.cellPrimary}>
                <div className={styles.titleContainer}>
                    <span className={styles.titleText}>{contest.title}</span>
                    <span className={styles.slugText}>/contest/{contest.slug}</span>
                </div>
            </td>
            <td className={styles.cellStatus}>
                <span className={`${styles.badgeBase} ${statusStyles[currentStatus] || statusStyles['Closed']}`}>
                    {currentStatus}
                </span>
            </td>
            <td className={styles.cellActions}>
                <div className={styles.actionsContainer}>
                    <form onSubmit={handleUpdate} className={styles.formContainer}>
                        <input type="hidden" name="id" value={contest._id} />
                        <select
                            name="status"
                            value={currentStatus}
                            onChange={(e) => setCurrentStatus(e.target.value)}
                            className={styles.selectInput}
                        >
                            <option value="Open">Open</option>
                            <option value="Live">Live</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <button
                            type="submit"
                            disabled={isPending}
                            className={`${styles.saveButtonBase} ${success ? styles.saveButtonSuccess : styles.saveButtonDefault}`}
                            title="Quick Save Status"
                        >
                            {isPending ? <Loader2 className={styles.iconSpin} /> :
                                success ? <Check className={styles.iconNormal} /> :
                                    <Settings2 className={styles.iconNormal} />}
                        </button>
                    </form>

                    <Link
                        href={`/admin/contests/editor?id=${contest._id}`}
                        className={styles.editLink}
                        title="Edit Full Contest Details"
                    >
                        <Edit2 className={styles.iconNormal} />
                    </Link>
                </div>
            </td>
        </tr>
    );
}
