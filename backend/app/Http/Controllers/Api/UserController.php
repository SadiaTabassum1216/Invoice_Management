<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $userIds = User::pluck('id')->toArray();

        if ($userIds)
        {
            foreach($userIds as $userId)
            {
                if (Cache::get('user-online-'.$userId)){
                    User::where('id', $userId)->update(['status' => 'Online']);
                }
                else {
                    User::where('id', $userId)->update(['status' => 'Offline']);
                }
            }
        }
        $users = User::all();
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            // 'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'username' => 'required|unique:users',
            'status' => 'nullable|string',
            'roles' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::create([
            'name' => $request->input('name'),
            // 'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'username' => $request->input('username'),
            'status' => $request->input('status'),
        ])->assignRole($request->input('roles'));

        return response()->json(new UserResource($user), 201);
    }



    /**
     * Display the specified resource.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                "message" => "User not found"
            ], 404);
        }

        return response()->json(new UserResource($user));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            // 'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'required|min:8',
            'username' => 'required|unique:users,username,' . $id,
            'status' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $user->update([
            'name' => $request->input('name'),
            // 'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'username' => $request->input('username'),
            'status' => $request->input('status'),
        ]);
        $user->syncRoles($request->input('roles'));

        return response()->json(new UserResource($user));
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                "message" => "User not found"
            ], 404);
        }

        $user->delete();

        return response()->json([
            "message" => "User has been deleted"
        ], 200);
    }
}