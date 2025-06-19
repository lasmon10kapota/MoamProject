import { Head, Link, usePage } from '@inertiajs/react';
import AppLogo from '../components/app-logo';

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">

                <header className="bg-[#ffffff] border-1 rounded-sm p-4 mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                    <nav className="flex items-center justify-between gap-4">
                        <>
                            <AppLogo />
                            <div className='flex'>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </>
                    </nav>
                </header>


                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="flex-1 items-center p-2 justify-center w-full border rounded-sm overflow-hidden">
                        <div className='grid auto-rows-min gap-4 p-2 md:grid-cols-3 '>
                            <div className='p-4'>
                                <img src="assets/logos/groupcars.jpg" className='border-1 m-2 border-green-800 dark:border-none h-34 w-46 rounded-sm float-left' />
                                <h1 className='mt-2 font-medium text-center dark:text-white'>What is MOAM?</h1>
                                <p className="mt-2 text-center text-gray-600 dark:text-white">
                                    Expanded as Minibus Owners Association of Malawi, is an association that was formed by minibus owners to promote efficient and safe public transport in Malawi.
                                </p>
                            </div>
                            <div className='p-4'>
                                <img src="assets/logos/manOnphone.jpg" className='border-1 m-2 border-green-800 dark:border-none h-34 w-46 rounded-sm float-left' />
                                <h1 className='mt-2 font-medium text-center dark:text-white'>What is MOAMS?</h1>
                                <p className='mt-2 text-center text-gray-600 dark:text-white'> Expanded as Minibus Owners Association Management System, is an easy and convenient way to register and manage your membership with the association online.</p>
                            </div>
                            <div className='p-4'>
                                <img src="assets/logos/safetylogo.jpg" className='border-1 m-1 border-green-600 dark:border-none items-center h-34 rounded-[10%] float-left' />
                                <h1 className='mt-2 font-medium text-center dark:text-white'>What is the role of MOAM?</h1>
                                <p className="mt-2 text-center text-gray-600 dark:text-white">
                                    The role of MOAM is to serve as a quality check and to represent the minibus transport sector to other stakeholders including the government.
                                </p>
                                <p className="text-center text-gray-600 dark:text-white">
                                    You want to join? It's simple and cheap. Register.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1 items-center p-2 justify-center w-full border rounded-sm'>
                        <h1 className='font-medium text-center mb-2'>A brief membership registration process</h1>
                        <div className='flex items-center p-2 justify-center w-full border rounded-sm overflow-grid-cols-1'>
                            <Breadcrumb className="font-bold">
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        Create account
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        Log in
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        Provide registration details
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        Submit the registration details
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        Make payment
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        You are done
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className='flex-1 items-center p-2 justify-center w-full border rounded-sm'>
                        <h1 className='font-medium text-center mb-2 dark:text-white'>Want more information?</h1>
                        <div className='flex items-center p-2 justify-center w-full border rounded-sm overflow-grid-cols-1'>
                            <p className='text-center text-gray-600 dark:text-white'><b>[</b>Association name: Minibus owners association <b>|</b> Address: P.O. Box 51160, Limbe, Blantyre, Malawi <b>|</b> Phone number: 0998 62 26 60 OR 0888841195<b>]</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

{
    {/**  <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">First name</Label>
                            <Input
                                id="firstName"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="firstName"
                                value={data.firstName}
                                onChange={(e) => setData('firstName', e.target.value)}
                                disabled={processing}
                                placeholder="First name"
                            />
                            <InputError message={errors.firstName} className="mt-2" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Last name</Label>
                            <Input
                                id="lastName"
                                type="text"
                                required
                                autoFocus
                                tabIndex={2}
                                autoComplete="lastName"
                                value={data.firstName}
                                onChange={(e) => setData('lastName', e.target.value)}
                                disabled={processing}
                                placeholder="Last name"
                            />
                            <InputError message={errors.lastName} className="mt-2" />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Label htmlFor="remember">Gender</Label>
                            <Select tabIndex={3} required autoFocus value={data.gender} onChange={(e) => setData('gender', e.target.value)} disabled={processing}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select your gender" />
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
                                required
                                autoFocus
                                tabIndex={4}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />

                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                autoFocus
                                tabIndex={5}
                                autoComplete="phone"
                                value={data.email}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="0889......"
                            />
                            <InputError message={errors.phone} />

                        </div>


                        <Button type="submit" className="mt-4 w-full bg-blue-400 hover:bg-blue-500" tabIndex={6} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Next
                        </Button>
                    </div>
                </form>*/}
}