<?php

namespace App\Http\Controllers;

use App\Models\Minibus;
use App\Http\Requests\StoreMinibusRequest;
use App\Http\Requests\UpdateMinibusRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class MinibusController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Get the authenticated user's role name
     */
    private function getUserRole()
    {
        $user = auth()->user();
        return $user ? $user->roles->first()?->name : null;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        if (!$user) {
            return redirect()->route('login');
        }

        $query = Minibus::with([
            'user',
            'ownershipHistory' => function ($query) {
                $query->where('transfer_type', '!=', 'external');
            }
        ]);

        if ($user->hasRole('association clerk')) {
            // Association clerk can see all minibuses
            $minibuses = $query->get();
        } else {
            // Other users can only see non-archived minibuses
            $minibuses = $query->where('archived', false)->get();
        }

        // Add internal transfer count to each minibus
        $minibuses = $minibuses->map(function ($minibus) {
            $minibus->internal_transfers_count = $minibus->ownershipHistory->count();
            return $minibus;
        });

        return Inertia::render('MinibusManagement/index-minibus', [
            'minibuses' => $minibuses,
            'userRole' => $this->getUserRole(),
            'auth' => [
                'user' => $user,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!auth()->user()) {
            return redirect()->route('login');
        }

        return Inertia::render('MinibusManagement/create-minibus', [
            'users' => User::role('minibus owner')->get(),
            'userRole' => $this->getUserRole(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMinibusRequest $request)
    {
        $user = auth()->user();
        if (!$user) {
            return redirect()->route('login');
        }

        $ownerId = $user->hasRole('association clerk') ? $request->owner_id : $user->id;
        $minibus = Minibus::create([
            'number_plate' => $request->number_plate,
            'assigned_route' => $request->assigned_route,
            'user_id' => $ownerId,
        ]);
        return redirect()->route('minibuses.index')->with('message', 'Minibus details saved successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Minibus $minibus)
    {
        if (!auth()->user()) {
            return redirect()->route('login');
        }

        $minibus->load('user');
        $minibus->refresh();

        return Inertia::render('MinibusManagement/show-minibus', [
            'minibus' => $minibus,
            'userRole' => $this->getUserRole(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Minibus $minibus)
    {
        if (!auth()->user()) {
            return redirect()->route('login');
        }

        // Ensure we have the latest data including the archived status
        $minibus->load('user');
        $minibus->refresh();

        return Inertia::render('MinibusManagement/edit-minibus', [
            'minibus' => array_merge($minibus->toArray(), [
                'archived' => (bool) $minibus->archived,
            ]),
            'users' => User::role('minibus owner')
                ->notArchived()
                ->select('id', 'first_name', 'last_name', 'email')
                ->orderBy('first_name')
                ->get(),
            'userRole' => $this->getUserRole(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMinibusRequest $request, Minibus $minibus)
    {
        $user = auth()->user();
        if (!$user) {
            return redirect()->route('login');
        }

        $this->authorize('update', $minibus);

        $data = $request->only(['number_plate', 'assigned_route']);

        // Handle owner update for association clerks
        if ($user->hasRole('association clerk')) {
            if ($request->has('owner_id')) {
                $data['user_id'] = $request->owner_id;
                // If setting a new owner, ensure the minibus is not archived
                if ($request->owner_id && $minibus->archived) {
                    $data['archived'] = false;
                }
            }
        }

        $minibus->update($data);

        return redirect()->route('minibuses.show', $minibus)
            ->with('success', 'Minibus updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Minibus $minibus)
    {
        if (!auth()->user()) {
            return redirect()->route('login');
        }

        $this->authorize('delete', $minibus);
        $minibus->delete();
        return redirect()->route('minibuses.index')->with('message', 'Minibus deleted successfully.');
    }

    public function archive(Minibus $minibus)
    {
        if (!auth()->user()) {
            return redirect()->route('login');
        }

        $this->authorize('archive', $minibus);
        $minibus->update(['archived' => true]);
        return redirect()->back()->with('success', 'Minibus archived successfully.');
    }

    public function unarchive(Minibus $minibus)
    {
        if (!auth()->user()) {
            return redirect()->route('login');
        }

        $this->authorize('unarchive', $minibus);
        $minibus->update(['archived' => false]);
        return redirect()->back()->with('success', 'Minibus unarchived successfully.');
    }
}
