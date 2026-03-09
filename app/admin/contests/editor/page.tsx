import { getContestById } from '../actions';
import ContestForm from '@/components/contest/ContestForm';
import Link from 'next/link';

export const revalidate = 0;

const styles = {
    headerContainer: "mb-8",
    backLink: "text-sm text-gray-500 hover:text-white transition-colors block mb-4",
    title: "text-3xl font-bold tracking-tight mb-2",
    subtitle: "text-gray-400",
    formContainer: "bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-10"
};

export default async function AdminContestEditorPage({
    searchParams,
}: {
    searchParams: { id?: string };
}) {
    const isEditing = !!searchParams.id;
    let initialData = null;

    if (isEditing) {
        initialData = await getContestById(searchParams.id as string);
    }

    return (
        <div>
            <div className={styles.headerContainer}>
                <Link href="/admin/contests" className={styles.backLink}>
                    &larr; Back to Manage Contests
                </Link>
                <h1 className={styles.title}>
                    {isEditing ? 'Edit Contest' : 'Create New Contest'}
                </h1>
                <p className={styles.subtitle}>
                    {isEditing ? 'Update the details for this contest card.' : 'Draft a new contest card to display on the site.'}
                </p>
            </div>

            <div className={styles.formContainer}>
                <ContestForm initialData={initialData} />
            </div>
        </div>
    );
}
