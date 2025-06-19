import { Head, Link } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";

export default function RegisterMinibus() {

    return (
        <>
            <Head title="Tryit">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-xl flex-col gap-6 rounded-md">
                    <div className="flex gap-2 items-center p-1">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-sm">
                            <img src='/assets/logos/MoamLogo.png' alt='App-logo' className='size-7 rounded-sm fill-current' />
                        </div>
                        <div className='bg-gray w-full border rounded-md p-4'>
                            <Progress value={50} />
                        </div>
                    </div>
                    <h1 className='font-bold text-center text-gray-500'>Register Your Minibus Details</h1>
                    <form className="flex flex-col gap-6 border-1 p-5 rounded-md bg-gray-500">
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="numberPlate" className="text-white">Number Plate</Label>
                            <Input
                                id="numberPlate"
                                type="text"
                                required
                                autoFocus
                                tabIndex={5}
                                autoComplete="numberPlate"
                                //value={data.email}
                                //onChange={(e) => setData('phone', e.target.value)}
                                placeholder="eg. DZ 4536"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="assignedRoute" className="text-white">Assigned route</Label>
                            <Input
                                id="assignedRoute"
                                type="text"
                                required
                                autoFocus
                                tabIndex={5}
                                autoComplete="assignedRoute"
                                //value={data.email}
                                //onChange={(e) => setData('phone', e.target.value)}
                                placeholder="eg. Mzomba-to-Blantyre"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="ownershipProof" className="text-white">Proof of ownership</Label>
                            <Input
                                id="ownershipProof"
                                type="file"
                                required
                                autoFocus
                                tabIndex={5}
                                autoComplete="ownershipProof"
                                //value={data.email}
                                //onChange={(e) => setData('phone', e.target.value)}
                                className='file:text-gray-400'
                            />
                        </div>
                        <div className="flex gap-2 items-center justify-between bg-gray-400 p-1 rounded-md">
                            <Link
                                href={route('registerOwner')}
                                className="w-[25%] h-9 rounded-sm px-5 py-1.5 text-[darkslateblue] bg-gray-200 hover:bg-gray-300 cursor-pointer text-center"
                            >
                                Back
                            </Link>
                            <Link
                                href={route('reviewRegInfor')}
                                className="w-[25%] h-9 rounded-sm px-5 py-1.5 text-[darkslateblue] bg-blue-200 hover:bg-blue-300 cursor-pointer text-center"
                            >
                                Next
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}