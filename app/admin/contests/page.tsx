import connectDB from '@/lib/mongodb';
import ContestModel from '@/lib/models/Contest';
import ContestStatusRow from '@/components/contest/ContestStatusRow';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const revalidate = 0;

const styles = {
    headerContainer: "mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4",
    title: "text-3xl font-bold tracking-tight mb-2",
    subtitle: "text-gray-400",
    addButton: "inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors",
    addIcon: "w-4 h-4",
    tableContainer: "bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden",
    table: "w-full text-left text-sm text-gray-400",
    tableHeaderRow: "bg-white/5 text-xs uppercase border-b border-white/10",
    tableHeaderCell: "px-6 py-4 font-medium text-gray-300",
    tableHeaderCellAction: "px-6 py-4 font-medium text-gray-300 w-64"
};

export default async function AdminManageContestsPage() {
    await connectDB();

    // Fetch all contests to populate the table
    const docs = await ContestModel.find({}).sort({ title: 1 }).lean();
    const contests = JSON.parse(JSON.stringify(docs));

    return (
        <div>
            <div className={styles.headerContainer}>
                <div>
                    <h1 className={styles.title}>Manage Contests</h1>
                    <p className={styles.subtitle}>Control the visibility, status bounds, and metadata of active contests.</p>
                </div>
                <Link href="/admin/contests/editor" className={styles.addButton}>
                    <Plus className={styles.addIcon} /> Add Contest
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead className={styles.tableHeaderRow}>
                        <tr>
                            <th scope="col" className={styles.tableHeaderCell}>Contest Name</th>
                            <th scope="col" className={styles.tableHeaderCell}>Current Status</th>
                            <th scope="col" className={styles.tableHeaderCellAction}>Update Action</th>
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
