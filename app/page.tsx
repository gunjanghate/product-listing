import ProductCard from "@/components/ProductCard";
import { ShoppingBag, Package, Filter, Search } from "lucide-react";

async function getProducts() {
  try {
    const res = await fetch(`http://localhost:3000/api/products`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`Failed to fetch products: ${res.status} ${res.statusText}`);
      return [];
    }
    return await res.json();
  } catch (error: any) {
    console.error("Unexpected error fetching products:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingBag className="h-10 w-10 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Our Products</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our curated collection of premium products designed to enhance your lifestyle
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">
                {products.length === 0 ? "No products" : `${products.length} ${products.length === 1 ? 'Product' : 'Products'} Available`}
              </span>
            </div>

          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                We're currently updating our inventory. Please check back soon for exciting new products!
              </p>
              <div className="flex justify-center">
                <button
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  disabled
                >
                  Notify Me When Available
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {products.length > 0 && (
              <div className="relative">
                <div className="absolute -top-4 left-6 z-10">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    Featured Products
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <div key={product._id} className="transform hover:scale-105 transition-transform duration-200">
                  <ProductCard
                    name={product.name}
                    image={product.image}
                    description={product.description}
                    price={product.price}
                  />
                </div>
              ))}
            </div>

            {products.length >= 8 && (
              <div className="text-center pt-8">
                <button
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium"
                  disabled
                >
                  Load More Products
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}