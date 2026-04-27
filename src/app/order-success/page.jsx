'use client';
import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || 'N/A';
  const total = searchParams.get('total') || '0.00';

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white">
      <div className="max-w-lg mx-auto text-center px-4 py-16">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={36} className="text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-2">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <div className="bg-gray-50 p-6 rounded-sm mt-8 space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-gray-500">Order Number:</span>
            <span className="font-medium text-gray-900">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Total Paid:</span>
            <span className="font-medium text-gray-900">GH₵{total}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Email Confirmation:</span>
            <span className="font-medium text-gray-900">Sent to your email</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-sm text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-sm text-white bg-black hover:bg-gray-800 transition gap-2"
          >
            Back to Home <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading order details...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}