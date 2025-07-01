import React, { useState } from 'react';
import { Head, useForm, Link, usePage, router } from '@inertiajs/react';
import { LoaderCircle, ArrowLeft } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import FlashMessage from '@/components/ui/flash-message';
import { Checkbox } from '@/components/ui/checkbox';

export default function AddUser() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        gender: '',

        district: '',
        village: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        role: '',
        commitment: false,
    });

    const { flash, roles } = usePage().props;
    const [showCommitmentError, setShowCommitmentError] = useState(false);

    if (!roles || !Array.isArray(roles) || roles.length === 0) return <div>Loading...</div>;

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
            title: 'Create User',
            href: '/admin/create-user',
        },
    ];

    const handleChange = (e) => {
        const { id, value, type, files, checked } = e.target;
        if (type === 'checkbox') {
            setData(id, checked);
            if (id === 'commitment') setShowCommitmentError(false);
        } else {
            setData(id, type === 'file' ? files[0] : value);
        }
    };

    const handleGenderChange = (value) => {
        setData('gender', value);
    };

    const handleRoleChange = (value) => {
        setData('role', value);
    };

    const handleCommitmentChange = (checked) => {
        setData('commitment', checked);
        setShowCommitmentError(false);
    };

    const submit = (e) => {
        e.preventDefault();
        if (!data.commitment) {
            setShowCommitmentError(true);
            return;
        }
        setShowCommitmentError(false);
        post('/admin/create-user', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {flash.message && <FlashMessage message={flash.message} type="success" />}
            <Head title="Create User" />

            <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-4">
                        <Link href="/admin/users">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Users
                            </Button>
                        </Link>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Create a new user account
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-2xl">
                    <form className="space-y-6" onSubmit={submit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="first_name">First name</Label>
                                <Input
                                    id="first_name"
                                    type="text"
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="first_name"
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
                                    autoFocus
                                    tabIndex={2}
                                    autoComplete="last_name"
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
                                id="gender"
                                type="text"
                                autoFocus
                                autoComplete="gender"
                                value={data.gender}
                                onValueChange={handleGenderChange}
                                disabled={processing}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Male/Female" className="overflow-hidden" />
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
                                type="text"
                                autoComplete="district"
                                value={data.district}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="e.g. Ntcheu"
                                className="placeholder:text-gray-400 text-gray-900 mt-1"
                            />
                            <InputError message={errors.district} className="mt-2" />
                        </div>
                        {/* Village */}
                        <div className="grid gap-2">
                            <Label htmlFor="village" className="text-gray-700">Village/Town</Label>
                            <Input
                                id="village"
                                type="text"
                                autoComplete="village"
                                value={data.village}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="e.g. Muwalo"
                                className="placeholder:text-gray-400 text-gray-900 mt-1"
                            />
                            <InputError message={errors.village} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                tabIndex={4}
                                autoComplete="email"
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
                                autoFocus
                                tabIndex={5}
                                autoComplete="phone_number"
                                value={data.phone_number}
                                onChange={handleChange}
                                placeholder="0889... or 0995... 0r +26599...."
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                tabIndex={5}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="Password"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                tabIndex={6}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={handleChange}
                                placeholder="Confirm password"
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="role">Role</Label>
                            <Select
                                id="role"
                                value={data.role}
                                onValueChange={handleRoleChange}
                                disabled={processing}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" className="overflow-hidden" />
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

                        {/* Commitment Statement (only for minibus owner) */}
                        {data.role === 'minibus owner' && (
                            <div className="flex flex-col my-2 space-y-2 p-4 bg-gray-50 rounded-md border border-gray-200">
                                <span className="text-gray-800 font-semibold text-base">Commitment Statement</span>
                                <span className="text-gray-600 text-sm">
                                    I commit to abide by the Constitution, rules, and regulations of the Minibus Owners Association of Malawi (MOAM), and to uphold the values and objectives of the Association at all times.
                                </span>
                                <div className="flex items-center space-x-3 mt-2">
                                    <Checkbox
                                        id="commitment"
                                        name="commitment"
                                        checked={!!data.commitment}
                                        onCheckedChange={handleCommitmentChange}
                                        disabled={processing}
                                        className="h-5 w-5"
                                    />
                                    <Label htmlFor="commitment" className="text-gray-700 text-sm">I have read and agree to the above commitment statement.</Label>
                                </div>
                                {showCommitmentError && (
                                    <InputError message="You must agree to the commitment statement to proceed." className="mt-2" />
                                )}
                            </div>
                        )}

                        <div className="flex space-x-4 pt-6">
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                Add user
                            </Button>
                            <Link href="/admin/users">
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