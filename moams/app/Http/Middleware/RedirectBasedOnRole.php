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
            
            // If user has registering member role, redirect to registerOwner page
            if ($user->hasRole('registering member')) {
                return redirect()->route('memberReg.registerOwner');
            }
            
            // For all other roles, redirect to dashboard
            if ($request->is('/')) {
                return redirect()->route('dashboard');
            }
        }

        return $next($request);
    }
} 