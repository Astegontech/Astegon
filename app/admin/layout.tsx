import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row pt-16 selection:bg-white/20">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white/5 border-r border-white/10 flex-shrink-0 p-6">
                <div className="mb-8">
                    <h2 className="text-xl font-bold tracking-tight">Astegon Admin</h2>
                    <p className="text-xs text-emerald-400 mt-1">System Active</p>
                </div>
                <nav className="space-y-2">
                    <Link href="/admin/contests" className="block px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                        Registrations
                    </Link>
                    <Link href="/admin/contests/manage" className="block px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                        Manage Contests
                    </Link>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-10 relative overflow-y-auto">
                {/* Background elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02),transparent_50%)] pointer-events-none" />

                <div className="relative z-10 max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
