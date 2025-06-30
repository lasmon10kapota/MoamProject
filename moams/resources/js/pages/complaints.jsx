import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Complaints() {
    const { userRoles } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Complaint Management',
            href: '/complaints',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Complaint Management" />

            <div className="p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-12">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Complaint Management
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                Complaint management is under development.
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Coming Soon Features:
                            </h2>
                            <ul className="text-left space-y-3 text-gray-600 dark:text-gray-400">
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Submit and track complaints
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Complaint categorization and prioritization
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Complaint status tracking (Open, In Progress, Resolved, Closed)
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Response management and communication
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Escalation procedures
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Complaint analytics and reporting
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    SLA monitoring and alerts
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    Complaint history and audit trails
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                            This module will provide comprehensive complaint management capabilities for the MOAM system.
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 