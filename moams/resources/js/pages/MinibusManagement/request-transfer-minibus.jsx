import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bus } from 'lucide-react';
import { Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function RequestTransferMinibus({ minibus }) {
    const { data, setData, post, processing, errors } = useForm({
        number_plate: minibus.number_plate,
        current_owner: `${minibus.user.first_name} ${minibus.user.last_name}`,
        new_owner_type: 'member',
        reason: '',
    });

    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Minibus Management', href: '/minibuses' },
        { title: minibus.number_plate, href: `/minibuses/${minibus.id}` },
        { title: 'Request Transfer', href: `/minibuses/${minibus.id}/transfer/request` },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('minibuses.transfer.request.store', minibus.id));
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
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center sm:text-left">Request Minibus Transfer</h1>
                </div>

                <div className="w-full max-w-3xl mx-auto">
                    <Card className="p-4 sm:p-6">
                        <div className="mb-6">
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3">
                                <Bus className="inline-block text-gray-500 mr-2 h-5 w-5 align-text-bottom" />
                                Ownership Transfer Request Details
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="number_plate">Number Plate</Label>
                                <Input
                                    id="number_plate"
                                    value={data.number_plate}
                                    disabled
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="current_owner">Current Owner</Label>
                                <Input
                                    id="current_owner"
                                    value={data.current_owner}
                                    disabled
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="new_owner_type">New Owner Type</Label>
                                <select
                                    id="new_owner_type"
                                    value={data.new_owner_type}
                                    onChange={e => setData('new_owner_type', e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    disabled={processing}
                                >
                                    <option value="member">Association Member</option>
                                    <option value="non_member">Non-Member</option>
                                </select>
                                <InputError message={errors.new_owner_type} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reason">Reason for Ownership Transfer</Label>
                                <Textarea
                                    id="reason"
                                    value={data.reason}
                                    onChange={e => setData('reason', e.target.value)}
                                    placeholder="Please provide a detailed reason for requesting the transfer..."
                                    rows={4}
                                    className="mt-1 block w-full"
                                    disabled={processing}
                                />
                                <InputError message={errors.reason} />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <Link href={route('minibuses.show', minibus.id)}>
                                    <Button type="button" variant="outline" disabled={processing}>
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing || !data.reason}
                                    className="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300"
                                >
                                    {processing ? 'Submitting...' : 'Submit Transfer Request'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
} 