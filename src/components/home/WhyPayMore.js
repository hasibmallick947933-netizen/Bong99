'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, X, Sparkles, TrendingDown } from 'lucide-react';

const PRICE_TIERS = [
  {
    price: '₹99',
    category: 'Plain T-Shirts',
    marketPrice: '₹499+',
    features: ['100% Super-Combed Cotton', '180 GSM Bio-Washed', 'Preshrunk Fit', '7+ Vibrant Colorways'],
    link: '/plain-tshirts',
    accentColor: 'text-amber-400',
    borderGlow: 'hover:border-amber-400/50',
    badge: 'STARTER DEAL',
  },
  {
    price: '₹149',
    category: 'Printed T-Shirts',
    marketPrice: '₹799+',
    features: ['High-Density Screen Prints', '200 GSM Heavyweight', 'Futuristic Cyber & Tokyo Art', 'Non-Cracking Inks'],
    link: '/printed-tshirts',
    accentColor: 'text-red-400',
    borderGlow: 'hover:border-red-500/50',
    badge: 'TRENDING DROPS',
  },
  {
    price: '₹179',
    category: 'Lowers / Pants',
    marketPrice: '₹1,299+',
    features: ['Wide-Leg Street Trousers', 'Contrast Race Piping', 'Deep Zipper Pockets', 'Anti-Pilling Fleece Blend'],
    link: '/lowers',
    accentColor: 'text-emerald-400',
    borderGlow: 'hover:border-emerald-500/50',
    badge: 'BOTTOM WEAR',
  },
  {
    price: '₹189',
    category: 'Polo + Off-Shoulder',
    marketPrice: '₹999+',
    features: ['220 GSM Honeycomb Pique', 'Anti-Curl Structured Collars', 'Korean Drop-Shoulder Silhouette', 'Matte Finish Buttons'],
    link: '/polo',
    accentColor: 'text-blue-400',
    borderGlow: 'hover:border-blue-500/50',
    badge: 'PREMIUM CUTS',
  },
];

export default function WhyPayMore() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-400/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <TrendingDown className="w-3.5 h-3.5" />
            Transparent Pricing Matrix
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-display uppercase">
            WHY PAY <span className="text-amber-400">MORE?</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Big mall brands mark up clothing by 800% for marketing. At Bong99, we source directly from Indian mills to pass raw savings to the youth.
          </p>
        </div>

        {/* 4 Price Comparison Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICE_TIERS.map((tier) => (
            <div
              key={tier.category}
              className={`relative bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${tier.borderGlow} hover:-translate-y-1.5 shadow-xl group`}
            >
              {/* Badge */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {tier.badge}
                </span>
                <span className="text-[11px] text-zinc-500 line-through">
                  MSRP {tier.marketPrice}
                </span>
              </div>

              <div>
                {/* Big Price Display */}
                <div className={`text-5xl sm:text-6xl font-black font-display tracking-tight ${tier.accentColor}`}>
                  {tier.price}
                </div>

                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-amber-400 transition-colors">
                  {tier.category}
                </h3>

                <div className="my-5 w-full border-t border-zinc-800" />

                {/* Features */}
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-zinc-800/80">
                <Link
                  href={tier.link}
                  className="w-full py-2.5 px-4 bg-zinc-800 group-hover:bg-amber-400 text-white group-hover:text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore {tier.price}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
