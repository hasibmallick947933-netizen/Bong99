'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'plain',
    title: 'PLAIN T-SHIRTS',
    price: '₹99',
    badge: 'Starting at',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    link: '/plain-tshirts',
    subtext: 'Combed bio-washed cotton in 7+ solid hues',
  },
  {
    id: 'printed',
    title: 'PRINTED T-SHIRTS',
    price: '₹149',
    badge: 'Graphic drops from',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
    link: '/printed-tshirts',
    subtext: 'Cyberpunk bears, Tokyo raves & distressed typography',
  },
  {
    id: 'polo-off',
    title: 'POLO + OFF-SHOULDER',
    price: '₹189',
    badge: 'Premium fits at',
    image: 'https://images.unsplash.com/photo-1625910513413-7e4526d152c7?w=800&auto=format&fit=crop&q=80',
    link: '/polo',
    subtext: 'Honeycomb pique knit & Korean oversized slouch cuts',
  },
  {
    id: 'lowers',
    title: 'LOWERS & PANTS',
    price: '₹179',
    badge: 'Street bottoms at',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    link: '/lowers',
    subtext: 'Side-stripe racing track pants & utility cargo joggers',
  },
];

export default function CategoryCards() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Collections
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-display uppercase">
              SHOP <span className="text-amber-400">BONG99</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Select your category. Every single piece is engineered with premium streetwear silhouettes.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View Full 2026 Catalog</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Cards Grid with Hover Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              className="group relative h-[420px] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 flex flex-col justify-between p-6 transition-all duration-500 hover:border-amber-400/80 hover:shadow-2xl hover:shadow-amber-400/10"
            >
              {/* Background Image with Zoom on Hover */}
              <div className="absolute inset-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-90 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              </div>

              {/* Top Bar with Price Pill */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="bg-zinc-950/90 border border-zinc-700/80 rounded-2xl px-3.5 py-1.5 backdrop-blur-md">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">
                    {cat.badge}
                  </span>
                  <span className="text-2xl font-black text-amber-400 font-display">
                    {cat.price}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-full bg-zinc-900/80 border border-zinc-700 text-white flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black transition-colors shadow-lg">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-2">
                <h3 className="text-2xl font-black text-white font-display tracking-tight uppercase group-hover:text-amber-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2">
                  {cat.subtext}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-white group-hover:underline">
                  <span>Enter Collection</span>
                  <span className="text-amber-400">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
