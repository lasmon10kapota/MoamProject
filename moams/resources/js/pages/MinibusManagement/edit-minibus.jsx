import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

export default function EditMinibus({ minibus = {}, users = [], userRole }) {
    if (!minibus || !minibus.id) {
        return (
            <AppLayout>
                <div className="p-8">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-red-600">Error Loading Minibus</h2>
                        <p className="mt-2">Unable to load minibus details. Please try again.</p>
                        <Link href="/minibuses">
                            <Button variant="outline" size="sm" className="mt-4">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Minibuses
                            </Button>
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Minibus Management', href: '/minibuses' },
        { title: `Edit ${minibus.number_plate}`, href: `/minibuses/${minibus.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        number_plate: minibus.number_plate || '',
        assigned_route: minibus.assigned_route || '',
        owner_id: minibus.user_id || '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('minibuses.update', minibus.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-8">
                {/* Header */}
                <div className='flex justify-between items-center mb-8'>
                    <div className="flex items-center space-x-4">
                        <Link href="/minibuses">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Minibuses
                            </Button>
                        </Link>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Edit minibus details for the association member
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-2xl">
                    <form className="space-y-6" onSubmit={submit}>
                        <div>
                            <Label htmlFor="number_plate">Number Plate</Label>
                            <Input
                                id="number_plate"
                                type="text"
                                value={data.number_plate}
                                onChange={handleChange}
                                disabled={processing}
                            />
                            <InputError message={errors.number_plate} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="assigned_route">Assigned Route</Label>
                            <Input
                                id="assigned_route"
                                type="text"
                                value={data.assigned_route}
                                onChange={handleChange}
                                disabled={processing}
                            />
                            <InputError message={errors.assigned_route} className="mt-1" />
                        </div>
                        {userRole === 'association clerk' && minibus.archived && (
                            <div>
                                <Label htmlFor="owner_id">New Minibus Owner</Label>
                                <select
                                    id="owner_id"
                                    value={data.owner_id}
                                    onChange={handleChange}
                                    disabled={processing}
                                    className="mt-1 block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                >
                                    <option value="">Select Owner</option>
                                    {users.map(owner => (
                                        <option key={owner.id} value={owner.id}>
                                            {owner.first_name} {owner.last_name} ({owner.email})
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-2 text-sm text-amber-600">
                                    This minibus was previously archived. Please select a new owner to complete the unarchiving process.
                                </p>
                                <InputError message={errors.owner_id} className="mt-1" />
                            </div>
                        )}
                        <div className="flex space-x-4 pt-6">
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                Save changes
                            </Button>
                            <Link href="/minibuses">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

