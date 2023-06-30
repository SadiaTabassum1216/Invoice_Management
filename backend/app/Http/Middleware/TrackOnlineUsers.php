<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class TrackOnlineUsers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::guard()->check()) {
            $userId = Auth::guard()->user()->id;
            Log::info("User ID: $userId");

            $expiresAt = now()->addMinutes(5);
            Cache::put('user-online-' . $userId, true, $expiresAt);
        } else {
            Log::info("Unauthorized user");
        }

        return $next($request);
    }
}