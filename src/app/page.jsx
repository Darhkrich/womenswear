'use client';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { products } from '@/data/products';
import { useEffect, useRef, useState } from 'react';

// Fade-in on scroll hook (optional, for subtle entrance)
const useInView = (ref) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
};

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  // Unique categories for category section
  const categories = [...new Set(products.map((p) => p.category))];

  // Category images mapping (fallback)
  const categoryImages = {
    Dresses: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
    Knitwear: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600',
    Accessories: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=600',
    Bottoms: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=600',
    Outerwear: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
    Tops: 'https://images.unsplash.com/photo-1434389677669-e08b4cda5b13?auto=format&fit=crop&q=80&w=600',
    Shoes: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600',
  };

  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-60"
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1600"
            alt="Elegant boutique hero"
            loading="eager"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-extrabold tracking-tight sm:text-5xl lg:text-6xl animate-fade-in">
            Elegance is an Attitude
          </h1>
          <p className="mt-6 text-xl text-gray-100 max-w-3xl mx-auto">
            Discover our new Spring collection. Curated pieces for the modern woman.
          </p>
          <div className="mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 font-medium hover:bg-gray-100 transition group"
            >
              Shop Collection
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-sm font-medium text-rose-600 uppercase tracking-widest">
              New Arrivals
            </span>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mt-2">
              Trending Now
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-gray-600 hover:text-black flex items-center gap-1 group"
          >
            View all
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group cursor-pointer"
            >
              <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <h3 className="mt-4 text-base font-medium text-gray-900 group-hover:text-rose-600 transition-colors">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">GH₵{product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Shop by Category */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Find exactly what you’re looking for. Every piece tells a story.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/shop?category=${encodeURIComponent(category)}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={categoryImages[category] || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600'}
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-medium text-lg">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Promise */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="text-rose-600" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Curated Quality</h3>
            <p className="text-gray-500">
              Each piece is hand‑selected from artisans around the world, ensuring exceptional craftsmanship.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="text-rose-600" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Secure Payments</h3>
            <p className="text-gray-500">
              Shop with confidence. Your transactions are encrypted and protected with industry‑standard security.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <Truck className="text-rose-600" size={24} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Free Shipping Over $150</h3>
            <p className="text-gray-500">
              Enjoy complimentary shipping on all orders above GH₵150. Easy 30‑day returns.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Stay in the Loop</h2>
          <p className="text-gray-300 mb-8">
            Sign up for exclusive early access to new collections and special events.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 bg-white border border-transparent focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <button
              type="submit"
              className="bg-white text-gray-900 px-6 py-3 font-medium hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}