<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectBasedOnRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            $user = auth()->user();

            // If user has minibus owner role, redirect based on registration_step
            if ($user->hasRole('minibus owner')) {
                switch ($user->registration_step) {
                    case 'minibus':
                        return redirect()->route('registerMinibus');
                    case 'driver':
                        return redirect()->route('registerDriver');
                    case 'review':
                        return redirect()->route('reviewRegInfor');
                    default:
                        return redirect()->route('memberReg.registerOwner');
                }
            }

            // For all other roles, redirect to dashboard
            if ($request->is('/')) {
                return redirect()->route('dashboard');
            }
        }

        return $next($request);
    }
}