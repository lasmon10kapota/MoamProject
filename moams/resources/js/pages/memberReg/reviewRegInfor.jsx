import { Head, Link, usePage } from '@inertiajs/react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
//import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"


export default function reviewRegInfor() {


    /*const submit = (e) => {
        e.preventDefault();
    }*/

    return (
        <>
            <Head title="Reg">
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
                            <Progress value={75} />
                        </div>
                    </div>
                    <h1 className='font-bold text-center text-gray-500'>Verify whether the information you provided is correct before you submit</h1>
                    <div className='flex flex-col bg-white gap-2 p-2 sm:p-5'>
                        <div className='border-1 px-2 text-[clamp(0.8rem,1.5vw,1rem)] py-4 sm:px-10'>
                            <h1 className='font-bold text-center text-gray-700'>Minibus Owner Details</h1>
                            <p className='text-gray-600'>First name: </p>
                            <p className='text-gray-600'>Last name: </p>
                            <p className='text-gray-600'>Gender: </p>
                            <p className='text-gray-600'>Email: </p>
                            <p className='text-gray-600'>Phone number: </p>
                            <p className='text-gray-600'>Home district: </p>
                            <p className='text-gray-600'>National ID: </p>
                        </div>

                        <div className='border-1 px-2 text-[clamp(0.8rem,1.5vw,1rem)] py-4 sm:px-10'>
                            <h1 className='font-bold text-center text-gray-700'>Minibus Details</h1>
                            <p className='text-gray-600'>Number plate: </p>
                            <p className='text-gray-600'>Assigned route: </p>
                            <p className='text-gray-600'>Proof of ownership: </p>
                        </div>
                        <div className="flex my-2 items-center space-x-3">
                            <Checkbox
                                id="commitment"
                                name="commitment"
                                // checked={data.commitment}
                                // onClick={() => setData('commitment', !data.remember)}
                                tabIndex={3}
                                className="h-8 w-8"
                            />
                            <Label htmlFor="commitment" className="text-[clamp(0.8rem,1.5vw,0.9rem)] text-gray-600">By checking this box, I not only confirm that the provided details are correct and authentic but also promise to abibe by the constitution, rules and regulations of the Association.</Label>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center justify-between bg-gray-400 p-1 rounded-md">
                        <Link
                            href={route('registerMinibus')}
                            className="w-[40%] h-9 rounded-sm px-5 py-1.5 text-[darkslateblue] bg-gray-200 hover:bg-gray-300 cursor-pointer text-center"
                        >
                            Back
                        </Link>
                        {/* <Popover>
                            <PopoverTrigger asChild>
                                <Button className="w-20 text-[darkslateblue] bg-green-200 hover:bg-green-300 cursor-pointer">Submit</Button>
                            </PopoverTrigger>
                            <PopoverContent className="border-1 w-80 rounded-sm">
                                <div className='p-4'>
                                    <p className="mb-2 text-center text-gray-600 dark:text-white">
                                        Thank you for successfully submitting your registration details.
                                    </p>
                                    <p className="mb-2 text-center text-gray-600 dark:text-white">
                                        To complete the registration process, you need to pay the registration fee.
                                    </p>
                                    <p className="mb-2 text-center text-gray-600 dark:text-white">
                                        Click "Pay now" to make the payment right now or "Pay later" to do it later.
                                    </p>
                                </div>
                                <div className="flex gap-2 items-center p-1 rounded-md">
                                    <Link
                                        href={route('makePayment')}
                                        className="w-full h-9 rounded-sm px-5 py-1.5 text-[darkslateblue] bg-green-200 hover:bg-green-300 cursor-pointer text-center"
                                    >
                                        Pay now
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="w-full h-9 rounded-sm px-5 py-1.5 text-[darkslateblue] bg-gray-200 hover:bg-gray-300 cursor-pointer text-center"
                                    >
                                        Pay later
                                    </Link>
                                </div>
                            </PopoverContent>
                        </Popover>*/}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-[40%] text-[darkslateblue] bg-green-200 hover:bg-green-300 cursor-pointer">Submit</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogDescription>
                                        <div className='p-4'>
                                            <p className="mb-2 text-center text-gray-600 dark:text-white">
                                                Thank you for successfully submitting your registration details.
                                            </p>
                                            <p className="mb-2 text-center text-gray-600 dark:text-white">
                                                To complete the registration process, you need to pay the registration fee.
                                            </p>
                                            <p className="mb-2 text-center text-gray-600 dark:text-white">
                                                Click "Pay now" to make the payment right now or "Pay later" to do it later.
                                            </p>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>

                                <DialogFooter>
                                    <div className="flex w-full gap-2 items-center p-1 rounded-md">
                                        <Link
                                            href={route('makePayment')}
                                            className="w-full h-auto rounded-sm px-5 py-1.5 text-[darkslateblue] bg-green-200 hover:bg-green-300 cursor-pointer text-center"
                                        >
                                            Pay now
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="w-full h-auto rounded-sm px-5 py-1.5 text-[darkslateblue] bg-gray-200 hover:bg-gray-300 cursor-pointer text-center"
                                        >
                                            Pay later
                                        </Link>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div >

            </div >

        </>
    );
}
