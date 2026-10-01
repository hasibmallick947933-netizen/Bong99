import React from 'react';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles, ShoppingBag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const titles = {
    'plain-tshirts': 'Plain T-Shirts from ₹99 | Bong99 Streetwear',
    'printed-tshirts': 'Printed Graphic T-Shirts from ₹149 | Bong99 Streetwear',
    'polo': 'Polo T-Shirts ₹189 | Bong99 Streetwear',
    'off-shoulder': 'Off-Shoulder T-Shirts ₹189 | Bong99 Streetwear',
    'lowers': 'Lowers & Track Pants ₹179 | Bong99 Streetwear',
  };

  return {
    title: titles[params.category] || 'Shop Collection | Bong99',
    description: 'Explore Bong99 street fashion category with prices starting at ₹99.',
  };
}

export default async function CategoryPage({ params }) {
  await dbConnect();
  const products = await Product.find({ category: params.category }).lean();

  const categoryTitles = {
    'plain-tshirts': { name: 'Plain T-Shirts', price: '₹99', desc: '100% Bio-Washed Combed Cotton solid tees.' },
    'printed-tshirts': { name: 'Printed T-Shirts', price: '₹149', desc: 'Futuristic Cyberpunk, Tokyo Panda & Street Rebel graphics.' },
    'polo': { name: 'Polo T-Shirts', price: '₹189', desc: 'Honeycomb 220 GSM Pique Cotton with structured collars.' },
    'off-shoulder': { name: 'Off-Shoulder T-Shirts', price: '₹189', desc: 'Korean oversized boxy drop-shoulder streetwear cuts.' },
    'lowers': { name: 'Lowers & Pants', price: '₹179', desc: 'Racing track pants, cargo joggers, and pleated comfort trousers.' },
  };

  const currentInfo = categoryTitles[params.category] || {
    name: params.category.replace('-', ' ').toUpperCase(),
    price: '₹99+',
    desc: 'Bong99 Street Fashion',
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Collections</span>
          </Link>
        </div>

        {/* Category Header Banner */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              Featured Category Drop
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight">
              {currentInfo.name} <span className="text-amber-400">{currentInfo.price}</span>
            </h1>
            <p className="text-sm text-zinc-400 max-w-xl">
              {currentInfo.desc}
            </p>
          </div>

          <div className="bg-zinc-950/80 border border-zinc-800 px-6 py-4 rounded-2xl flex items-center gap-4">
            <div className="text-2xl font-black text-amber-400 font-display">
              {currentInfo.price}
            </div>
            <div className="text-xs text-zinc-400">
              Flat Price Guarantee <br />
              <span className="text-white font-bold">100% Bio-Cotton</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug}`}
              className="group bg-zinc-900/60 border border-zinc-800 rounded-3xl overflow-hidden hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 w-full bg-zinc-950 overflow-hidden">
                <Image
                  src={product.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-amber-400 text-black px-3 py-0.5 rounded-full font-black text-xs font-display">
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
                {product.colors && product.colors.length > 0 && (
                  <div className="flex items-center gap-1.5 pt-1">
                    {product.colors.map((c) => (
                      <span
                        key={c.name}
                        className="w-3 h-3 rounded-full border border-zinc-700"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
