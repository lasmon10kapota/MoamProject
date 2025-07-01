<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RegisteredUserController extends Controller
{
    public function index(): Response
    {
        $users = User::with('roles')->get();
        $user = auth()->user();
        return Inertia::render('userManagement/index-user', [
            'users' => $users,
            'userRoles' => $user ? $user->roles->pluck('name')->toArray() : [],
        ]);
    }

    public function show(User $user): Response
    {
        $user->load('roles');
        $currentUser = auth()->user();
        return Inertia::render('userManagement/show-user', [
            'user' => $user,
            'userRoles' => $currentUser ? $currentUser->roles->pluck('name')->toArray() : [],
        ]);
    }

    public function create(): Response
    {
        $allRoles = Role::pluck('name')->toArray();
        $roles = array_values(array_intersect($allRoles, [
            'association manager',
            'association clerk',
            'minibus owner',
            'system admin',
        ]));
        $user = auth()->user();
        return Inertia::render('userManagement/create-user', [
            'roles' => $roles,
            'userRoles' => $user ? $user->roles->pluck('name')->toArray() : [],
        ]);
    }

    public function storeUser(Request $request): RedirectResponse
    {

        $validationRules = [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|string',

            'district' => 'required|string|max:255',
            'village' => 'string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone_number' => [
                'required',
                'unique:' . User::class,
                'string',
                function ($attribute, $value, $fail) {
                    if (!preg_match('/^(?:\\+265|0)[89]\\d{8}$/', $value)) {
                        $fail('The ' . preg_replace('/_/', ' ', $attribute) . ' is invalid.');
                    }
                }
            ],
            'password' => ['required', 'confirmed', \Illuminate\Validation\Rules\Password::defaults()],
            'role' => 'required|string|exists:roles,name',
        ];
        if ($request->role === 'minibus owner') {
            $validationRules['commitment'] = 'required';
        }
        $request->validate($validationRules);
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,

            'district' => $request->district,
            'village' => $request->village,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
            'commitment' => $request->role === 'minibus owner' ? $request->commitment : null,
        ]);
        $user->assignRole($request->role);
        return redirect()->route('admin.users')->with('message', 'User created successfully!');
    }

    public function edit(User $user): Response
    {
        $user->load('roles');
        $allRoles = Role::pluck('name')->toArray();
        $roles = array_values(array_intersect($allRoles, [
            'association manager',
            'association clerk',
            'minibus owner',
            'system admin',
        ]));
        $currentUser = auth()->user();
        return Inertia::render('userManagement/edit-user', [
            'user' => $user,
            'roles' => $roles,
            'userRoles' => $currentUser ? $currentUser->roles->pluck('name')->toArray() : [],
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $validatedData = $request->validated();

        // Only update fields that were provided in the request
        foreach ($validatedData as $field => $value) {
            if ($field === 'role')
                continue; // Don't set role as a user column
            if ($request->has($field)) {
                $user->$field = $value;
            }
        }

        $wasChanged = $user->isDirty();

        if ($wasChanged) {
            $user->save();

            // Handle role assignment
            if ($request->has('role')) {
                $user->syncRoles([$request->role]);
            }

            return redirect()->route('admin.users.show', $user)->with([
                'message' => 'User updated successfully!',
                'flashId' => now()->timestamp,
            ]);
        } else {
            return redirect()->route('admin.users.show', $user)->with([
                'message' => 'No changes were made',
                'flashId' => now()->timestamp,
            ]);
        }
    }

    public function destroy(User $user): RedirectResponse
    {
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.users')->with('error', 'You cannot delete your own account.');
        }
        if ($user->hasRole('system admin')) {
            $adminCount = User::role('system admin')->count();
            if ($adminCount <= 1) {
                return redirect()->route('admin.users')->with('error', 'Cannot delete the last system admin.');
            }
        }
        $userName = $user->first_name . ' ' . $user->last_name;
        $user->delete();
        return redirect()->route('admin.users')->with('message', "User '{$userName}' has been deleted successfully.");
    }

    public function archive(User $user): RedirectResponse
    {
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.users')->with('error', 'You cannot archive your own account.');
        }
        if ($user->hasRole('system admin')) {
            $adminCount = User::role('system admin')->whereNull('archived_at')->count();
            if ($adminCount <= 1) {
                return redirect()->route('admin.users')->with('error', 'Cannot archive the last system admin.');
            }
        }
        $user->archive();
        $userName = $user->first_name . ' ' . $user->last_name;
        return redirect()->route('admin.users')->with('message', "User '{$userName}' has been archived successfully.");
    }

    public function unarchive(User $user): RedirectResponse
    {
        $user->unarchive();
        $userName = $user->first_name . ' ' . $user->last_name;
        return redirect()->route('admin.users')->with('message', "User '{$userName}' has been unarchived successfully.");
    }
}