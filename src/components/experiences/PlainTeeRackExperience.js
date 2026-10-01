'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const RACK_TEES = [
  {
    id: 'rack-white',
    name: 'Classic Bio-Cotton Tee',
    colorName: 'Pure Snow White',
    hex: '#F8F9FA',
    border: 'border-zinc-300',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    description: '100% Super Combed Bio-washed Cotton (180 GSM). Zero shrinkage guarantee.',
  },
  {
    id: 'rack-navy',
    name: 'Midnight Navy Essential Tee',
    colorName: 'Deep Navy',
    hex: '#1E293B',
    border: 'border-blue-900',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    description: 'Rich dark indigo dyed cotton with reinforced double-stitch collar ribbing.',
  },
  {
    id: 'rack-black',
    name: 'Obsidian Core Plain Tee',
    colorName: 'Pitch Black',
    hex: '#121214',
    border: 'border-zinc-700',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    description: 'Deepest jet black pigment. Does not fade after 50+ wash cycles.',
  },
  {
    id: 'rack-olive',
    name: 'Military Olive Ground Tee',
    colorName: 'Olive Drab',
    hex: '#3F4F38',
    border: 'border-emerald-900',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    description: 'Tactical earth tone streetwear finish with relaxed shoulder taper.',
  },
  {
    id: 'rack-beige',
    name: 'Desert Dune Neutral Tee',
    colorName: 'Warm Sand',
    hex: '#D7C4B7',
    border: 'border-amber-300',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    description: 'Subtle warm neutral palette engineered for effortless layering.',
  },
  {
    id: 'rack-grey',
    name: 'Melange Heather Street Tee',
    colorName: 'Slate Grey',
    hex: '#71717A',
    border: 'border-zinc-500',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    description: 'Featherlight melange combed yarn texture for all-day breathability.',
  },
];

export default function PlainTeeRackExperience() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const { addToCart } = useCart();
  const activeTee = RACK_TEES[selectedIndex];

  const handleAddToCart = () => {
    addToCart(
      {
        _id: activeTee.id,
        name: `${activeTee.name} (${activeTee.colorName})`,
        price: activeTee.price,
        originalPrice: activeTee.originalPrice,
        images: [activeTee.image],
        category: 'plain-tshirts',
        slug: 'classic-plain-tee-pure-white',
      },
      selectedSize,
      activeTee.colorName,
      1
    );
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-zinc-950 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-400/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Plain Essentials Collection
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display uppercase">
            Hanger Rack to Front <span className="text-amber-400">₹99</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Click or scroll across the rack. Watch each handcrafted bio-washed t-shirt glide directly to the front for a full 360° inspection.
          </p>
        </div>

        {/* The Wardrobe Wooden Clothing Rack Bar */}
        <div className="relative max-w-4xl mx-auto mb-12">
          {/* Wooden Hanger Rod */}
          <div className="h-3 w-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-full shadow-lg border border-amber-900/50 flex items-center justify-between px-6">
            <div className="w-3 h-3 rounded-full bg-zinc-900" />
            <div className="w-3 h-3 rounded-full bg-zinc-900" />
          </div>

          {/* Clothes Rack Hanger Items Placed Side-by-Side */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 -mt-1 overflow-x-auto py-4 px-2 no-scrollbar">
            {RACK_TEES.map((tee, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={tee.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`group relative flex flex-col items-center transition-all duration-300 ${
                    isSelected ? 'scale-110 -translate-y-2' : 'opacity-70 hover:opacity-100 hover:-translate-y-1'
                  }`}
                  aria-label={`Select ${tee.colorName}`}
                >
                  {/* Metal Hanger Hook */}
                  <div className="w-6 h-6 border-t-2 border-r-2 border-zinc-400 rounded-tr-full transform -rotate-45 mb-1" />

                  {/* T-Shirt Hanger Miniature */}
                  <div
                    className={`w-14 sm:w-20 h-20 sm:h-28 rounded-lg overflow-hidden border-2 transition-all shadow-md relative ${
                      isSelected ? 'border-amber-400 shadow-amber-400/30' : 'border-zinc-700'
                    }`}
                  >
                    <Image
                      src={tee.image}
                      alt={tee.name}
                      fill
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{ backgroundColor: tee.hex }}
                    />
                  </div>

                  {/* Color dot badge */}
                  <div className="mt-2 flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-zinc-600"
                      style={{ backgroundColor: tee.hex }}
                    />
                    <span className="text-[10px] text-zinc-400 font-medium hidden sm:inline">
                      {tee.colorName}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Spotlight: Shirt Glides Front-and-Center */}
        <div className="max-w-4xl mx-auto bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Animated Front T-shirt Presentation */}
            <div className="relative h-80 sm:h-[420px] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTee.id}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeTee.image}
                    alt={activeTee.name}
                    fill
                    className="object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                    priority
                  />
                  {/* Floating Price Badge */}
                  <div className="absolute top-4 left-4 bg-amber-400 text-black px-3 py-1 rounded-full font-black text-xs font-display tracking-wider shadow-lg flex items-center gap-1">
                    <span>FROM ₹{activeTee.price}</span>
                  </div>
                  {/* Color Pill */}
                  <div className="absolute bottom-4 left-4 bg-zinc-900/90 border border-zinc-700 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    Color: {activeTee.colorName}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Product Specifications & Interactive Order Panel */}
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Bong99 Pure Basics
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 font-display">
                  {activeTee.name}
                </h3>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-3xl font-black text-amber-400 font-display">
                    ₹{activeTee.price}
                  </span>
                  <span className="text-sm text-zinc-500 line-through">
                    ₹{activeTee.originalPrice}
                  </span>
                  <span className="text-xs bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                    SAVE 80%
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {activeTee.description}
              </p>

              {/* Color Swatch Picker */}
              <div>
                <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block mb-2">
                  Select Colorway
                </label>
                <div className="flex items-center gap-2">
                  {RACK_TEES.map((tee, idx) => (
                    <button
                      key={tee.id}
                      onClick={() => setSelectedIndex(idx)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        selectedIndex === idx ? 'scale-125 border-amber-400 ring-2 ring-amber-400/40' : 'border-zinc-700 hover:scale-110'
                      }`}
                      style={{ backgroundColor: tee.hex }}
                      title={tee.colorName}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Select Size
                  </label>
                  <span className="text-[11px] text-zinc-500">Regular Fit</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        selectedSize === size
                          ? 'bg-amber-400 text-black border-amber-400 shadow-md shadow-amber-400/20'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag</span>
                </button>
                <Link
                  href="/plain-tshirts"
                  className="py-3 px-6 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 border border-zinc-700"
                >
                  <span>Explore All ₹99</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
