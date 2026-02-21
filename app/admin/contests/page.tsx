import connectDB from '@/app/api/lib/mongodb';
import ContestRegistrationModel from '@/app/api/lib/models/ContestRegistration';
import { User, Phone, LinkIcon } from 'lucide-react';

export const revalidate = 0; // Ensure fresh data on every load

interface IRegistration {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    portfolio?: string;
    category: string;
    reason: string;
    submittedAt: string;
}

export default async function AdminRegistrationsPage() {
    await connectDB();

    // Fetch all registrations sorted securely by most recent
    const docs = await ContestRegistrationModel.find({}).sort({ submittedAt: -1 }).lean();
    const registrations: IRegistration[] = JSON.parse(JSON.stringify(docs));

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Registrations Inbox</h1>
                <p className="text-gray-400">View and manage all incoming contest entries.</p>
            </div>

            {registrations.length === 0 ? (
                <div className="bg-white/5 border border-white/10 p-10 rounded-2xl text-center">
                    <p className="text-gray-400">No registrations found yet. Share your contest links!</p>
                </div>
            ) : (
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400 min-w-[800px]">
                        <thead className="bg-white/5 text-xs uppercase border-b border-white/10">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-300">Entrant</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-300">Category</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-300">Contact & Links</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-300">Reason to Win</th>
                                <th scope="col" className="px-6 py-4 font-medium text-gray-300 text-right">Submitted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((reg) => (
                                <tr key={reg._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    {/* Entrant Profile */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                <User className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium text-sm">{reg.fullName}</span>
                                                <a href={`mailto:${reg.email}`} className="text-xs text-gray-500 hover:text-white transition-colors mt-0.5">{reg.email}</a>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 text-[10px] uppercase tracking-wider font-semibold rounded-full border border-purple-500/20">
                                            {reg.category}
                                        </span>
                                    </td>

                                    {/* Contact & Links */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col gap-1.5 text-xs">
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-3.5 h-3.5 text-gray-500" />
                                                <span>{reg.phone}</span>
                                            </div>
                                            {reg.portfolio ? (
                                                <div className="flex items-center gap-2">
                                                    <LinkIcon className="w-3.5 h-3.5 text-gray-500" />
                                                    <a href={reg.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white transition-colors truncate max-w-[150px]">
                                                        {reg.portfolio}
                                                    </a>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <LinkIcon className="w-3.5 h-3.5" />
                                                    <span>No link provided</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>

                                    {/* Reason (Truncated) */}
                                    <td className="px-6 py-4">
                                        <div className="text-xs text-gray-400 leading-relaxed line-clamp-2 max-w-xs" title={reg.reason}>
                                            {reg.reason}
                                        </div>
                                    </td>

                                    {/* Date */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs text-gray-500">
                                        {new Date(reg.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        <br />
                                        <span className="text-[10px]">{new Date(reg.submittedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
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
