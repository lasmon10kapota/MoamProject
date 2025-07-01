import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { usePage } from '@inertiajs/react';

export default function MakePayment() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        amount: '',
        purpose: 'registration',
    });

    const { flash } = usePage().props;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };

    const handlePurposeChange = (value) => {
        setData('purpose', value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('makePayment.store'));
    };

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
                    {flash && flash.message && (
                        <div className="bg-green-100 text-green-800 p-2 rounded text-center font-semibold">
                            {flash.message}
                        </div>
                    )}
                    <form onSubmit={submit} className="flex flex-col gap-4 border-1 p-5 rounded-md bg-gray-500">
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="email" className="text-white">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
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
                            <Label htmlFor="amount" className="text-white">Amount</Label>
                            <Input
                                id="amount"
                                type="text"
                                required
                                tabIndex={5}
                                autoComplete="amount"
                                value={data.amount}
                                onChange={handleChange}
                                placeholder="2500"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                            <InputError message={errors.amount} />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="purpose" className="text-white">Purpose of transaction</Label>
                            <Select id="purpose" value={data.purpose} onValueChange={handlePurposeChange} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select purpose" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="registration">Registration</SelectItem>
                                        <SelectItem value="affiliation">Affiliation</SelectItem>
                                        <SelectItem value="fine">Fine</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.purpose} />
                        </div>
                        <div className="flex gap-2 items-center justify-end rounded-md">
                            <Button type="submit" className="w-[50%] text-[darkslateblue] bg-green-200 hover:bg-green-300 cursor-pointer" tabIndex={4} disabled={processing}>Send</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}