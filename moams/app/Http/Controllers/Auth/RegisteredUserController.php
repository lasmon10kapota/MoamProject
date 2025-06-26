<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RegisteredUserController extends Controller
{
    
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        $roles = [];
        
        // If admin is accessing registration, provide role options
        if (Auth::check() && Auth::user()->hasRole('system admin')) {
            $roles = Role::pluck('name');
        }
        
        return Inertia::render('auth/register', [
            'roles' => $roles,
            'isAdmin' => Auth::check() && Auth::user()->hasRole('system admin'),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // SECURITY: Remove role data from non-admin requests
        $isAdmin = Auth::check() && Auth::user()->hasRole('system admin');
        
        if (!$isAdmin) {
            // Remove role data from request to prevent tampering
            $request->merge(['role' => null]);
        }

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
        ];

        // Only add role validation if user is authenticated and is system admin
        if ($isAdmin) {
            $validationRules['role'] = 'required|string|exists:roles,name';
        }

        $request->validate($validationRules);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
        ]);

        // SECURITY: Only allow role assignment by authenticated system admins
        if ($isAdmin) {
            // Admin is creating user - assign specified role
            if ($request->filled('role')) {
                $user->assignRole($request->role);
            } else {
                // Default to registering member if no role specified
                $user->assignRole('registering member');
            }
        } else {
            // Public registration - ALWAYS assign registering member role, ignore any role data sent
            $user->assignRole('registering member');
        }

        event(new Registered($user));

        //Auth::login($user);

        // Redirect based on who created the user
        if ($isAdmin) {
            return redirect()->route('users')->with('message', 'User created successfully!');
        }

        return to_route('register')->with('message', 'Account creation successful! You can now log in.');
    }
}
