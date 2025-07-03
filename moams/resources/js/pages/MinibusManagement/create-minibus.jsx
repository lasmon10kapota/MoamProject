import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { LoaderCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import FlashMessage from '@/components/ui/flash-message';
import InputError from '@/components/input-error';

export default function CreateMinibus({ owners = [], flash, userRole }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        number_plate: '',
        assigned_route: '',
        owner_id: '',
    });

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Minibus Management', href: '/minibuses' },
        { title: 'Add Minibus', href: '/minibuses/create' },
    ];

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('minibuses.store'), {
            onFinish: () => reset('number_plate', 'assigned_route', 'owner_id'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Minibus" />
            {flash && flash.message && <FlashMessage message={flash.message} type="success" />}
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
                                Register a new minibus for the association member
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
                                autoFocus
                                autoComplete="number_plate"
                                value={data.number_plate}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="e.g. DZ 4536"
                            />
                            <InputError message={errors.number_plate} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="assigned_route">Assigned Route</Label>
                            <Input
                                id="assigned_route"
                                type="text"
                                autoComplete="assigned_route"
                                value={data.assigned_route}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="e.g. Mzomba-to-Blantyre"
                            />
                            <InputError message={errors.assigned_route} className="mt-1" />
                        </div>
                        {userRole === 'association clerk' && (
                            <div>
                                <Label htmlFor="owner_id">Minibus Owner</Label>
                                <select
                                    id="owner_id"
                                    value={data.owner_id}
                                    onChange={handleChange}
                                    disabled={processing}
                                    className="border rounded px-2 py-1 w-full"
                                >

                                    <option value="">Select Owner</option>
                                    {owners.map(owner => (
                                        <option key={owner.id} value={owner.id}>{owner.first_name} {owner.last_name}</option>
                                    ))}
                                </select>
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
                                Add minibus
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