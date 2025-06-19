import { Head, Link } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function registerMinibusOwner() {

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
                        <div className='bg-white border-none w-full p-1'>
                            <h1 className='font-bold text-center text-gray-500'>Provide the necessary details to make your payment</h1>
                        </div>
                    </div>

                    <form className="flex flex-col gap-4 border-1 p-5 rounded-md bg-gray-500">
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
                            <Label htmlFor="amount" className="text-white">Amount</Label>
                            <Input
                                id="amount"
                                type="text"
                                required
                                autoFocus
                                tabIndex={5}
                                autoComplete="amount"
                                //value={data.email}
                                //onChange={(e) => setData('phone', e.target.value)}
                                placeholder="2500"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="purpose" className="text-white">Purpose of transaction</Label>
                            <Input
                                id="purpose"
                                type="text"
                                required
                                autoFocus
                                tabIndex={5}
                                autoComplete="Purpose"
                                //value={data.email}
                                //onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Registration or Affiliation or ..."
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                        </div>
                        <div className="flex gap-2 items-center justify-end rounded-md">
                            <Button type="submit" className="w-[50%] text-[darkslateblue] bg-green-200 hover:bg-green-300 cursor-pointer" tabIndex={4}>Send</Button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}