'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Flame, ShieldCheck, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-zinc-950 overflow-hidden border-b border-zinc-900 pt-6">
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
              </span>
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
                Indian Street-Fashion Revolution
              </span>
            </div>

            {/* Huge Headline: STYLE STARTS AT ₹99 */}
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase font-display leading-[0.9]">
              STYLE <br />
              STARTS AT <br />
              <span className="text-amber-400 drop-shadow-[0_10px_35px_rgba(245,158,11,0.3)]">
                ₹99.
              </span>
            </h1>

            {/* Supporting Tagline */}
            <p className="text-lg sm:text-xl font-medium text-zinc-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Trendy clothing. Crazy prices. No generic templates — authentic street-wear fits crafted from heavyweight bio-washed cotton.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-amber-400/25 active:scale-95"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#scroll-experience"
                className="w-full sm:w-auto px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-all border border-zinc-700/80"
              >
                <span>EXPLORE COLLECTION</span>
              </Link>
            </div>

            {/* Micro Feature Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Drops starting at ₹99</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Same-day Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>100% Bio-Washed Cotton</span>
              </div>
            </div>
          </div>

          {/* Right Visual Stage with Layered Clothing Photography */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Background Graphic Circle Ring */}
            <div className="relative w-[340px] h-[400px] sm:w-[440px] sm:h-[500px] rounded-3xl bg-gradient-to-tr from-zinc-900 via-zinc-900/40 to-zinc-800/80 p-3 border border-zinc-800 shadow-2xl backdrop-blur-sm overflow-hidden flex items-center justify-center">
              {/* Hero Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=80"
                  alt="Bong99 Streetwear Model"
                  fill
                  className="object-cover object-top filter contrast-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
              </div>

              {/* Floating Price Callout 1: Plain ₹99 */}
              <div className="absolute -top-3 left-4 bg-zinc-950/90 border border-zinc-700 rounded-2xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3 animate-pulse-subtle">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-black font-black font-display text-sm flex items-center justify-center">
                  ₹99
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                    Plain T-Shirts
                  </div>
                  <div className="text-xs font-black text-white">
                    Bio-Washed 180 GSM
                  </div>
                </div>
              </div>

              {/* Floating Price Callout 2: Graphic ₹149 */}
              <div className="absolute bottom-6 -right-3 bg-zinc-950/90 border border-zinc-700 rounded-2xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600 text-white font-black font-display text-sm flex items-center justify-center">
                  ₹149
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                    Graphic Drops
                  </div>
                  <div className="text-xs font-black text-white">
                    Cyber & Tokyo Prints
                  </div>
                </div>
              </div>

              {/* Floating Price Callout 3: Track Pants ₹179 */}
              <div className="absolute bottom-6 -left-3 bg-zinc-950/90 border border-zinc-700 rounded-2xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3 hidden sm:flex">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-black font-black font-display text-sm flex items-center justify-center">
                  ₹179
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">
                    Lowers & Joggers
                  </div>
                  <div className="text-xs font-black text-white">
                    Street Relaxed Fit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Streetwear Marquee Ticker */}
      <div className="w-full bg-zinc-900 border-y border-zinc-800 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee-infinite text-xs sm:text-sm font-black tracking-widest text-zinc-300 uppercase font-display">
          <span className="mx-6 text-amber-400">★ BONG99 STREETWEAR</span>
          <span className="mx-6">PLAIN TEES ₹99</span>
          <span className="mx-6 text-amber-400">★ GRAPHIC TEES ₹149</span>
          <span className="mx-6">POLO TEES ₹189</span>
          <span className="mx-6 text-amber-400">★ LOWERS ₹179</span>
          <span className="mx-6">OFF-SHOULDER ₹189</span>
          <span className="mx-6 text-amber-400">★ 100% BIO-WASHED COTTON</span>
          <span className="mx-6">CRAZY PRICES</span>
          <span className="mx-6 text-amber-400">★ BONG99 STREETWEAR</span>
          <span className="mx-6">PLAIN TEES ₹99</span>
          <span className="mx-6 text-amber-400">★ GRAPHIC TEES ₹149</span>
          <span className="mx-6">POLO TEES ₹189</span>
          <span className="mx-6 text-amber-400">★ LOWERS ₹179</span>
        </div>
      </div>
    </section>
  );
}
