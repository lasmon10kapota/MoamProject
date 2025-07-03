import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function TransferRequests({ transferRequests }) {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Minibus Management', href: '/minibuses' },
        { title: 'Transfer Requests', href: '/minibuses/transfer-requests' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transfer Requests" />
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">Transfer Requests</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Review and process minibus transfer requests
                        </p>
                    </div>
                </div>

                {transferRequests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {transferRequests.map((request) => (
                            <Card key={request.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center space-x-2">
                                            <Bus className="h-5 w-5 text-gray-500" />
                                            <CardTitle className="text-lg">{request.minibus.number_plate}</CardTitle>
                                        </div>
                                        <Badge variant={request.status === 'pending' ? 'warning' : 'success'}>
                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Current Owner</p>
                                            <p className="font-medium">
                                                {request.previous_owner.first_name} {request.previous_owner.last_name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Transfer Type</p>
                                            <p className="font-medium capitalize">{request.transfer_type}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Reason</p>
                                            <p className="font-medium">{request.reason}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Requested On</p>
                                            <p className="font-medium">
                                                {format(new Date(request.created_at), 'PPP')}
                                            </p>
                                        </div>
                                        <div className="flex justify-end space-x-3 pt-4">
                                            <Link href={route('minibuses.transfer', request.minibus.id)}>
                                                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                                                    Process Request
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <Bus className="h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-lg font-medium text-gray-900 mb-1">No Transfer Requests</p>
                            <p className="text-sm text-gray-500">
                                There are no pending transfer requests at the moment
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
} 