<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserRoleController extends Controller
{
    // List all users with their current role
    public function index()
    {
        $users = User::with('roles')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'gender' => $user->gender,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'role' => $user->roles->pluck('name')->first(), // Only one role
            ];
        });
        return Inertia::render('RoleManagement', [
            'users' => $users,
        ]);
    }

    // List all available roles
    public function roles()
    {
        $roles = Role::pluck('name');
        return response()->json($roles);
    }

    // Assign a single role to a user
    public function update(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|exists:roles,name',
        ]);
        // Remove all roles and assign the new one
        $user->syncRoles([$request->role]);
        return redirect()->back()->with('success', 'Role updated successfully.');
    }

    // Debug method to check user roles
    public function debug()
    {
        $user = auth()->user();
        $roles = $user ? $user->getRoleNames() : collect();
        
        return response()->json([
            'user_id' => $user ? $user->id : null,
            'user_email' => $user ? $user->email : null,
            'roles' => $roles->toArray(),
            'has_system_admin' => $user ? $user->hasRole('system admin') : false,
        ]);
    }
} 