'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Flame, ShieldCheck, Zap, Layers, RefreshCw, Smartphone } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-[#FAFAFA] text-black overflow-hidden border-b border-zinc-200 pt-6 pb-12 sm:pb-16">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#FEDE32]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#006838]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Bengali Badge & Price Pills from LOGO.png */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEDE32] text-black border border-[#E5C815] text-xs font-black shadow-sm">
                <span>দারুণ কোয়ালিটি, অবিশ্বাস্য দাম ♡</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#006838] text-white text-[11px] font-black">₹99</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F39200] text-black text-[11px] font-black">₹149</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E30613] text-white text-[11px] font-black">₹199</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black text-black tracking-tighter uppercase font-display leading-[0.9]">
              STYLE <br />
              STARTS AT <br />
              <span className="text-[#006838]">₹99.</span>
            </h1>

            {/* Tagline & Rationale */}
            <p className="text-base sm:text-lg font-medium text-zinc-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Authentic Indian streetwear. 100% bio-washed combed cotton with heavyweight drape. 
              Plain basics at <strong>₹99</strong>, graphic drops at <strong>₹149</strong>, bottoms at <strong>₹179</strong>, and structured polos at <strong>₹189</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-xl active:scale-95"
              >
                <span>EXPLORE ALL DROPS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/plain-tshirts"
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-zinc-100 text-black font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-all border-2 border-zinc-300 shadow-sm"
              >
                <span>PLAIN TEES ₹99 (RACK)</span>
              </Link>
            </div>

            {/* Jump links to the 4 specific experiences */}
            <div className="pt-4 border-t border-zinc-200">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 block mb-2.5">
                INTERACTIVE FASHION SHOWCASES:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                <Link
                  href="/plain-tshirts"
                  className="p-2.5 rounded-xl bg-white border border-zinc-200 hover:border-black transition-all shadow-sm group"
                >
                  <div className="text-[10px] font-bold text-zinc-500 flex items-center justify-between">
                    <span>BAFK Rack</span>
                    <span className="text-[#006838] font-black">₹99</span>
                  </div>
                  <div className="text-xs font-black text-black group-hover:text-amber-800 mt-0.5 line-clamp-1">
                    Plain T-Shirts
                  </div>
                </Link>

                <Link
                  href="/printed-tshirts"
                  className="p-2.5 rounded-xl bg-white border border-zinc-200 hover:border-black transition-all shadow-sm group"
                >
                  <div className="text-[10px] font-bold text-zinc-500 flex items-center justify-between">
                    <span>Tag Orbit</span>
                    <span className="text-[#E30613] font-black">₹149</span>
                  </div>
                  <div className="text-xs font-black text-black group-hover:text-red-600 mt-0.5 line-clamp-1">
                    Graphic Drops
                  </div>
                </Link>

                <Link
                  href="/polo"
                  className="p-2.5 rounded-xl bg-white border border-zinc-200 hover:border-black transition-all shadow-sm group"
                >
                  <div className="text-[10px] font-bold text-zinc-500 flex items-center justify-between">
                    <span>Polo Wheel</span>
                    <span className="text-black font-black">₹189</span>
                  </div>
                  <div className="text-xs font-black text-black group-hover:text-amber-900 mt-0.5 line-clamp-1">
                    Structured Pique
                  </div>
                </Link>

                <Link
                  href="/lowers"
                  className="p-2.5 rounded-xl bg-white border border-zinc-200 hover:border-black transition-all shadow-sm group"
                >
                  <div className="text-[10px] font-bold text-zinc-500 flex items-center justify-between">
                    <span>Phone View</span>
                    <span className="text-black font-black">₹179</span>
                  </div>
                  <div className="text-xs font-black text-black group-hover:text-emerald-800 mt-0.5 line-clamp-1">
                    Street Lowers
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase featuring official Brand LOGO & Model */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Card Frame */}
            <div className="relative w-[340px] h-[440px] sm:w-[420px] sm:h-[520px] rounded-3xl bg-white p-3 border-2 border-zinc-300 shadow-2xl overflow-hidden flex flex-col justify-between">
              {/* Top Banner inside Card */}
              <div className="relative w-full h-[76%] rounded-2xl overflow-hidden bg-zinc-100">
                <Image
                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=80"
                  alt="Bong99 Streetwear Model"
                  fill
                  className="object-cover object-top"
                  priority
                />

                {/* Floating Official Brand Bag Logo */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-zinc-200 shadow-xl flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#FEDE32] p-1 flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="Bong99 Official Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-black text-black font-display">
                      BONG99
                    </div>
                    <div className="text-[9px] font-bold text-[#006838]">
                      More Choices. Less Prices.
                    </div>
                  </div>
                </div>

                {/* Direct Price Tag */}
                <div className="absolute bottom-3 right-3 bg-black text-white px-3 py-1.5 rounded-full font-black text-xs tracking-wider shadow-lg flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#FEDE32]" />
                  <span>STARTS ₹99</span>
                </div>
              </div>

              {/* Lower Card Bar */}
              <div className="p-2 flex items-center justify-between">
                <div>
                  <div className="text-xs font-black text-black">
                    Super Combed 180-220 GSM
                  </div>
                  <div className="text-[10px] text-zinc-500">
                    Bio-Washed • Zero Shrinkage • COD
                  </div>
                </div>
                <Link
                  href="/shop"
                  className="px-3.5 py-1.5 bg-[#006838] text-white rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-[#00552E] transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Marquee Ticker */}
      <div className="w-full bg-black text-white py-3 overflow-hidden border-y border-zinc-800">
        <div className="flex whitespace-nowrap animate-marquee-infinite text-xs sm:text-sm font-black tracking-widest uppercase font-display">
          <span className="mx-6 text-[#FEDE32]">★ BONG99 STREETWEAR</span>
          <span className="mx-6">PLAIN TEES ₹99 (UGMONK RACK)</span>
          <span className="mx-6 text-[#FEDE32]">★ GRAPHIC TEES ₹149 (TAG ORBIT)</span>
          <span className="mx-6">POLO TEES ₹189 (WHEEL)</span>
          <span className="mx-6 text-[#FEDE32]">★ LOWERS ₹179 (PHONE RUNWAY)</span>
          <span className="mx-6">দারুণ কোয়ালিটি, অবিশ্বাস্য দাম ♡</span>
          <span className="mx-6 text-[#FEDE32]">★ 100% BIO-WASHED COTTON</span>
          <span className="mx-6">CASH ON DELIVERY ALL INDIA</span>
          <span className="mx-6 text-[#FEDE32]">★ BONG99 STREETWEAR</span>
          <span className="mx-6">PLAIN TEES ₹99</span>
          <span className="mx-6 text-[#FEDE32]">★ GRAPHIC TEES ₹149</span>
          <span className="mx-6">POLO TEES ₹189</span>
          <span className="mx-6 text-[#FEDE32]">★ LOWERS ₹179</span>
        </div>
      </div>
    </section>
  );
}
