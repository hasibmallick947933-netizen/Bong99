'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Instagram, Facebook, Youtube, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800">
      {/* Brand Value Pillars */}
      <div className="border-b border-zinc-900 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs sm:text-sm font-bold">Fast India Delivery</h4>
                <p className="text-[11px] text-zinc-400">Free delivery over ₹499</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs sm:text-sm font-bold">Easy 7-Day Returns</h4>
                <p className="text-[11px] text-zinc-400">Hassle-free exchange</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-400/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs sm:text-sm font-bold">100% Genuine Bio-Cotton</h4>
                <p className="text-[11px] text-zinc-400">Premium combed fabric</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-400/10 text-rose-400 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs sm:text-sm font-bold">COD & UPI Supported</h4>
                <p className="text-[11px] text-zinc-400">100% safe & encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white p-0.5">
                <Image
                  src="/logo.png"
                  alt="Bong99"
                  width={32}
                  height={32}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-2xl font-black text-white tracking-tight font-display">
                BONG<span className="text-amber-400">99</span>
              </span>
            </Link>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Affordable Indian street-fashion revolution. We prove that premium quality, heavyweight cotton, and modern aesthetic cuts don't require insane prices.
            </p>

            <div className="inline-block px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold">
              দারুণ কোয়ালিটি, অবিশ্বাস্য দাম ♡
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-amber-400 hover:text-black flex items-center justify-center text-zinc-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-amber-400 hover:text-black flex items-center justify-center text-zinc-300 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-amber-400 hover:text-black flex items-center justify-center text-zinc-300 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">Collections</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/plain-tshirts" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Plain T-Shirts</span>
                  <span className="text-xs text-amber-400 font-bold">₹99</span>
                </Link>
              </li>
              <li>
                <Link href="/printed-tshirts" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Printed Graphic Tees</span>
                  <span className="text-xs text-amber-400 font-bold">₹149</span>
                </Link>
              </li>
              <li>
                <Link href="/polo" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Polo T-Shirts</span>
                  <span className="text-xs text-amber-400 font-bold">₹189</span>
                </Link>
              </li>
              <li>
                <Link href="/lowers" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Lowers & Track Pants</span>
                  <span className="text-xs text-amber-400 font-bold">₹179</span>
                </Link>
              </li>
              <li>
                <Link href="/shop/off-shoulder" className="hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Off-Shoulder Tees</span>
                  <span className="text-xs text-amber-400 font-bold">₹189</span>
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-400 transition-colors font-semibold text-white">
                  View Full Catalog →
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">Customer Care</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  My Orders & Tracking
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Size Guide & Measurements
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Shipping & COD Policy
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Return & Exchange
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">The 99 Club</h3>
            <p className="text-xs text-zinc-400">
              Get secret drops, coupon drops, and VIP restock alerts straight to your inbox.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>You are in! Check your inbox for ₹50 off code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-amber-400 text-black text-xs font-bold rounded-md hover:bg-amber-300 transition-colors flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-zinc-500 block">No spam. Unsubscribe anytime.</span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Bong99 Fashion Inc. All rights reserved. Indian Streetwear starts at ₹99.</p>
          <div className="flex items-center gap-4">
            <span>Razorpay Secure Checkout</span>
            <span>•</span>
            <span>100% Encrypted</span>
            <span>•</span>
            <span>Made with pride in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
