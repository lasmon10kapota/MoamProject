import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Offenses() {
    const { userRoles } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Offense Management',
            href: '/offenses',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Offense Management" />

            <div className="p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-12">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Offense Management
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                Offense management is under development.
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Coming Soon Features:
                            </h2>
                            <ul className="text-left space-y-3 text-gray-600 dark:text-gray-400">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Record and track traffic offenses
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Offense categorization and severity levels
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Penalty calculation and management
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Driver offense history tracking
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Payment tracking for penalties
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    License suspension management
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Offense reporting and analytics
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Appeal process management
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Integration with law enforcement systems
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                            This module will provide comprehensive offense management capabilities for the MOAM system.
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 