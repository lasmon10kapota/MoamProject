import { Head, useForm, Link, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
    });

    const { flash } = usePage().props;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };

    const handleGenderChange = (value) => {
        setData('gender', value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout
            title="Create an account"
            description=""
        >
            {flash.message && (
                <div className="mb-4 p-4 rounded bg-green-100 border border-green-400 text-green-800 text-center font-semibold">
                    {flash.message}
                </div>
            )}
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
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
                    <div className="grid gap-2">
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
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                            id="gender"
                            type="text"
                            autoFocus
                            tabIndex={3}
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
                        <InputError message={errors.gender} />
                    </div>
                    <div className="grid gap-2">
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
                        <InputError message={errors.email} />
                    </div>
                    <div className="grid gap-2">
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
                        <InputError message={errors.phone_number} />
                    </div>
                    <div className="grid gap-2">
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
                        <InputError message={errors.password} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            tabIndex={6}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={handleChange}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                </div>
                <Button className="w-full bg-blue-400 hover:bg-blue-500 cursor-pointer" disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Register
                </Button>
            </form>
            <div className="mt-4 text-center">
                <span className="text-gray-600 dark:text-gray-300">Already have an account? </span>
                <Link href={route('login')} className="text-blue-600 hover:underline font-semibold">Log in</Link>
            </div>
        </AuthLayout>
    );
}
