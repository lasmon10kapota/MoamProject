import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bus } from 'lucide-react';
import { Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';

export default function TransferMinibus({ minibus, users }) {
    const { data, setData, post, processing, errors } = useForm({
        new_owner_id: '',
        transfer_type: 'internal',
    });

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Minibus Management', href: '/minibuses' },
        { title: minibus.number_plate, href: `/minibuses/${minibus.id}` },
        { title: 'Transfer Ownership', href: `/minibuses/${minibus.id}/transfer` },
    ];

    const handleTransferTypeChange = (value) => {
        setData(data => ({
            ...data,
            transfer_type: value,
            new_owner_id: value === 'external' ? '' : data.new_owner_id
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('minibuses.transfer.process', minibus.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-2 sm:p-4 md:p-8">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-center sm:justify-between mb-4 sm:mb-6">
                    <Link href={route('minibuses.show', minibus.id)}>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Minibus Details
                        </Button>
                    </Link>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center sm:text-left">Transfer Minibus Ownership</h1>
                </div>

                <div className="w-full max-w-3xl mx-auto">
                    <Card className="p-4 sm:p-6">
                        <div className="mb-6">
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3">
                                <Bus className="inline-block text-gray-500 mr-2 h-5 w-5 align-text-bottom" />
                                {minibus.number_plate}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                Current Owner: {minibus.user?.first_name} {minibus.user?.last_name}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="transfer_type">Transfer Type</Label>
                                <select
                                    id="transfer_type"
                                    value={data.transfer_type}
                                    onChange={e => handleTransferTypeChange(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    disabled={processing}
                                >
                                    <option value="internal">Internal Transfer (To Another Member)</option>
                                    <option value="external">External Transfer (To Non-Member)</option>
                                </select>
                                <InputError message={errors.transfer_type} />
                            </div>

                            {data.transfer_type === 'internal' && (
                                <div className="space-y-2">
                                    <Label htmlFor="new_owner_id">New Owner</Label>
                                    <select
                                        id="new_owner_id"
                                        value={data.new_owner_id}
                                        onChange={e => setData('new_owner_id', e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                                        disabled={processing}
                                    >
                                        <option value="">Select new owner</option>
                                        {users
                                            .filter(user => user.id !== minibus.user?.id)
                                            .map(user => (
                                                <option key={user.id} value={user.id}>
                                                    {user.first_name} {user.last_name} ({user.email})
                                                </option>
                                            ))}
                                    </select>
                                    <InputError message={errors.new_owner_id} />
                                </div>
                            )}

                            {data.transfer_type === 'external' && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                                    <p className="text-sm text-yellow-700">
                                        Note: External transfer will mark this minibus as transferred to a non-member and archive it. Only association clerks will be able to access it until the new owner joins the association.
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-end space-x-3 pt-4">
                                <Link href={route('minibuses.show', minibus.id)}>
                                    <Button type="button" variant="outline" disabled={processing}>
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing || (!data.new_owner_id && data.transfer_type === 'internal')}
                                    className="bg-green-500 hover:bg-green-600 text-white disabled:bg-green-300"
                                >
                                    {processing ? 'Processing...' : 'Transfer Ownership'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
} 