'use client';
import { Suspense } from 'react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';

// Inner component that uses useSearchParams
function ShopContent() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [filter, setFilter] = useState(initialCategory);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    if (addedId) {
      const timer = setTimeout(() => setAddedId(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [addedId]);

  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const filteredProducts =
    filter === 'All' ? products : products.filter((p) => p.category === filter);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Shop All</h1>
          <p className="mt-2 text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200 ${
              filter === cat
                ? 'bg-black text-white shadow-md'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative">
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 mb-4">
              <Link href={`/shop/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </Link>
              <div className="absolute inset-x-4 bottom-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={addedId === product.id}
                  className={`w-full py-2.5 text-sm font-medium backdrop-blur-sm rounded-sm transition-all duration-300 ${
                    addedId === product.id
                      ? 'bg-black text-white flex items-center justify-center gap-2'
                      : 'bg-white/80 text-black hover:bg-white hover:shadow-md'
                  } ${
                    addedId === product.id
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {addedId === product.id ? (
                    <>
                      <Check size={16} />
                      Added!
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </div>
            </div>
            <Link href={`/shop/${product.id}`}>
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm font-medium text-gray-900">GH₵{product.price.toFixed(2)}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">{product.category}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// Outer wrapper with Suspense
export default function Shop() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}