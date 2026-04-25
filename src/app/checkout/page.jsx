'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'momo'
  const [momoNumber, setMomoNumber] = useState('');
  const [momoProvider, setMomoProvider] = useState('mtn');

  const shippingCost = cartTotal >= 150 ? 0 : 15; // free over $150
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shippingCost + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call to backend
    setTimeout(() => {
      // Generate a fake order number
      const orderNumber = `LUM-${Date.now().toString(36).toUpperCase()}`;
      // Clear the cart
      clearCart();
      // Redirect to success page with order info
      router.push(`/order-success?order=${orderNumber}&total=${finalTotal.toFixed(2)}`);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif mb-4">Your bag is empty</h2>
        <Link href="/shop" className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold mb-10 text-center">Checkout</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Left Column: Forms */}
        <section className="lg:col-span-7 bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
          <form onSubmit={handlePlaceOrder}>
            <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h2>

            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First name</label>
                <input required type="text" className="mt-1 block w-full border-gray-300 border p-2 rounded-sm focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last name</label>
                <input required type="text" className="mt-1 block w-full border-gray-300 border p-2 rounded-sm focus:ring-black focus:border-black" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input required type="text" className="mt-1 block w-full border-gray-300 border p-2 rounded-sm focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input required type="text" className="mt-1 block w-full border-gray-300 border p-2 rounded-sm focus:ring-black focus:border-black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Postal code</label>
                <input required type="text" className="mt-1 block w-full border-gray-300 border p-2 rounded-sm focus:ring-black focus:border-black" />
              </div>
            </div>

            <h2 className="text-lg font-medium text-gray-900 mt-10 mb-6">Payment Method</h2>
            <div className="space-y-4">
              {/* Card Payment */}
              <div
                className={`border p-4 rounded-sm cursor-pointer transition ${
                  paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment-type"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="ml-3 block text-sm font-medium text-gray-700">
                    Credit Card (Powered by Stripe)
                  </span>
                </label>
              </div>

              {/* Mobile Money */}
              <div
                className={`border p-4 rounded-sm cursor-pointer transition ${
                  paymentMethod === 'momo' ? 'border-black bg-gray-50' : 'border-gray-200'
                }`}
                onClick={() => setPaymentMethod('momo')}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="payment-type"
                    checked={paymentMethod === 'momo'}
                    onChange={() => setPaymentMethod('momo')}
                    className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                  />
                  <span className="ml-3 block text-sm font-medium text-gray-700">
                    Mobile Money (MoMo)
                  </span>
                </label>

                {paymentMethod === 'momo' && (
                  <div className="mt-4 pl-7 space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Provider
                      </label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setMomoProvider('mtn')}
                          className={`px-4 py-2 text-sm rounded-sm border ${
                            momoProvider === 'mtn'
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 text-gray-700 hover:border-black'
                          }`}
                        >
                          MTN
                        </button>
                        <button
                          type="button"
                          onClick={() => setMomoProvider('airtel')}
                          className={`px-4 py-2 text-sm rounded-sm border ${
                            momoProvider === 'airtel'
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 text-gray-700 hover:border-black'
                          }`}
                        >
                          Airtel
                        </button>
                        <button
                          type="button"
                          onClick={() => setMomoProvider('vodafone')}
                          className={`px-4 py-2 text-sm rounded-sm border ${
                            momoProvider === 'vodafone'
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 text-gray-700 hover:border-black'
                          }`}
                        >
                          Vodafone
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        MoMo Phone Number
                      </label>
                      <input
                        type="tel"
                        required={paymentMethod === 'momo'}
                        placeholder="e.g. +233 24 123 4567"
                        value={momoNumber}
                        onChange={(e) => setMomoNumber(e.target.value)}
                        className="block w-full border-gray-300 border p-2 rounded-sm focus:ring-black focus:border-black"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* PayPal (coming soon) */}
              <div className="border border-gray-200 p-4 rounded-sm opacity-50 cursor-not-allowed">
                <label className="flex items-center">
                  <input
                    type="radio"
                    disabled
                    className="h-4 w-4 text-black border-gray-300"
                  />
                  <span className="ml-3 block text-sm font-medium text-gray-700">
                    PayPal (Coming Soon)
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="mt-8 w-full bg-gray-900 border border-transparent py-4 px-4 text-white font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {isProcessing
                ? 'Processing...'
                : `Pay $${finalTotal.toFixed(2)}`}
            </button>
          </form>
        </section>

        {/* Right Column: Order Summary */}
        <section className="lg:col-span-5 mt-10 lg:mt-0 bg-gray-50 p-6 rounded-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={`${item.id}-${item.selectedSize}`} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p>${item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    {item.selectedSize && <p className="mt-1 text-sm text-gray-500">Size: {item.selectedSize}</p>}
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 pt-6 mt-6 space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <p>Subtotal</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <p>Shipping</p>
              <p>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <p>Tax (8%)</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 border-t border-gray-200 pt-4">
              <p>Total</p>
              <p>${finalTotal.toFixed(2)}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}