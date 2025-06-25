import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from "@/components/ui/progress";

export default function RegisterDriver() {
    const { data, setData, errors, processing } = useForm({
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        phone_number: '',
        district: '',
        driver_license: null,
    });

    const handleChange = (e) => {
        const { id, value, type, files } = e.target;
        setData(id, type === 'file' ? files[0] : value);
    };

    const handleGenderChange = (value) => {
        setData('gender', value);
    };

    return (
        <>
            <Head title="Tryit">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-xl flex-col gap-6 rounded-md">
                    <h1 className='font-bold text-center text-gray-500'>Register Your Driver Details</h1>
                    <form className="flex flex-col gap-4 border-1 p-5 rounded-md bg-gray-500">
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="first_name" className="text-white">First name</Label>
                            <Input
                                id="first_name"
                                type="text"
                                autoFocus
                                tabIndex={1}
                                autoComplete="first_name"
                                value={data.first_name}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="eg. John"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                            <InputError message={errors.first_name} />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="last_name" className="text-white">Last name</Label>
                            <Input
                                id="last_name"
                                type="text"
                                autoFocus
                                tabIndex={2}
                                autoComplete="last_name"
                                value={data.last_name}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="eg. Doe"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                            <InputError message={errors.last_name} />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                                id="gender"
                                type="text"
                                autoFocus
                                tabIndex={3}
                                value={data.gender}
                                onValueChange={handleGenderChange}
                                disabled={processing}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Male/Female" className="overflow-hidden" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.gender} />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="email" className="text-white">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                className="placeholder:text-gray-400 text-gray-300"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="phone_number" className="text-white">Phone number</Label>
                            <Input
                                id="phone_number"
                                type="tel"
                                autoFocus
                                tabIndex={5}
                                autoComplete="phone_number"
                                value={data.phone_number}
                                onChange={handleChange}
                                placeholder="0889......"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                            <InputError message={errors.phone_number} />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="district" className="text-white">Home district</Label>
                            <Input
                                id="district"
                                type="text"
                                autoFocus
                                tabIndex={2}
                                autoComplete="district"
                                value={data.district}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="e.g. Ntcheu"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                            <InputError message={errors.district} />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="driver_license" className="text-white">Driver license</Label>
                            <Input
                                id="driver_license"
                                type="file"
                                accept="image/*"
                                autoFocus
                                tabIndex={5}
                                onChange={handleChange}
                                className='file:text-gray-400'
                            />
                            <InputError message={errors.driver_license} />
                        </div>
                        <div className="flex gap-2 items-center justify-end p-1 rounded-md">
                            <Link
                                href={route('reviewRegInfor')}
                                className="w-[50%] h-9 rounded-sm px-5 py-1.5 text-[darkslateblue] bg-blue-200 hover:bg-blue-300 cursor-pointer text-center"
                            >
                                Register
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}