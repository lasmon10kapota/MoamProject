import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from "@/components/ui/progress";

export default function RegisterDriver() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        gender: '',
        phone_number: '',
        district: '',
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
        post(route('create-driver'));
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
                    <form onSubmit={submit} className="flex flex-col gap-4 border-1 p-5 rounded-md bg-gray-500">
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="first_name" className="text-white">First name</Label>
                            <Input
                                id="first_name"
                                type="text"
                                autoFocus
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
                            <Label htmlFor="phone_number" className="text-white">Phone number</Label>
                            <Input
                                id="phone_number"
                                type="tel"
                                autoFocus
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
                                autoComplete="district"
                                value={data.district}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="e.g. Ntcheu"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                            <InputError message={errors.district} />
                        </div>
                        <div className="flex gap-2 items-center justify-end p-1 rounded-md">
                            <Button type="submit" className="w-[50%] h-9 rounded-sm px-5 py-1.5 text-[darkslateblue] bg-blue-200 hover:bg-blue-300 cursor-pointer text-center" disabled={processing}>
                                {processing ? 'Registering...' : 'Register'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}