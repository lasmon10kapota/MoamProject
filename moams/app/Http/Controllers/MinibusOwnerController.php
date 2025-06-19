<?php

namespace App\Http\Controllers;

use App\Models\MinibusOwner;
use App\Http\Requests\StoreMinibusOwnerRequest;
use App\Http\Requests\UpdateMinibusOwnerRequest;
use Illuminate\Container\Attributes\Storage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MinibusOwnerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('registerOwner');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMinibusOwnerRequest $request)
    {    //Uploading the image
        $path = null;
        if ($request->hasfile('national_id')) {
            $path = $request->file('national_id')->store('IdUploads', 'public');
        }
        $minibusOwner = MinibusOwner::create([
            'district' => $request->district,
            'village' => $request->village,
            'national_id' => $path,
            'num_of_vehicles' => $request->num_of_vehicles,
        ]);

        to_route('registerOwner');
    }

    /**
     * Display the specified resource.
     */
    public function show(MinibusOwner $minibusOwner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MinibusOwner $minibusOwner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMinibusOwnerRequest $request, MinibusOwner $minibusOwner)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MinibusOwner $minibusOwner)
    {
        //
    }
}
