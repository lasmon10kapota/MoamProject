import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bus } from 'lucide-react';

export default function HistoryMinibus({ minibus, history }) {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Minibus Management', href: '/minibuses' },
        { title: minibus.number_plate, href: `/minibuses/${minibus.id}` },
        { title: 'Ownership History', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-2 sm:p-4 md:p-8 ">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-center sm:justify-between mb-4 sm:mb-6">
                    <Link href={route('minibuses.show', minibus.id)}>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Minibus
                        </Button>
                    </Link>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center sm:text-left">Ownership History</h1>
                </div>
                <div className="w-full max-w-3xl mx-auto">
                    <Card>
                        <div className="p-2 sm:p-4">
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-5 text-center"><Bus className="inline-block text-gray-500 mr-2 h-5 w-5 align-text-bottom" />{minibus.number_plate} Ownership History</h3>
                            <div className="overflow-x-auto w-full">
                                <table className="w-full bg-white border text-xs sm:text-sm md:text-base">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="py-2 px-2 sm:px-3 md:px-6 border text-left font-semibold text-xs sm:text-sm">Previous Owner</th>
                                            <th className="py-2 px-2 sm:px-3 md:px-6 border text-left font-semibold text-xs sm:text-sm">New Owner</th>
                                            <th className="py-2 px-2 sm:px-3 md:px-6 border text-left font-semibold text-xs sm:text-sm">Transferred At</th>
                                            <th className="py-2 px-2 sm:px-3 md:px-6 border text-left font-semibold text-xs sm:text-sm">Transfer Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.length > 0 ? (
                                            history.map((entry, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="py-2 px-2 sm:px-3 md:px-6 border">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-xs sm:text-sm">{entry.previous_owner?.first_name} {entry.previous_owner?.last_name}</span>
                                                            <span className="text-gray-500 text-xs">{entry.previous_owner?.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-2 sm:px-3 md:px-6 border">
                                                        <div className="flex flex-col">
                                                            {entry.transfer_type === 'external' ? (
                                                                <span className="font-medium text-xs sm:text-sm text-gray-400">Non-member</span>
                                                            ) : (
                                                                <>
                                                                    <span className="font-medium text-xs sm:text-sm">{entry.new_owner?.first_name} {entry.new_owner?.last_name}</span>
                                                                    <span className="text-gray-500 text-xs">{entry.new_owner?.email}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-2 sm:px-3 md:px-6 border">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-xs sm:text-sm">{new Date(entry.created_at).toLocaleDateString()}</span>
                                                            <span className="text-gray-500 text-xs">{new Date(entry.created_at).toLocaleTimeString()}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-2 sm:px-3 md:px-6 border">
                                                        <span className="font-medium text-xs sm:text-sm capitalize">{entry.transfer_type}</span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="py-6 sm:py-8 px-3 sm:px-6 text-center text-gray-500 text-sm sm:text-base">
                                                    No ownership history available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
} 