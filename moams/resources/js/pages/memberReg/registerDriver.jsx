import { Head, Link } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from "@/components/ui/progress";

export default function RegisterDriver() {

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
                            <Label htmlFor="firstName" className="text-white">First name</Label>
                            <Input
                                id="firstName"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="firstName"
                                // value={data.firstName}
                                // onChange={(e) => setData('firstName', e.target.value)}
                                // disabled={processing}
                                placeholder="eg. John"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="lastName" className="text-white">Last name</Label>
                            <Input
                                id="lastName"
                                type="text"
                                required
                                autoFocus
                                tabIndex={2}
                                autoComplete="lastName"
                                // value={data.firstName}
                                // onChange={(e) => setData('firstName', e.target.value)}
                                // disabled={processing}
                                placeholder="eg. Doe"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="gender" className="text-white">Gender</Label>
                            <Select>
                                <SelectTrigger className="data-[placeholder]:text-gray-400 [&_svg:not([class*='text-'])]:text-white text-gray-300">
                                    <SelectValue placeholder="Male/Female" className="overflow-hidden" />
                                </SelectTrigger>
                                <SelectContent>
                                    < SelectGroup>
                                        <SelectItem value="male" >Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="email" className="text-white">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                // value={data.email}
                                // onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="placeholder:text-gray-400 text-gray-300"
                            />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="phone" className="text-white">Phone number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                autoFocus
                                tabIndex={5}
                                autoComplete="phone"
                                //value={data.email}
                                //onChange={(e) => setData('phone', e.target.value)}
                                placeholder="0889......"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="district" className="text-white">Home district</Label>
                            <Input
                                id="district"
                                type="text"
                                required
                                autoFocus
                                tabIndex={2}
                                autoComplete="district"
                                // value={data.firstName}
                                // onChange={(e) => setData('firstName', e.target.value)}
                                // disabled={processing}
                                placeholder="e.g. Ntcheu"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="driverLicense" className="text-white">Driver license</Label>
                            <Input
                                id="driverLicense"
                                type="file"
                                required
                                autoFocus
                                tabIndex={5}
                                autoComplete="driverLicense"
                                //value={data.email}
                                //onChange={(e) => setData('phone', e.target.value)}
                                className='file:text-gray-400'
                            />
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