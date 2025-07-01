import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';

export default function RegisterMinibus() {
    const { data, setData, post, processing, errors } = useForm({
        number_plate: '',
        assigned_route: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('create-user'));
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
                        <div className='bg-gray w-full border rounded-md p-4'>
                            <Progress value={50} />
                        </div>
                    </div>
                    <h1 className='font-bold text-center text-gray-500'>Register Your Minibus Details</h1>
                    <form onSubmit={submit} className="flex flex-col gap-6 border-1 p-5 rounded-md bg-gray-500">
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="number_plate" className="text-white">Number Plate</Label>
                            <Input
                                id="number_plate"
                                type="text"
                                autoFocus
                                autoComplete="number_plate"
                                placeholder="eg. DZ 4536"
                                className='placeholder:text-gray-400 text-gray-300'
                                value={data.number_plate}
                                onChange={handleChange}
                                disabled={processing}
                            />
                            <InputError message={errors.number_plate} className="bg-white" />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="assigned_route" className="text-white">Assigned route</Label>
                            <Input
                                id="assigned_route"
                                type="text"
                                autoFocus
                                autoComplete="assigned_route"
                                placeholder="eg. Mzomba-to-Blantyre"
                                className='placeholder:text-gray-400 text-gray-300'
                                value={data.assigned_route}
                                onChange={handleChange}
                                disabled={processing}
                            />
                            <InputError message={errors.assigned_route} className="bg-white" />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="ownership_proof" className="text-white">Proof of ownership</Label>
                            <Input
                                id="ownership_proof"
                                type="file"
                                accept="image/*"
                                autoFocus
                                className='file:text-gray-400'
                                onChange={handleChange}
                                disabled={processing}
                            />
                            <InputError message={errors.ownership_proof} className="bg-white" />
                        </div>
                        <div className="flex gap-2 items-center justify-between bg-gray-400 p-1 rounded-md">
                            <Button type="submit" className="flex-1 bg-blue-400 hover:bg-blue-500" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {processing ? 'Registering...' : 'Register'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}