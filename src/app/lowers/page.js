import React from 'react';
import LowerViewfinderExperience from '@/components/experiences/LowerViewfinderExperience';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Lowers & Track Pants ₹179 | Bong99 Streetwear',
  description: 'Wide-leg racing track pants, pleated trousers, and utility cargo joggers at ₹179 with mobile viewfinder animation.',
};

export default async function LowersPage() {
  await dbConnect();
  const products = await Product.find({ category: 'lowers' }).lean();

  return (
    <div className="min-h-screen bg-zinc-950 py-8">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* Signature Viewfinder Experience */}
      <LowerViewfinderExperience />

      {/* Catalog Grid for Lowers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-900">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
              ALL STREET LOWERS & JOGGERS <span className="text-amber-400">₹179</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Engineered with anti-pilling fleece and deep utility pockets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug}`}
              className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 w-full bg-zinc-950 overflow-hidden">
                <Image
                  src={product.images[0] || 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-emerald-500 text-black px-2.5 py-0.5 rounded-full font-black text-[11px] font-display">
                  ₹{product.price}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-amber-400 font-display">
                    ₹{product.price}
                  </span>
                  <span className="text-xs text-zinc-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-400">
                  {product.fit}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
