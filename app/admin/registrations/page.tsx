import connectDB from '@/lib/mongodb';
import ContestRegistrationModel from '@/lib/models/ContestRegistration';
import { User, Phone, LinkIcon } from 'lucide-react';

export const revalidate = 0; // Ensure fresh data on every load

interface IRegistration {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    portfolio?: string;
    category: string;
    problemStatement: string;
    reason: string;
    submittedAt: string;
}

const styles = {
    headerContainer: "mb-8",
    title: "text-3xl font-bold tracking-tight mb-2",
    subtitle: "text-gray-400",
    emptyState: "bg-white/5 border border-white/10 p-10 rounded-2xl text-center",
    tableContainer: "bg-white/[0.02] border border-white/10 rounded-2xl overflow-x-auto",
    table: "w-full text-left text-sm text-gray-400 min-w-[1000px]",
    tableHeaderRow: "bg-white/5 text-xs uppercase border-b border-white/10",
    tableHeaderCell: "px-6 py-4 font-medium text-gray-300",
    tableHeaderCellRight: "px-6 py-4 font-medium text-gray-300 text-right",
    tableRow: "border-b border-white/5 hover:bg-white/[0.02] transition-colors",
    tableCell: "px-6 py-4 whitespace-nowrap",
    entrantContainer: "flex items-center gap-3",
    avatarBox: "w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0",
    avatarIcon: "w-4 h-4 text-gray-400",
    entrantDetails: "flex flex-col",
    entrantName: "text-white font-medium text-sm",
    entrantEmail: "text-xs text-gray-500 hover:text-white transition-colors mt-0.5",
    categoryBadge: "inline-block px-3 py-1 bg-purple-500/10 text-purple-400 text-[10px] uppercase tracking-wider font-semibold rounded-full border border-purple-500/20",
    problemCell: "px-6 py-4",
    problemText: "text-xs text-gray-300 font-medium leading-relaxed line-clamp-2 max-w-[200px]",
    contactLinksContainer: "flex flex-col gap-1.5 text-xs",
    contactLinkRow: "flex items-center gap-2",
    contactIcon: "w-3.5 h-3.5 text-gray-500",
    portfolioLink: "text-blue-400 hover:text-white transition-colors truncate max-w-[150px]",
    noLinkText: "flex items-center gap-2 text-gray-600",
    emptyIcon: "w-3.5 h-3.5",
    reasonCell: "px-6 py-4",
    reasonText: "text-xs text-gray-400 leading-relaxed line-clamp-2 max-w-[200px]",
    dateCell: "px-6 py-4 whitespace-nowrap text-right text-xs text-gray-500",
    timeText: "text-[10px]"
};

export default async function AdminContestRegistrationsPage() {
    await connectDB();

    // Fetch all registrations sorted securely by most recent
    const docs = await ContestRegistrationModel.find({}).sort({ submittedAt: -1 }).lean();
    const registrations: IRegistration[] = JSON.parse(JSON.stringify(docs));

    return (
        <div>
            <div className={styles.headerContainer}>
                <h1 className={styles.title}>Registrations Inbox</h1>
                <p className={styles.subtitle}>View and manage all incoming contest entries.</p>
            </div>

            {registrations.length === 0 ? (
                <div className={styles.emptyState}>
                    <p className={styles.subtitle}>No registrations found yet. Share your contest links!</p>
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.tableHeaderRow}>
                            <tr>
                                <th scope="col" className={styles.tableHeaderCell}>Entrant</th>
                                <th scope="col" className={styles.tableHeaderCell}>Category</th>
                                <th scope="col" className={styles.tableHeaderCell}>Selected Problem</th>
                                <th scope="col" className={styles.tableHeaderCell}>Contact & Links</th>
                                <th scope="col" className={styles.tableHeaderCell}>Reason to Win</th>
                                <th scope="col" className={styles.tableHeaderCellRight}>Submitted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((reg) => (
                                <tr key={reg._id} className={styles.tableRow}>
                                    {/* Entrant Profile */}
                                    <td className={styles.tableCell}>
                                        <div className={styles.entrantContainer}>
                                            <div className={styles.avatarBox}>
                                                <User className={styles.avatarIcon} />
                                            </div>
                                            <div className={styles.entrantDetails}>
                                                <span className={styles.entrantName}>{reg.fullName}</span>
                                                <a href={`mailto:${reg.email}`} className={styles.entrantEmail}>{reg.email}</a>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td className={styles.tableCell}>
                                        <span className={styles.categoryBadge}>
                                            {reg.category}
                                        </span>
                                    </td>

                                    {/* Selected Problem (Truncated) */}
                                    <td className={styles.problemCell}>
                                        <div className={styles.problemText} title={reg.problemStatement}>
                                            {reg.problemStatement || 'N/A'}
                                        </div>
                                    </td>

                                    {/* Contact & Links */}
                                    <td className={styles.tableCell}>
                                        <div className={styles.contactLinksContainer}>
                                            <div className={styles.contactLinkRow}>
                                                <Phone className={styles.contactIcon} />
                                                <span>{reg.phone}</span>
                                            </div>
                                            {reg.portfolio ? (
                                                <div className={styles.contactLinkRow}>
                                                    <LinkIcon className={styles.contactIcon} />
                                                    <a href={reg.portfolio} target="_blank" rel="noopener noreferrer" className={styles.portfolioLink}>
                                                        {reg.portfolio}
                                                    </a>
                                                </div>
                                            ) : (
                                                <div className={styles.noLinkText}>
                                                    <LinkIcon className={styles.emptyIcon} />
                                                    <span>No link provided</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    {/* Reason (Truncated) */}
                                    <td className={styles.reasonCell}>
                                        <div className={styles.reasonText} title={reg.reason}>
                                            {reg.reason}
                                        </div>
                                    </td>

                                    {/* Date */}
                                    <td className={styles.dateCell}>
                                        {new Date(reg.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        <br />
                                        <span className={styles.timeText}>{new Date(reg.submittedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
