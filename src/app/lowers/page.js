import React from 'react';
import LowerViewfinderExperience, { LOWER_ITEMS } from '@/components/experiences/LowerViewfinderExperience';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Lowers & Track Pants ₹179 | Bong99 Runway Viewfinder (Dapper Looks)',
  description: 'Wide-leg racing track pants, pleated trousers, and utility cargo joggers at ₹179 with mobile viewfinder animation.',
};

export default async function LowersPage() {
  await dbConnect();
  const dbProducts = await Product.find({ category: 'lowers' }).lean();

  const catalogList = dbProducts.length > 0 ? dbProducts : LOWER_ITEMS.map((l) => ({
    _id: l.id,
    name: l.name,
    slug: 'street-track-pant-contrast-piping-beige',
    price: l.price,
    originalPrice: l.originalPrice,
    images: [l.image],
    fit: l.fit,
    description: l.details,
  }));

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Breadcrumb Nav */}
      <div className="bg-zinc-100 border-b border-zinc-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Bong99 Home</span>
          </Link>
          <div className="text-xs uppercase tracking-widest font-black text-black">
            LOWER PAGE / VIEWFINDER RUNWAY
          </div>
          <span className="text-xs font-bold text-zinc-600">
            Price: <strong className="text-black">₹179 Flat</strong>
          </span>
        </div>
      </div>

      {/* Signature Smartphone Viewfinder Experience */}
      <LowerViewfinderExperience />

      {/* Catalog Grid for Lowers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-200">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-black font-display uppercase tracking-tight">
              ALL STREET LOWERS & TROUSERS <span className="text-zinc-600">₹179</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Anti-pilling fleece, double-needle stitched seams, and sneaker-friendly cuffs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {catalogList.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug || 'street-track-pant-contrast-piping-beige'}`}
              className="group bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden hover:border-black transition-all duration-300 flex flex-col justify-between hover:shadow-lg"
            >
              <div className="relative h-64 sm:h-72 w-full bg-white overflow-hidden p-4 flex items-center justify-center">
                <Image
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800'}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                />
                <div className="absolute top-2.5 left-2.5 bg-black text-white px-2.5 py-0.5 rounded-full font-black text-[11px] font-display">
                  ₹{product.price || 179}
                </div>
              </div>

              <div className="p-4 space-y-2 bg-zinc-50">
                <h3 className="text-xs sm:text-sm font-bold text-black group-hover:text-amber-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-black text-black font-display">
                    ₹{product.price || 179}
                  </span>
                  <span className="text-xs text-zinc-400 line-through">
                    ₹{product.originalPrice || 999}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold">
                    SAVE 80%
                  </span>
                </div>
                <div className="text-[11px] text-zinc-500">
                  {product.fit || 'Regular / Street Fit'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
