import { getContestById } from '../actions';
import ContestForm from '@/components/admin/ContestForm';
import Link from 'next/link';

export const revalidate = 0;

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
            <div className="mb-8">
                <Link href="/admin/contests" className="text-sm text-gray-500 hover:text-white transition-colors block mb-4">
                    &larr; Back to Manage Contests
                </Link>
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                    {isEditing ? 'Edit Contest' : 'Create New Contest'}
                </h1>
                <p className="text-gray-400">
                    {isEditing ? 'Update the details for this contest card.' : 'Draft a new contest card to display on the site.'}
                </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-10">
                <ContestForm initialData={initialData} />
            </div>
        </div>
    );
}
