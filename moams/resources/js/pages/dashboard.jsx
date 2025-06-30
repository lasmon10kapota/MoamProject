import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ users, message }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 items-center justify-center rounded-xl p-4">
                {message ? (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Feature Under Development
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            {message}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                            This feature will be available soon.
                        </p>
                    </div>
                ) : (
                    <h1>
                        Relevant information will be displayed here
                    </h1>
                )}
            </div>
        </AppLayout>
    );
}
