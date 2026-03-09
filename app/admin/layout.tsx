import React from 'react';
import Link from 'next/link';
import AdminAuth from '@/components/admin/AdminAuth';
import { Database, FolderKanban, Shield } from 'lucide-react';

const styles = {
    layoutWrapper: "min-h-screen bg-black text-white pt-16 selection:bg-white/20 flex relative",
    sidebar: "fixed md:static left-0 top-16 bottom-0 w-full md:w-20 md:hover:w-64 transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-[#0a0a0a] border-r border-white/10 z-40 overflow-hidden group flex-shrink-0",
    sidebarInner: "w-full md:w-64 h-full flex flex-col pt-6",
    navContainer: "space-y-4 px-4 flex-1",
    navLink: "flex items-center gap-4 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors w-full group/link",
    iconBox: "w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-black/50 border border-white/5 group-hover/link:border-white/20 group-hover/link:bg-white/10 transition-colors",
    iconDatabase: "w-5 h-5 group-hover/link:text-emerald-400 transition-colors",
    iconKanban: "w-5 h-5 group-hover/link:text-purple-400 transition-colors",
    navText: "font-medium whitespace-nowrap transition-opacity duration-300 opacity-100 md:opacity-0 group-hover:opacity-100",
    mainContent: "flex-1 w-full min-w-0 p-6 md:p-10 relative",
    bgPattern: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02),transparent_50%)] pointer-events-none fade-in",
    contentWrapper: "relative z-10 max-w-6xl mx-auto h-full pb-20"
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminAuth>
            <div className={styles.layoutWrapper}>
                {/* Collapsible Sidebar (Flex child pushing main content on desktop) */}
                <aside className={styles.sidebar}>
                    {/* Inner wrapper strictly 256px to freeze text layout during expansion */}
                    <div className={styles.sidebarInner}>
                        <nav className={styles.navContainer}>
                            <Link href="/admin/registrations" className={styles.navLink}>
                                <div className={styles.iconBox}>
                                    <Database className={styles.iconDatabase} />
                                </div>
                                <span className={styles.navText}>
                                    Registrations
                                </span>
                            </Link>

                            <Link href="/admin/contests" className={styles.navLink}>
                                <div className={styles.iconBox}>
                                    <FolderKanban className={styles.iconKanban} />
                                </div>
                                <span className={styles.navText}>
                                    Manage Contests
                                </span>
                            </Link>
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className={styles.mainContent}>
                    <div className={styles.bgPattern} />

                    <div className={styles.contentWrapper}>
                        {children}
                    </div>
                </main>
            </div>
            
        </AdminAuth>
    );
}
