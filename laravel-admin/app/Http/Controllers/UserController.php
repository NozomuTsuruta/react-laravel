<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserCreateRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * @OA\Get(path="/users",
     *  security={{"bearerAuth":{}}},
     *  @OA\Response(response="200",
     *      description="User Controller",
     *  ),
     *  @OA\Parameter(
     *    name="page",
     *    description="Pagination page",
     *    in="query",
     *    @OA\Schema(
     *      type="integer"
     *    )
     *  )
     * )
     */
    public function index()
    {
        Gate::authorize('view','users');

        $users = User::paginate();

        return UserResource::collection($users);
    }

    /**
     * @OA\Get(path="/users/{id}",
     *  security={{"bearerAuth":{}}},
     *  @OA\Response(response="200",
     *      description="User",
     *  ),
     *  @OA\Parameter(
     *    name="id",
     *    description="User ID",
     *    in="path",
     *    required=true,
     *    @OA\Schema(
     *      type="integer"
     *    )
     *  )
     * )
     */

    public function show($id)
    {
        Gate::authorize('view','users');

        $user = User::find($id);

        return new UserResource($user);
    }

    /**
     * @OA\Post(
     *  path="/users",
     *  security={{"bearerAuth":{}}},
     *  @OA\Response(response="201",
     *      description="User Create",
     *  ),
     *  @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(ref="#/components/schemas/UserCreateRequest")
     *  )
     * )
     */

    public function store(UserCreateRequest $request)
    {
        Gate::authorize('edit','users');

        $user = User::create($request->only('first_name', 'last_name', 'email', 'role_id')+[
            'password'=>Hash::make(1234),
        ]);

        return response(new UserResource($user), Response::HTTP_CREATED);
    }

    /**
     * @OA\Put(
     *  path="/users/{id}",
     *  security={{"bearerAuth":{}}},
     *  @OA\Response(response="202",
     *      description="User Update",
     *  ),
     *  @OA\Parameter(
     *    name="id",
     *    description="User ID",
     *    in="path",
     *    required=true,
     *    @OA\Schema(
     *      type="integer"
     *    )
     *  ),
     *  @OA\RequestBody(
     *     required=true,
     *     @OA\JsonContent(ref="#/components/schemas/UserUpdateRequest")
     *  )
     * )
     */

    public function update(UserUpdateRequest $request, $id)
    {
        Gate::authorize('edit','users');

        $user = User::find($id);

        $user->update($request->only('first_name', 'last_name', 'email', 'role_id'));

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    /**
     * @OA\Delete(
     *  path="/users/{id}",
     *  security={{"bearerAuth":{}}},
     *  @OA\Response(response="204",
     *      description="User Delete",
     *  ),
     *  @OA\Parameter(
     *    name="id",
     *    description="User ID",
     *    in="path",
     *    required=true,
     *    @OA\Schema(
     *      type="integer"
     *    )
     *  )
     * )
     */

    public function destroy($id)
    {
        Gate::authorize('edit','users');

        User::destroy($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function user()
    {
        $user = \Auth::user();

        return (new UserResource($user))->additional([
            'data'=>[
                'permissions'=>$user->permissions()
            ]
        ]);
    }

    public function updateInfo(UpdateInfoRequest $request)
    {
        $user = \Auth::user();

        $user->update($request->only('first_name', 'last_name', 'email'));

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = \Auth::user();

        $user->update(['password'=>Hash::make($request->only('password'))]);

        return response(new UserResource($user), Response::HTTP_ACCEPTED);
    }
}
