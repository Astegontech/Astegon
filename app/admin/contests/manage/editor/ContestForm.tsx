'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { saveContest, deleteContest } from '../actions';
import { Plus, Trash2, X } from 'lucide-react';

export default function ContestForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        _id: initialData?._id || '',
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        status: initialData?.status || 'Open',
        duration: initialData?.duration || '48 Hours',
        teamSize: initialData?.teamSize || '1-4 Members',
        deadline: initialData?.deadline || '',
        iconType: initialData?.iconType || 'Code',
        shortDescription: initialData?.shortDescription || '',
        description: initialData?.description || '',
        rules: initialData?.rules || [''],
        criteria: initialData?.criteria || [''],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleArrayChange = (index: number, field: 'rules' | 'criteria', value: string) => {
        const newArr = [...formData[field]];
        newArr[index] = value;
        setFormData({ ...formData, [field]: newArr });
    };

    const addArrayItem = (field: 'rules' | 'criteria') => {
        setFormData({ ...formData, [field]: [...formData[field], ''] });
    };

    const removeArrayItem = (index: number, field: 'rules' | 'criteria') => {
        const newArr = [...formData[field]];
        newArr.splice(index, 1);
        setFormData({ ...formData, [field]: newArr });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Clean up empty array items before saving
        const cleanedData = {
            ...formData,
            rules: formData.rules.filter((r: string) => r.trim() !== ''),
            criteria: formData.criteria.filter((c: string) => c.trim() !== '')
        };

        const res = await saveContest(cleanedData);
        if (res.success) {
            router.push('/admin/contests/manage');
        } else {
            setError(res.message || 'Failed to save contest');
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this contest?')) return;
        setIsDeleting(true);
        const res = await deleteContest(formData._id);
        if (res.success) {
            router.push('/admin/contests/manage');
        } else {
            setError(res.message || 'Failed to delete contest');
            setIsDeleting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {error && <div className="p-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-sm">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Contest Title</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20" placeholder="e.g. Web Development" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">URL Slug (Optional)</label>
                    <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20" placeholder="Auto-generated if empty" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20">
                        <option value="Open">Open</option>
                        <option value="Live">Live</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Icon Type</label>
                    <select name="iconType" value={formData.iconType} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20">
                        <option value="Code">Code</option>
                        <option value="Terminal">Terminal</option>
                        <option value="Smartphone">Smartphone</option>
                        <option value="Apple">Apple</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Duration</label>
                    <input type="text" name="duration" required value={formData.duration} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20" placeholder="e.g. 48 Hours" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Team Size</label>
                    <input type="text" name="teamSize" required value={formData.teamSize} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20" placeholder="e.g. 1-4 Members" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Registration Deadline</label>
                <input type="text" name="deadline" required value={formData.deadline} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20" placeholder="e.g. February 28, 2026" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Short Description (Card Subtitle)</label>
                <textarea rows={2} name="shortDescription" required value={formData.shortDescription} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 resize-none" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Description</label>
                <textarea rows={4} name="description" required value={formData.description} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 resize-none" />
            </div>

            {/* Arrays */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-medium text-gray-400">Rules</label>
                        <button type="button" onClick={() => addArrayItem('rules')} className="text-xs flex items-center gap-1 text-emerald-400 hover:text-emerald-300">
                            <Plus className="w-3 h-3" /> Add Rule
                        </button>
                    </div>
                    <div className="space-y-3">
                        {formData.rules.map((rule: string, idx: number) => (
                            <div key={idx} className="flex gap-2">
                                <input type="text" value={rule} onChange={(e) => handleArrayChange(idx, 'rules', e.target.value)} className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20" placeholder="Rule detail..." />
                                <button type="button" onClick={() => removeArrayItem(idx, 'rules')} className="p-2 text-gray-500 hover:text-red-400 transition-colors"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-medium text-gray-400">Judging Criteria</label>
                        <button type="button" onClick={() => addArrayItem('criteria')} className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300">
                            <Plus className="w-3 h-3" /> Add Criterion
                        </button>
                    </div>
                    <div className="space-y-3">
                        {formData.criteria.map((crit: string, idx: number) => (
                            <div key={idx} className="flex gap-2">
                                <input type="text" value={crit} onChange={(e) => handleArrayChange(idx, 'criteria', e.target.value)} className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20" placeholder="Criteria detail..." />
                                <button type="button" onClick={() => removeArrayItem(idx, 'criteria')} className="p-2 text-gray-500 hover:text-red-400 transition-colors"><X className="w-4 h-4" /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-8">
                {formData._id ? (
                    <button type="button" onClick={handleDelete} disabled={isDeleting} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-2 px-4 py-2 hover:bg-red-500/10 rounded-lg transition-colors">
                        {isDeleting ? 'Deleting...' : <><Trash2 className="w-4 h-4" /> Delete Contest</>}
                    </button>
                ) : <div />}

                <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading || isDeleting} className="px-8">
                    {formData._id ? 'Save Changes' : 'Create Contest'}
                </Button>
            </div>
        </form>
    );
}
