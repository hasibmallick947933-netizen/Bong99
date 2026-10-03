import React from 'react';
import PrintedTeeOrbitExperience, { GRAPHIC_TEES } from '@/components/experiences/PrintedTeeOrbitExperience';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Printed Graphic T-Shirts ₹149 | Bong99 Orbit (White & Dark Editions)',
  description: 'Cyberpunk bears, distressed typography, and Harajuku graphic t-shirts starting from ₹149 with interactive 360 orbit animations.',
};

export default async function PrintedTshirtsPage() {
  await dbConnect();
  const dbProducts = await Product.find({ category: 'printed-tshirts' }).lean();

  const catalogList = dbProducts.length > 0 ? dbProducts : GRAPHIC_TEES.map((g) => ({
    _id: g.id,
    name: g.name,
    slug: 'never-give-up-cyber-bear-tee',
    price: g.price,
    originalPrice: g.originalPrice,
    images: [g.imageBack, g.imageFront],
    colors: [{ name: g.color, hex: g.hex }],
    description: g.graphic,
  }));

  return (
    <div className="min-h-screen bg-[#F2F3F5] text-zinc-900">
      {/* Top Breadcrumb Nav */}
      <div className="bg-white border-b border-zinc-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Bong99 Home</span>
          </Link>
          <div className="text-xs uppercase tracking-widest font-black text-black">
            PRINTED TEE ORBIT / TAG FLIP EXPERIENCE
          </div>
          <span className="text-xs font-bold text-zinc-600">
            Price: <strong className="text-black">₹149 Flat</strong>
          </span>
        </div>
      </div>

      {/* Signature Graphic Tee Orbit Experience with Dual Studio White / Street Dark Theme */}
      <PrintedTeeOrbitExperience initialTheme="white" />

      {/* Catalog Grid for Printed T-Shirts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-zinc-200">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-black font-display uppercase tracking-tight">
              GRAPHIC STREET DROPS <span className="text-red-600">₹149</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              Heavyweight 200 GSM cotton prints with high-density screen graphics that never peel.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {catalogList.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug || 'never-give-up-cyber-bear-tee'}`}
              className="group bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-black transition-all duration-300 flex flex-col justify-between hover:shadow-lg"
            >
              <div className="relative h-64 sm:h-72 w-full bg-zinc-50 overflow-hidden p-4 flex items-center justify-center">
                <Image
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800'}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500 p-2"
                />
                <div className="absolute top-2.5 left-2.5 bg-red-600 text-white px-2.5 py-0.5 rounded-full font-black text-[11px] font-display">
                  ₹{product.price || 149}
                </div>
              </div>

              <div className="p-4 space-y-2 bg-white">
                <h3 className="text-xs sm:text-sm font-bold text-black group-hover:text-red-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-black text-black font-display">
                    ₹{product.price || 149}
                  </span>
                  <span className="text-xs text-zinc-400 line-through">
                    ₹{product.originalPrice || 699}
                  </span>
                  <span className="text-[10px] text-red-600 font-bold">
                    HOT DROP
                  </span>
                </div>
                <div className="text-[11px] text-zinc-500 line-clamp-1">
                  {product.description || 'Front & Back Graphics'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
