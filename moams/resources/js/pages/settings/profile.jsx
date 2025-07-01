import { Head, Link, useForm, usePage } from '@inertiajs/react';
import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import FlashMessage from '@/components/ui/flash-message';

const breadcrumbs = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

export default function Profile({ mustVerifyEmail, status }) {
    const { auth, flash } = usePage().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        first_name: auth.user.first_name,
        last_name: auth.user.last_name,
        gender: auth.user.gender,
        email: auth.user.email,
        phone_number: auth.user.phone_number,

        district: auth.user.district || '',
        village: auth.user.village || '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };

    const handleGenderChange = (value) => {
        setData('gender', value);
    };



    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: false,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="border p-2 md:p-10 space-y-6 rounded-md">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="first_name">First name</Label>
                            <Input
                                id="first_name"
                                className="mt-1 block w-full"
                                value={data.first_name}
                                onChange={handleChange}
                                required
                                autoComplete="first_name"
                                placeholder="First name"
                            />
                            <InputError className="mt-2" message={errors.first_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last_name">Last name</Label>
                            <Input
                                id="last_name"
                                className="mt-1 block w-full"
                                value={data.last_name}
                                onChange={handleChange}
                                required
                                autoComplete="last_name"
                                placeholder="Last name"
                            />
                            <InputError className="mt-2" message={errors.last_name} />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                id="gender"
                                type="text"
                                required
                                autoComplete="gender"
                                value={data.gender}
                                onValueChange={handleGenderChange}
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
                            <InputError message={errors.gender} />
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
                            />
                            <InputError className="mt-2" message={errors.village} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={handleChange}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone_number">Phone number</Label>
                            <Input
                                id="phone_number"
                                type="tel"
                                required
                                className="mt-1 block w-full"
                                autoComplete="phone_number"
                                value={data.phone_number}
                                onChange={handleChange}
                                placeholder="0889... or 0995... 0r +26599...."
                            />
                            <InputError message={errors.phone_number} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing} className='w-[25%] bg-[darkslateblue] hover:bg-[darkblue] cursor-pointer'>Save</Button>
                            {flash?.message && <FlashMessage message={flash.message} type="success" />}
                            {flash?.info && <FlashMessage message={flash.info} type="info" />}
                        </div>
                    </form>
                </div>

                {/* Commitment Statement (uneditable) */}
                {auth.user.commitment && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
                        <Label className="text-sm font-medium text-gray-600">Commitment Statement</Label>
                        <p className="text-sm mt-1 whitespace-pre-line">{auth.user.commitment}</p>
                    </div>
                )}

                {/* <DeleteUser /> */}
            </SettingsLayout>
        </AppLayout>
    );
}
