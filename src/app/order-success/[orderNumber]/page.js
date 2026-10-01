import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { CheckCircle2, Package, Truck, ArrowRight, MapPin, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function OrderSuccessPage({ params }) {
  await dbConnect();
  const order = await Order.findOne({ orderNumber: params.orderNumber }).lean();

  if (!order) {
    return (
      <div className="min-h-[70vh] bg-zinc-950 flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h1 className="text-2xl font-bold text-white">Order not found</h1>
        <Link href="/" className="text-amber-400 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  const steps = [
    { label: 'Confirmed', done: true },
    { label: 'Packed', done: ['Packed', 'Shipped', 'Out for Delivery', 'Delivered'].includes(order.orderStatus) },
    { label: 'Shipped', done: ['Shipped', 'Out for Delivery', 'Delivered'].includes(order.orderStatus) },
    { label: 'Out for Delivery', done: ['Out for Delivery', 'Delivered'].includes(order.orderStatus) },
    { label: 'Delivered', done: order.orderStatus === 'Delivered' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Success Banner */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
            Order Confirmed
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight">
            THANK YOU FOR SHOPPING <span className="text-amber-400">BONG99!</span>
          </h1>

          <p className="text-sm text-zinc-400 max-w-lg mx-auto">
            Your streetwear order has been logged into our fulfillment hub. We've sent your receipt and tracking link to{' '}
            <strong className="text-white">{order.customer.email}</strong>.
          </p>

          <div className="pt-2 text-xs font-mono text-zinc-500">
            ORDER ID: <span className="text-amber-400 font-bold">{order.orderNumber}</span>
          </div>
        </div>

        {/* Order Lifecycle Progress Tracker */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300">
            Delivery Lifecycle Status
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {steps.map((st, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    st.done
                      ? 'bg-amber-400 text-black shadow-md shadow-amber-400/30'
                      : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className={`text-xs font-semibold ${st.done ? 'text-white' : 'text-zinc-500'}`}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary & Customer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Details */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Delivery Address</span>
            </h3>
            <div className="text-xs text-zinc-300 space-y-1">
              <p className="font-bold text-white text-sm">{order.customer.name}</p>
              <p>{order.customer.address}</p>
              <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              <p className="pt-2 text-zinc-400">Phone: {order.customer.phone}</p>
              <p className="text-zinc-400">Payment: <span className="uppercase text-amber-400 font-bold">{order.paymentMethod}</span> ({order.paymentStatus})</p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Payment Summary
            </h3>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Coupon Discount</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
              </div>
              <div className="border-t border-zinc-800 pt-2 flex justify-between text-base font-bold text-white">
                <span>Total Paid / Due</span>
                <span className="text-amber-400 font-display text-xl">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Itemized Products */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Items in this Shipment ({order.items.length})
          </h3>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-zinc-800/60 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-zinc-950 flex-shrink-0">
                    <Image
                      src={item.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <p className="text-[11px] text-zinc-400">
                      Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-bold text-amber-400 font-display">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Return to shop */}
        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-amber-400/20"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
