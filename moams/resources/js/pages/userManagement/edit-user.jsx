import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { LoaderCircle, ArrowLeft } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import FlashMessage from '@/components/ui/flash-message';

export default function EditUser() {
    const { user, roles, flash } = usePage().props;

    const { data, setData, patch, processing, errors } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        email: user.email,
        phone_number: user.phone_number,
        role: user.roles.length > 0 ? user.roles[0].name : '',

        district: user.district || '',
        village: user.village || '',
    });

    const breadcrumbs = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'User Management',
            href: '/admin/users',
        },
        {
            title: `${user.first_name} ${user.last_name}`,
            href: `/admin/users/${user.id}`,
        },
        {
            title: 'Edit User',
            href: `/admin/users/${user.id}/edit`,
        },
    ];

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };

    const handleGenderChange = (value) => {
        setData('gender', value);
    };

    const handleRoleChange = (value) => {
        setData('role', value);
    };



    const submit = (e) => {
        e.preventDefault();
        patch(`/admin/users/${user.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit User - ${user.first_name} ${user.last_name}`} />

            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-4">
                        <Link href={`/admin/users/${user.id}`}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to User
                            </Button>
                        </Link>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Update information for {user.first_name} {user.last_name}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Flash Messages */}
                {flash.message && <FlashMessage message={flash.message} type="success" />}

                <div className="max-w-2xl">
                    <form className="space-y-6" onSubmit={submit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="first_name">First name</Label>
                                <Input
                                    id="first_name"
                                    type="text"
                                    value={data.first_name}
                                    onChange={handleChange}
                                    disabled={processing}
                                    placeholder="First name"
                                />
                                <InputError message={errors.first_name} className="mt-2" />
                            </div>
                            <div>
                                <Label htmlFor="last_name">Last name</Label>
                                <Input
                                    id="last_name"
                                    type="text"
                                    value={data.last_name}
                                    onChange={handleChange}
                                    disabled={processing}
                                    placeholder="Last name"
                                />
                                <InputError message={errors.last_name} className="mt-2" />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                value={data.gender}
                                onValueChange={handleGenderChange}
                                disabled={processing}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.gender} className="mt-2" />
                        </div>

                        {/* District */}
                        <div className="grid gap-2">
                            <Label htmlFor="district" className="text-gray-700">District</Label>
                            <Input
                                id="district"
                                className="mt-1 block w-full"
                                value={data.district}
                                onChange={handleChange}
                                required
                                autoComplete="district"
                                placeholder="District"
                                disabled={processing}
                            />
                            <InputError className="mt-2" message={errors.district} />
                        </div>
                        {/* Village */}
                        <div className="grid gap-2">
                            <Label htmlFor="village" className="text-gray-700">Village/Town</Label>
                            <Input
                                id="village"
                                className="mt-1 block w-full"
                                value={data.village}
                                onChange={handleChange}
                                required
                                autoComplete="village"
                                placeholder="Village/Town"
                                disabled={processing}
                            />
                            <InputError className="mt-2" message={errors.village} />
                        </div>
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="phone_number">Phone number</Label>
                            <Input
                                id="phone_number"
                                type="tel"
                                value={data.phone_number}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="0889... or 0995... or +26599...."
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={data.role}
                                onValueChange={handleRoleChange}
                                disabled={processing}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {roles.map(role => (
                                            <SelectItem key={role} value={role}>{role}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.role} className="mt-2" />
                        </div>

                        <div className="flex space-x-4 pt-6">
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                Update User
                            </Button>
                            <Link href={`/admin/users/${user.id}`}>
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