<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
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
        Log::info("Tracking Middleware"." ".$request->user());
        if ($request->user()) {
            $expiresAt = now()->addMinutes(5); 

            Cache::put('user-online-' . $request->user()->id, true, $expiresAt);
        }

        return $next($request);
    }
}