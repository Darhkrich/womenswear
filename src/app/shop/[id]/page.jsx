'use client';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, Check, Heart, ShoppingBag, Minus, Plus, ChevronRight } from 'lucide-react';

// Helper to render stars based on a rating (0-5)
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} fill="#facc15" color="#facc15" />
      ))}
      {hasHalf && (
        <div className="relative">
          <Star size={16} fill="none" color="#facc15" />
          <div className="absolute inset-0 overflow-hidden w-[50%]">
            <Star size={16} fill="#facc15" color="#facc15" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} fill="none" color="#d1d5db" />
      ))}
    </div>
  );
};

export default function ProductDetail() {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return notFound();
  }

  // Dynamic rating based on product id (between 4.0 and 5.0)
  const rating = 4 + (product.id % 10) / 10 + (product.id % 2 === 0 ? 0.5 : 0);
  const reviewCount = 20 + (product.id * 3);

  const isAccessory = product.category === 'Accessories';

  const handleAddToCart = () => {
    if (!selectedSize && !isAccessory) {
      alert('Please select a size');
      return;
    }
    const item = {
      ...product,
      selectedSize: selectedSize || 'One Size',
    };
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const increaseQty = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decreaseQty = () => setQuantity((prev) => Math.max(prev - 1, 1));

  // ✅ Deterministic related products – NO Math.random()
  // 1) Same category first (excluding current), sorted by ID ascending
  const sameCategory = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .sort((a, b) => a.id - b.id);
  // 2) Fallback: other products (excluding current), sorted by ID ascending
  const otherProducts = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => a.id - b.id);
  // Combine, take up to 3
  const relatedProducts = [...sameCategory, ...otherProducts].slice(0, 3);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href="/shop" className="hover:text-gray-900 transition">Shop</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Section */}
          <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm relative group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <button
              onClick={() => setIsWishlist(!isWishlist)}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition"
              aria-label="Add to wishlist"
            >
              <Heart
                size={20}
                className={isWishlist ? 'fill-rose-600 text-rose-600' : 'text-gray-700'}
              />
            </button>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-center">
            <p className="text-gray-500 text-sm tracking-widest mb-2">
              {product.category.toUpperCase()}
            </p>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-medium text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </p>

            <div className="flex items-center mb-6">
              {renderStars(rating)}
              <span className="ml-2 text-sm text-gray-500">
                ({reviewCount} reviews)
              </span>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description} Cut from premium materials, this piece embodies
              sophistication and comfort. Designed for the modern woman who values
              timeless elegance.
            </p>

            {/* Size Selector */}
            {!isAccessory ? (
              <div className="mb-8">
                <span className="text-sm font-medium text-gray-900">Select Size</span>
                <div className="grid grid-cols-4 gap-3 mt-2">
                  {['XS', 'S', 'M', 'L'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm font-medium border transition
                        ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-200 text-gray-900 hover:border-black'
                        }
                      `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <span className="text-sm font-medium text-gray-900">Size</span>
                <p className="mt-1 text-gray-600 text-sm">One Size</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <span className="text-sm font-medium text-gray-900">Quantity</span>
              <div className="flex items-center mt-2 border border-gray-200 rounded-sm w-32">
                <button
                  onClick={decreaseQty}
                  disabled={quantity <= 1}
                  className="p-2 text-gray-600 hover:text-black transition disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={increaseQty}
                  className="p-2 text-gray-600 hover:text-black transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full py-4 px-8 font-medium text-base transition flex items-center justify-center gap-2
                ${added
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-900 text-white hover:bg-gray-800'}
              `}
            >
              {added ? (
                <>
                  <Check size={20} /> Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag size={20} /> Add to Bag
                </>
              )}
            </button>

            {/* Perks */}
            <div className="mt-8 space-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" /> Free shipping on orders over $150
              </div>
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600" /> 30-day return policy
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-10 border-t pt-8">
              <div className="flex border-b space-x-6">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-2 text-sm font-medium transition-all ${
                    activeTab === 'description'
                      ? 'border-b-2 border-black text-black'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 text-sm font-medium transition-all ${
                    activeTab === 'shipping'
                      ? 'border-b-2 border-black text-black'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Shipping & Returns
                </button>
              </div>
              <div className="py-4 text-sm text-gray-600 leading-relaxed">
                {activeTab === 'description' ? (
                  <p>{product.description} Expertly crafted and ethically sourced. Pair it with our curated accessories for a complete look.</p>
                ) : (
                  <div className="space-y-2">
                    <p>Free standard shipping on orders over $150.</p>
                    <p>Express delivery available at checkout.</p>
                    <p>Returns accepted within 30 days of delivery. Items must be unworn with tags attached.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        <section className="mt-20">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                href={`/shop/${related.id}`}
                className="group block"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 mb-4">
                  <img
                    src={related.image}
                    alt={related.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
                  {related.name}
                </h3>
                <p className="text-sm text-gray-500">${related.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}