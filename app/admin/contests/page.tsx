import connectDB from '@/app/api/lib/mongodb';
import ContestRegistrationModel from '@/app/api/lib/models/ContestRegistration';
import { Calendar, User, Mail, Phone, LinkIcon, Target } from 'lucide-react';

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
                <div className="grid gap-6">
                    {registrations.map((reg) => (
                        <div key={reg._id} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                                        <User className="w-5 h-5 text-gray-400" />
                                        {reg.fullName}
                                    </h3>
                                    <span className="inline-block mt-2 px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-medium rounded-full border border-purple-500/20">
                                        Contest: {reg.category}
                                    </span>
                                </div>
                                <div className="text-right flex items-center gap-2 text-sm text-gray-500 font-light">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(reg.submittedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-300 font-light mb-6 border-y border-white/5 py-6">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-gray-500" />
                                    <a href={`mailto:${reg.email}`} className="hover:text-white transition-colors">{reg.email}</a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-gray-500" />
                                    <span>{reg.phone}</span>
                                </div>
                                {reg.portfolio && (
                                    <div className="flex items-center gap-3">
                                        <LinkIcon className="w-4 h-4 text-gray-500" />
                                        <a href={reg.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-blue-400 truncate max-w-xs">{reg.portfolio}</a>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h4 className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                                    <Target className="w-4 h-4" />
                                    Reason to Win
                                </h4>
                                <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-sm text-gray-300 leading-relaxed font-light">
                                    {reg.reason}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
