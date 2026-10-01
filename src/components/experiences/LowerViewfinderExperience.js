'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const LOWER_ITEMS = [
  {
    id: 'lower-track-beige',
    name: 'Street Track Pant with Contrast Race Piping',
    color: 'Sand Beige',
    fit: 'Wide-Leg Baggy Street Fit',
    price: 179,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    details: 'Heavyweight fleece track pant with vertical black athletic stripe, drawcord waistband, and deep zipper pockets.',
  },
  {
    id: 'lower-pleated-black',
    name: 'Pleated Urban Comfort Trouser',
    color: 'Jet Black',
    fit: 'Relaxed Straight Pleated',
    price: 179,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80',
    details: 'Tailored drape trouser with double front pleats, hidden elastic side waist, and cuffed straight hem.',
  },
  {
    id: 'lower-cargo-olive',
    name: 'Everyday Utility Tactical Jogger',
    color: 'Combat Olive',
    fit: 'Tapered Utility Cargo',
    price: 179,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    details: 'Ripstop stretch twill joggers featuring 6 cargo pockets, adjustable leg cuffs, and knee articulation darts.',
  },
  {
    id: 'lower-denim-blue',
    name: 'Straight-Fit Street Comfort Pant',
    color: 'Washed Denim Blue',
    fit: 'Classic Straight Leg',
    price: 179,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80',
    details: 'Soft peached denim-cotton blend with reinforced belt loops and clean vintage wash aesthetic.',
  },
];

export default function LowerViewfinderExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const { addToCart } = useCart();
  const currentLower = LOWER_ITEMS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + LOWER_ITEMS.length) % LOWER_ITEMS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % LOWER_ITEMS.length);
  };

  const handleAddToCart = () => {
    addToCart(
      {
        _id: currentLower.id,
        name: `${currentLower.name} (${currentLower.color})`,
        price: currentLower.price,
        originalPrice: currentLower.originalPrice,
        images: [currentLower.image],
        category: 'lowers',
        slug: 'street-track-pant-contrast-piping-beige',
      },
      selectedSize,
      currentLower.color,
      1
    );
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Bottom Wear Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display uppercase">
            Lowers Runway <span className="text-amber-400">₹179</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Glide through the viewfinder. Cargo joggers, wide-leg street pants, and tailored pleats designed for street comfort.
          </p>
        </div>

        {/* The Viewfinder Container (Matching Reference: lower page.mov) */}
        <div className="relative max-w-5xl mx-auto flex flex-col items-center">
          {/* Navigation Arrows */}
          <div className="w-full flex items-center justify-between mb-4 px-4 sm:px-12 z-30">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-zinc-900/90 border border-zinc-700 text-white hover:bg-amber-400 hover:text-black transition-colors shadow-xl"
              aria-label="Previous Pant"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
              {activeIndex + 1} of {LOWER_ITEMS.length} Bottom Styles
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-zinc-900/90 border border-zinc-700 text-white hover:bg-amber-400 hover:text-black transition-colors shadow-xl"
              aria-label="Next Pant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Central Rounded Smartphone / Card Viewport */}
          <div className="relative w-full max-w-md sm:max-w-lg min-h-[520px] sm:min-h-[580px] rounded-[40px] border-4 border-zinc-700 bg-zinc-900/90 p-6 sm:p-8 shadow-2xl flex flex-col items-center justify-between overflow-hidden">
            {/* The Search Pill Header (Exact reference element) */}
            <div className="w-full max-w-xs bg-zinc-800/90 border border-zinc-600 rounded-full py-2.5 px-4 flex items-center gap-2.5 shadow-md">
              <Search className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-zinc-200 truncate">
                Your Bottom Wear Matters More!
              </span>
            </div>

            {/* Sliding Runway of Pants */}
            <div className="relative w-full h-[360px] flex items-center justify-center my-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLower.id}
                  initial={{ opacity: 0, x: 120 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -120 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={currentLower.image}
                    alt={currentLower.name}
                    fill
                    className="object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Price Tag Overlay */}
              <div className="absolute top-2 right-2 bg-amber-400 text-black px-3.5 py-1 rounded-full font-black text-sm font-display tracking-wider shadow-lg">
                ₹{currentLower.price}
              </div>
            </div>

            {/* Pant Details & Controls */}
            <div className="w-full text-center space-y-3 z-10 bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800 backdrop-blur-md">
              <h3 className="text-base sm:text-lg font-black text-white font-display">
                {currentLower.name}
              </h3>
              <div className="flex items-center justify-center gap-3 text-xs text-zinc-400">
                <span className="text-amber-400 font-semibold">{currentLower.color}</span>
                <span>•</span>
                <span>{currentLower.fit}</span>
              </div>

              {/* Size Selector */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-9 h-8 rounded-lg text-xs font-bold border transition-colors ${
                      selectedSize === sz
                        ? 'bg-amber-400 text-black border-amber-400'
                        : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              {/* Action Button */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-1.5 shadow-md shadow-amber-400/20"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add To Bag (₹{currentLower.price})</span>
                </button>
                <Link
                  href="/lowers"
                  className="py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center border border-zinc-700"
                >
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
