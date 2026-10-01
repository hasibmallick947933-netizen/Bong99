import React from 'react';
import PoloWheelExperience from '@/components/experiences/PoloWheelExperience';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Polo T-Shirts ₹189 | Bong99 Streetwear',
  description: 'Honeycomb pique cotton structured polo t-shirts at ₹189 with dynamic circular rotating wheel colorway presentation.',
};

export default async function PoloPage() {
  await dbConnect();
  const products = await Product.find({ category: 'polo' }).lean();

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

      {/* Signature Rotating Circular Wheel Experience */}
      <PoloWheelExperience />

      {/* Catalog Grid for Polo T-Shirts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-900">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display uppercase">
              STRUCTURED PIQUE POLO LINE <span className="text-amber-400">₹189</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Elevated 220 GSM pique cotton with anti-curl collars.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug}`}
              className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 w-full bg-zinc-950 overflow-hidden">
                <Image
                  src={product.images[0] || 'https://images.unsplash.com/photo-1625910513413-7e4526d152c7?w=800'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-amber-400 text-black px-2.5 py-0.5 rounded-full font-black text-[11px] font-display">
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
                <div className="flex items-center gap-1.5 pt-1">
                  {product.colors && product.colors.map((c) => (
                    <span
                      key={c.name}
                      className="w-3.5 h-3.5 rounded-full border border-zinc-700"
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
