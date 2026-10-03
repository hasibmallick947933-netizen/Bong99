import React from 'react';
import PlainTeeRackExperience, { PLAIN_TEES } from '@/components/experiences/PlainTeeRackExperience';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { ArrowLeft, Sparkles, Filter, Check } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Plain T-Shirts ₹99 | Bong99 Essentials (Ugmonk & BAFK Style)",
  description: "100% Super-combed bio-washed plain t-shirts starting at ₹99. Side-by-side clothes rack animation and all solid colorways.",
};

export default async function PlainTshirtsPage() {
  await dbConnect();
  const dbProducts = await Product.find({ category: 'plain-tshirts' }).lean();

  // Combine DB products with signature reference colorways
  const catalogList = dbProducts.length > 0 ? dbProducts : PLAIN_TEES.map((t) => ({
    _id: t.id,
    name: t.name,
    slug: 'classic-plain-tee-pure-white',
    price: t.price,
    originalPrice: t.originalPrice,
    images: [t.image],
    colors: [{ name: t.colorName, hex: t.hex }],
    description: t.fabric,
  }));

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#1E1C1A]">
      {/* Top Banner Navigation matching Ugmonk reference */}
      <div className="bg-[#E7DED4] border-b border-[#D8CEBF] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#5C564E] hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Bong99 Home</span>
          </Link>
          <div className="text-xs uppercase tracking-widest font-black text-amber-900">
            BAFK & UGMONK ESSENTIALS LINE
          </div>
          <span className="text-xs font-bold text-[#5C564E]">
            Price: <strong className="text-black">₹99 Flat</strong>
          </span>
        </div>
      </div>

      {/* Signature Wardrobe Clothes Rack Experience */}
      <PlainTeeRackExperience />

      {/* Ugmonk Sub-Nav Tabs (Mens / Womens / Objects / All Essentials) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex items-center justify-center gap-8 border-b border-[#DDD3C6] pb-4">
          <button className="text-sm font-black uppercase tracking-wider text-black border-b-2 border-black pb-4 -mb-[18px]">
            Mens
          </button>
          <button className="text-sm font-semibold uppercase tracking-wider text-[#7A746C] hover:text-black transition-colors pb-4">
            Womens
          </button>
          <button className="text-sm font-semibold uppercase tracking-wider text-[#7A746C] hover:text-black transition-colors pb-4">
            Unisex Street Oversized
          </button>
          <button className="text-sm font-semibold uppercase tracking-wider text-[#7A746C] hover:text-black transition-colors pb-4">
            Combo Packs (3 for ₹279)
          </button>
        </div>
      </div>

      {/* 4-Column Ugmonk Minimalist Grid (Ref: plane tshirt page .png) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#1E1C1A] font-display">
              ESSENTIAL TEE COLLECTION <span className="text-amber-800">₹99</span>
            </h3>
            <p className="text-xs text-[#6B655D] mt-1">
              Solid bio-washed 180 GSM tees. Zero shrinkage, clean drape, and premium stitched collar ribbing.
            </p>
          </div>
          <span className="text-xs font-bold text-[#7A746C]">
            Showing {catalogList.length} colorways
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {catalogList.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug || 'classic-plain-tee-pure-white'}`}
              className="group flex flex-col justify-between transition-all duration-300"
            >
              {/* Product Flat Lay / Cutout Image on Light Card */}
              <div className="relative aspect-[3/4] w-full rounded-2xl bg-white border border-[#E2D9CE] overflow-hidden group-hover:border-[#1E1C1A] transition-all group-hover:shadow-xl p-4 flex items-center justify-center">
                <Image
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'}
                  alt={product.name}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Price Pill */}
                <div className="absolute top-3 left-3 bg-[#1E1C1A] text-white px-2.5 py-0.5 rounded-full font-black text-[11px] font-display">
                  ₹{product.price || 99}
                </div>

                <div className="absolute bottom-3 right-3 bg-white/90 text-[#1E1C1A] px-2 py-0.5 rounded text-[10px] font-bold border border-[#DDD]">
                  180 GSM
                </div>
              </div>

              {/* Product Info below card (Ugmonk style) */}
              <div className="pt-3.5 space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-[#1E1C1A] group-hover:text-amber-800 transition-colors line-clamp-1">
                  {product.name}
                </h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-black text-amber-900 font-display">
                    ₹{product.price || 99}
                  </span>
                  <span className="text-xs text-[#8E877E] line-through">
                    ₹{product.originalPrice || 499}
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold">
                    80% OFF
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
