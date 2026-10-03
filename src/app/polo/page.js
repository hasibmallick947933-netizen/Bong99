import React from 'react';
import PoloWheelExperience, { POLO_ITEMS } from '@/components/experiences/PoloWheelExperience';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Polo T-Shirts ₹189 | Bong99 Editorial Radial Wheel',
  description: 'Honeycomb pique cotton structured polo t-shirts at ₹189 with dynamic circular rotating wheel colorway presentation.',
};

export default async function PoloPage() {
  await dbConnect();
  const dbProducts = await Product.find({ category: 'polo' }).lean();

  const catalogList = dbProducts.length > 0 ? dbProducts : POLO_ITEMS.map((p) => ({
    _id: p.id,
    name: p.name,
    slug: 'classic-pique-heritage-polo-black',
    price: p.price,
    originalPrice: p.originalPrice,
    images: [p.image],
    colors: [{ name: p.color, hex: p.hex }],
    description: p.fabric,
  }));

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#1E1E1E]">
      {/* Top Breadcrumb Nav */}
      <div className="bg-[#E8E1D8] border-b border-[#D8CFBF] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-700 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Bong99 Home</span>
          </Link>
          <div className="text-xs uppercase tracking-widest font-black text-black">
            POLO WHEEL / EDITORIAL COLLECTION
          </div>
          <span className="text-xs font-bold text-zinc-700">
            Price: <strong className="text-black">₹189 Flat</strong>
          </span>
        </div>
      </div>

      {/* Signature Giant Circular Wheel Experience */}
      <PoloWheelExperience />

      {/* Catalog Grid for Polo T-Shirts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#DDD6CD]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-black font-display uppercase tracking-tight">
              HEAVYWEIGHT PIQUE POLO LINE <span className="text-zinc-600">₹189</span>
            </h2>
            <p className="text-xs text-zinc-600 mt-1">
              Structured 220 GSM pique cotton with reinforced anti-curl collars.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {catalogList.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug || 'classic-pique-heritage-polo-black'}`}
              className="group bg-white border border-[#E2DBD1] rounded-2xl overflow-hidden hover:border-black transition-all duration-300 flex flex-col justify-between hover:shadow-lg"
            >
              <div className="relative h-64 sm:h-72 w-full bg-[#FAF7F2] overflow-hidden p-4 flex items-center justify-center">
                <Image
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1625910513413-7e4526d152c7?w=800'}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                />
                <div className="absolute top-2.5 left-2.5 bg-black text-white px-2.5 py-0.5 rounded-full font-black text-[11px] font-display">
                  ₹{product.price || 189}
                </div>
              </div>

              <div className="p-4 space-y-2 bg-white">
                <h3 className="text-xs sm:text-sm font-bold text-black group-hover:text-amber-800 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-black text-black font-display">
                    ₹{product.price || 189}
                  </span>
                  <span className="text-xs text-zinc-400 line-through">
                    ₹{product.originalPrice || 899}
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold">
                    SAVE 79%
                  </span>
                </div>
                <div className="text-[11px] text-zinc-600">
                  220 GSM Honeycomb Pique
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
