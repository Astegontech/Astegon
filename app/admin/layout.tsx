import React from 'react';
import Link from 'next/link';
import AdminAuth from '@/components/admin/AdminAuth';
import { Database, FolderKanban, Shield } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminAuth>
            <div className="min-h-screen bg-black text-white pt-16 selection:bg-white/20 flex relative">

                {/* Collapsible Sidebar (Flex child pushing main content on desktop) */}
                <aside className="fixed md:static left-0 top-16 bottom-0 w-full md:w-20 md:hover:w-64 transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-[#0a0a0a] border-r border-white/10 z-40 overflow-hidden group flex-shrink-0">

                    {/* Inner wrapper strictly 256px to freeze text layout during expansion */}
                    <div className="w-full md:w-64 h-full flex flex-col pt-6">
                        {/* <div className="p-5 flex items-center gap-4 border-b border-white/5 h-20">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <div className="whitespace-nowrap transition-opacity duration-300 opacity-100 md:opacity-0 group-hover:opacity-100">
                                <h2 className="text-lg font-bold tracking-tight">Astegon Admin</h2>
                                <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 mt-1">System Active</p>
                            </div>
                        </div> */}

                        <nav className="space-y-4 px-4 flex-1">
                            <Link href="/admin/contests" className="flex items-center gap-4 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors w-full group/link">
                                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-black/50 border border-white/5 group-hover/link:border-white/20 group-hover/link:bg-white/10 transition-colors">
                                    <Database className="w-5 h-5 group-hover/link:text-emerald-400 transition-colors" />
                                </div>
                                <span className="font-medium whitespace-nowrap transition-opacity duration-300 opacity-100 md:opacity-0 group-hover:opacity-100">
                                    Registrations
                                </span>
                            </Link>

                            <Link href="/admin/contests/manage" className="flex items-center gap-4 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors w-full group/link">
                                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-black/50 border border-white/5 group-hover/link:border-white/20 group-hover/link:bg-white/10 transition-colors">
                                    <FolderKanban className="w-5 h-5 group-hover/link:text-purple-400 transition-colors" />
                                </div>
                                <span className="font-medium whitespace-nowrap transition-opacity duration-300 opacity-100 md:opacity-0 group-hover:opacity-100">
                                    Manage Contests
                                </span>
                            </Link>
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 w-full min-w-0 p-6 md:p-10 relative overflow-y-auto h-[calc(100vh-4rem)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02),transparent_50%)] pointer-events-none fade-in" />

                    <div className="relative z-10 max-w-6xl mx-auto h-full">
                        {children}
                    </div>
                </main>
            </div>
        </AdminAuth>
    );
}
