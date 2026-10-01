'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ArrowRight, Tag, Check, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    discount,
    totalAmount,
    coupon,
    couponError,
    couponLoading,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const ok = await applyCoupon(couponInput);
      if (ok) setCouponInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-zinc-950 flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-white font-display uppercase">
            YOUR BAG IS EMPTY
          </h1>
          <p className="text-sm text-zinc-400">
            Fresh Indian street styles start at just ₹99. Browse our plain tees, graphic prints, and bottom wear.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-amber-400/20"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight mb-8">
          YOUR SHOPPING BAG <span className="text-amber-400">({cartItems.length})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Items List Left */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-6 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all"
              >
                {/* Product Image */}
                <div className="relative w-full sm:w-32 h-44 rounded-2xl overflow-hidden bg-zinc-950 flex-shrink-0">
                  <Image
                    src={item.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-amber-400 text-black px-2.5 py-0.5 rounded-full font-black text-[10px] font-display">
                    ₹{item.price}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link href={`/product/${item.slug}`}>
                        <h3 className="text-base font-bold text-white hover:text-amber-400 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-zinc-400">
                      <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 font-semibold border border-zinc-700">
                        Size: {item.size}
                      </span>
                      <span>•</span>
                      <span>Color: {item.color}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-zinc-700 rounded-xl bg-zinc-800/80 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 hover:bg-zinc-700 text-zinc-300 font-bold"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1.5 text-xs font-bold text-white min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 hover:bg-zinc-700 text-zinc-300 font-bold"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total for this line item */}
                    <div className="text-right">
                      <div className="text-xl font-black text-amber-400 font-display">
                        ₹{item.price * item.quantity}
                      </div>
                      <div className="text-xs text-zinc-500 line-through">
                        ₹{item.originalPrice * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Right */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24">
              <h2 className="text-lg font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-3">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div>
                {coupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <Check className="w-4 h-4" />
                      <span>Coupon "{coupon.code}" active (-₹{discount})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-zinc-400 hover:text-white underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                      Have a Promo Code?
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <input
                          type="text"
                          placeholder="e.g. BONG99"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 uppercase focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={couponLoading || !couponInput.trim()}
                        className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
                      >
                        {couponLoading ? 'Checking...' : 'Apply'}
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-red-400">{couponError}</p>}
                  </form>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 text-xs text-zinc-400 border-t border-zinc-800 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="border-t border-zinc-800 pt-3 flex justify-between text-base font-black text-white">
                  <span>Total Amount</span>
                  <span className="text-2xl text-amber-400 font-display">₹{totalAmount}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => router.push('/checkout')}
                className="w-full py-4 px-6 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-2xl transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-amber-400/25"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Encrypted & Safe Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
