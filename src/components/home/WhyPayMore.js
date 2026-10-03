'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const PRICE_TIERS = [
  {
    price: '₹99',
    category: 'Plain T-Shirts',
    marketPrice: '₹499',
    features: ['100% Super-Combed Cotton', '180 GSM Bio-Washed', 'Preshrunk Fit', '7+ Colorways'],
    link: '/plain-tshirts',
    spec: 'UGMONK & BAFK FIT',
  },
  {
    price: '₹149',
    category: 'Printed T-Shirts',
    marketPrice: '₹799',
    features: ['High-Density Prints', '200 GSM Heavyweight', 'Cyber & Tokyo Art', 'Non-Cracking Inks'],
    link: '/printed-tshirts',
    spec: 'GRAPHIC DROPS',
  },
  {
    price: '₹179',
    category: 'Lowers & Joggers',
    marketPrice: '₹1,299',
    features: ['Wide-Leg Street Cut', 'Contrast Race Piping', 'Deep Zipper Pockets', 'Anti-Pilling Fleece'],
    link: '/lowers',
    spec: 'DAPPER LOOKS',
  },
  {
    price: '₹189',
    category: 'Polo Shirts',
    marketPrice: '₹999',
    features: ['220 GSM Honeycomb Pique', 'Anti-Curl Structured Collars', 'Mother-of-Pearl Buttons', 'Drop-Shoulder Cut'],
    link: '/polo',
    spec: 'PREMIUM QUALITY',
  },
];

export default function WhyPayMore() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-black border-t border-zinc-200">
      <div className="max-w-7xl mx-auto">
        {/* Minimalist Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-zinc-200">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
              FACTORY DIRECT PRICING
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight text-black">
              WHY PAY MORE?
            </h2>
          </div>
          <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-zinc-500 max-w-sm">
            Big mall brands mark up basics by 800%. We source directly from textile mills in India to pass the raw savings to you.
          </p>
        </div>

        {/* 4 Clean Minimal Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICE_TIERS.map((tier) => (
            <div
              key={tier.category}
              className="bg-[#FAFAFA] border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between hover:border-black transition-all hover:shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                  <span>{tier.spec}</span>
                  <span className="line-through text-zinc-400">MSRP {tier.marketPrice}</span>
                </div>

                <div className="text-4xl sm:text-5xl font-mono font-black text-black">
                  {tier.price}
                </div>

                <h3 className="text-sm font-bold uppercase tracking-tight text-black mt-1">
                  {tier.category}
                </h3>

                <div className="my-4 border-t border-zinc-200" />

                <ul className="space-y-2 text-xs text-zinc-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200">
                <Link
                  href={tier.link}
                  className="w-full py-2.5 px-4 bg-white hover:bg-black text-black hover:text-white border border-zinc-300 hover:border-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
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
