<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth' => function () {
                $user = auth()->user();
                if (!$user) {
                    return ['user' => null];
                }
                
                try {
                    $roles = $user->roles()->pluck('name')->toArray();
                    \Log::info('User roles loaded:', ['user_id' => $user->id, 'roles' => $roles]);
                } catch (\Exception $e) {
                    $roles = [];
                    \Log::error('Error loading user roles:', ['user_id' => $user->id, 'error' => $e->getMessage()]);
                }
                
                return [
                    'user' => [
                        'id' => $user->id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'email' => $user->email,
                        'roles' => $roles,
                    ],
                ];
            },
        ]);
    }
}
