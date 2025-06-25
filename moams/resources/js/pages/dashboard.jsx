import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ users }) {
    console.log(users);
    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 items-center justify-center rounded-xl p-4">
                <h1>
                    Revevant information will be displayed here
                </h1>
            </div>
        </AppLayout>
    );
}
