<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class PrivatelyUserController extends Controller
{
    /**
     * Show the user management dashboard.
     */
    public function index(): Response
    {
        $users = User::with('roles')->get();
        $user = auth()->user();
        
        return Inertia::render('userManagement/index-user', [
            'users' => $users,
            'userRoles' => $user ? $user->roles->pluck('name')->toArray() : [],
        ]);
    }

    /**
     * Show individual user details.
     */
    public function show(User $user): Response
    {
        $user->load('roles');
        $currentUser = auth()->user();
        
        return Inertia::render('userManagement/show-user', [
            'user' => $user,
            'userRoles' => $currentUser ? $currentUser->roles->pluck('name')->toArray() : [],
        ]);
    }

    /**
     * Show the private user creation page.
     */
    public function create(): Response
    {
        $roles = Role::pluck('name')->toArray();
        $user = auth()->user();
        
        return Inertia::render('userManagement/create-user', [
            'roles' => $roles,
            'userRoles' => $user ? $user->roles->pluck('name')->toArray() : [],
        ]);
    }

    /**
     * Handle private user creation.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeUser(Request $request): RedirectResponse
    {
        $validationRules = [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|string',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'phone_number' => [
                'required',
                'unique:' . User::class,
                'string',
                function ($attribute, $value, $fail) {
                    if (!preg_match('/^(?:\+265|0)[89]\d{8}$/', $value)) {
                        $fail('The ' . preg_replace('/_/', ' ', $attribute) . ' is invalid.');
                    }
                }
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|exists:roles,name',
        ];

        $request->validate($validationRules);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
        ]);

        // Assign the specified role
        $user->assignRole($request->role);

        return redirect()->route('admin.users')->with('message', 'User created successfully!');
    }

    /**
     * Show the edit user form.
     */
    public function edit(User $user): Response
    {
        $user->load('roles');
        $roles = Role::pluck('name')->toArray();
        $currentUser = auth()->user();
        
        return Inertia::render('userManagement/edit-user', [
            'user' => $user,
            'roles' => $roles,
            'userRoles' => $currentUser ? $currentUser->roles->pluck('name')->toArray() : [],
        ]);
    }

    /**
     * Update the user.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validationRules = [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|string',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class . ',email,' . $user->id,
            'phone_number' => [
                'required',
                'unique:' . User::class . ',phone_number,' . $user->id,
                'string',
                function ($attribute, $value, $fail) {
                    if (!preg_match('/^(?:\+265|0)[89]\d{8}$/', $value)) {
                        $fail('The ' . preg_replace('/_/', ' ', $attribute) . ' is invalid.');
                    }
                }
            ],
            'role' => 'required|string|exists:roles,name',
        ];

        $request->validate($validationRules);

        $user->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
        ]);

        // Update role
        $user->syncRoles([$request->role]);

        return redirect()->route('admin.users.show', $user)->with('message', 'User updated successfully!');
    }

    /**
     * Delete the user.
     */
    public function destroy(User $user): RedirectResponse
    {
        // Prevent deletion of the current user
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.users')->with('error', 'You cannot delete your own account.');
        }

        // Prevent deletion of the last system admin
        if ($user->hasRole('system admin')) {
            $adminCount = User::role('system admin')->count();
            if ($adminCount <= 1) {
                return redirect()->route('admin.users')->with('error', 'Cannot delete the last system admin.');
            }
        }

        $userName = $user->first_name . ' ' . $user->last_name;
        
        // Delete the user
        $user->delete();

        return redirect()->route('admin.users')->with('message', "User '{$userName}' has been deleted successfully.");
    }
} 