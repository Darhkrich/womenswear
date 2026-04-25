'use client';
import { X, Trash2, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartSidebar() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useCart();

  const shippingThreshold = 150;
  const freeShipping = cartTotal >= shippingThreshold;

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar panel */}
      <div
        className={`absolute inset-y-0 right-0 max-w-full flex transition-transform duration-300 ease-in-out transform ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-serif font-medium text-gray-900">
              Shopping Bag
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                <ShoppingBag size={48} strokeWidth={1} />
                <p className="text-lg font-medium">Your bag is empty.</p>
                <p className="text-sm text-gray-400">Discover our collection</p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="py-5 flex">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="pr-2">{item.name}</h3>
                          <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="p-1 text-gray-600 hover:text-black transition disabled:opacity-50"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-2 text-gray-900 font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="p-1 text-gray-600 hover:text-black transition"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1 transition"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-6 py-6 bg-gray-50 space-y-4">
            {/* Shipping progress */}
            {cart.length > 0 && (
              <div className="text-sm">
                {freeShipping ? (
                  <p className="text-green-600 font-medium">
                    🎉 Congratulations! You’ve earned free shipping.
                  </p>
                ) : (
                  <p className="text-gray-600">
                    Spend{' '}
                    <span className="font-semibold text-black">
                      ${(shippingThreshold - cartTotal).toFixed(2)}
                    </span>{' '}
                    more for free shipping.
                  </p>
                )}
                {/* Progress bar */}
                <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black transition-all duration-500"
                    style={{
                      width: `${Math.min((cartTotal / shippingThreshold) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>

            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-gray-900 text-white py-3 px-6 flex items-center justify-center font-medium hover:bg-gray-800 transition"
            >
              Checkout
            </Link>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}