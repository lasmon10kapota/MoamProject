<?php

namespace App\Http\Controllers;

use App\Models\Minibus;
use App\Http\Requests\StoreMinibusRequest;
use App\Http\Requests\UpdateMinibusRequest;

class MinibusController extends Controller
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMinibusRequest $request)
    {
        $user = auth()->user();
        $path = null;
        if ($request->hasFile('ownership_proof')) {
            $path = $request->file('ownership_proof')->store('OwnershipProofUploads', 'public');
        }
        $minibus = $user->minibuses()->create([
            'number_plate' => $request->number_plate,
            'assigned_route' => $request->assigned_route,
            'proof_of_ownership' => $path,
        ]);
        $user->registration_step = 'makePayment';
        $user->save();
        return to_route('makePayment')->with('message', 'Minibus details saved successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Minibus $minibus)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Minibus $minibus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMinibusRequest $request, Minibus $minibus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Minibus $minibus)
    {
        //
    }
}
