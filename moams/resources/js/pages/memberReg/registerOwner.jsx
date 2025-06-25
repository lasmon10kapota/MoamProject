import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";


export default function registerOwner() {
    const { data, setData, post, processing, errors, reset } = useForm({
        district: '',
        village: '',
        national_id: null,
        num_of_vehicles: '',
    });

    const handleChange = (e) => {
        const { id, value, type, files } = e.target;
        setData(id, type === 'file' ? files[0] : value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('registerOwner'));
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
                            <Progress value={1} />
                        </div>
                    </div>

                    <h1 className='font-bold text-center text-gray-500'>Register Minibus Owner Details</h1>
                    <form onSubmit={submit} encType="multipart/form-data" className="flex flex-col gap-4 border-1 p-5 rounded-md bg-gray-500">

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
                            <InputError message={errors.district} className="bg-white" />
                        </div>
                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="village" className="text-white">Home village/town</Label>
                            <Input
                                id="village"
                                type="text"
                                autoFocus
                                tabIndex={2}
                                autoComplete="village"
                                value={data.village}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="e.g. Muwalo"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                            <InputError message={errors.village} className="bg-white" />
                        </div>

                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="national_id" className="text-white">National ID</Label>
                            <Input
                                id="national_id"
                                type="file"
                                accept="image/*"
                                autoFocus
                                tabIndex={5}
                                onChange={handleChange}
                                disabled={processing}
                                className='file:text-gray-400'
                            />
                            <InputError message={errors.national_id} className="bg-white" />
                        </div>

                        <div className="grid auto-rows-min gap-2 md:grid-cols-2">
                            <Label htmlFor="num_of_vehicles" className="text-white">Number of minibuses</Label>
                            <Input
                                id="num_of_vehicles"
                                type="text"
                                autoFocus
                                tabIndex={2}
                                autoComplete="num_of_vehicles"
                                value={data.num_of_vehicles}
                                onChange={handleChange}
                                disabled={processing}
                                placeholder="e.g. 3"
                                className='placeholder:text-gray-400 text-gray-300'
                            />
                            <InputError message={errors.num_of_vehicles} className="bg-white" />
                        </div>

                        <div className="flex gap-2 items-center justify-between p-1 rounded-md">
                            <Button type="submit" className="mt-4 w-[50%] bg-blue-400 hover:bg-blue-500" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Save
                            </Button>
                            <Link
                                href={route('registerMinibus')}
                                className="w-[50%] h-9 rounded-sm px-5 py-1.5 text-[darkslateblue] bg-blue-200 hover:bg-blue-300 cursor-pointer text-center"
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