<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductCreateRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    public function index()
    {
        Gate::authorize('view', 'roles');

        $products = Product::paginate();

        return ProductResource::collection($products);
    }

    public function show($id)
    {
        Gate::authorize('view', 'roles');

        return new ProductResource(Product::find($id));
    }

    public function store(ProductCreateRequest $request)
    {
        Gate::authorize('edit', 'roles');

        $product = Product::create($request->only('title','description','image','price'));

        return response($product, Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        Gate::authorize('edit', 'roles');

        $product = Product::find($id);

        $product->update($request->only('title','description','image','price'));

        return response($product, Response::HTTP_CREATED);
    }

    public function destroy($id)
    {
        Gate::authorize('edit', 'roles');

        Product::destroy($id);

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
