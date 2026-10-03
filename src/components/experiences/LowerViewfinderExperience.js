'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const LOWER_ITEMS = [
  {
    id: 'lower-track-sand',
    name: 'Baggy Street Track Pant with Contrast Racing Piping',
    color: 'Sand Beige',
    hex: '#D7C4B7',
    fit: 'Wide-Leg Street Drape',
    price: 179,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    details: 'Heavyweight loopback fleece with side contrast racing piping, drawcord waistband, and deep zipper pockets.',
  },
  {
    id: 'lower-pleated-black',
    name: 'Tailored Urban Pleated Trouser',
    color: 'Obsidian Black',
    hex: '#18181B',
    fit: 'Relaxed Straight Pleated',
    price: 179,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80',
    details: 'Double front pleats, hidden elastic comfort waistband, and cuffed straight hem engineered for sneakers.',
  },
  {
    id: 'lower-cargo-olive',
    name: 'Combat Olive Utility Tailored Trouser',
    color: 'Military Olive',
    hex: '#414D3C',
    fit: 'Structured Chino / Utility',
    price: 179,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    details: 'Double-button waistband closure, knife-pleat drape, and breathable cotton-spandex stretch twill.',
  },
  {
    id: 'lower-denim-blue',
    name: 'Vintage Straight-Fit PEACHED Street Denim',
    color: 'Washed Light Blue',
    hex: '#96B3CE',
    fit: 'Classic Baggy Denim Cut',
    price: 179,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80',
    details: 'Peached vintage light stone wash denim with reinforced bar-tacks and copper shank hardware.',
  },
];

export default function LowerViewfinderExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [typedText, setTypedText] = useState('');
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const currentLower = LOWER_ITEMS[activeIndex];

  // Typing animation for search bar: "Your Bottom Wear Matters More!"
  const fullText = "Your Bottom Wear Matters More!";
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

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
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white text-black overflow-hidden border-t border-zinc-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-900 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            LOWER PAGE RUNWAY EXPERIENCE
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase font-display text-black">
            YOUR BOTTOM WEAR <span className="text-zinc-900">MATTERS MORE!</span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            The secret to a killer streetwear silhouette begins with the pants. 
            Wide-leg track pants, sharp tailored pleats, and everyday street utility — all at an unbelievable <strong className="text-black font-black">₹179</strong>.
          </p>
        </div>

        {/* Viewfinder Centerpiece - Exactly matching lower page.mov */}
        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          {/* Top Controller Arrows */}
          <div className="w-full max-w-md flex items-center justify-between mb-4 px-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-zinc-100 border border-zinc-300 text-black hover:bg-black hover:text-white transition-colors shadow-sm"
              aria-label="Previous Pant"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-bold tracking-widest uppercase text-zinc-600">
              Style {activeIndex + 1} of {LOWER_ITEMS.length}
            </div>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-zinc-100 border border-zinc-300 text-black hover:bg-black hover:text-white transition-colors shadow-sm"
              aria-label="Next Pant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Smartphone Silhouette (Exact shape and styling from lower page.mov) */}
          <div className="relative w-full max-w-sm sm:max-w-md h-[560px] sm:h-[620px] rounded-[48px] border-[5px] border-black bg-[#FAFAFA] p-6 shadow-2xl flex flex-col items-center justify-between overflow-hidden">
            {/* Top Speaker Notch */}
            <div className="w-20 h-4 bg-black rounded-b-xl -mt-6 mb-3 shadow" />

            {/* The Search Pill (Types out dynamically: "🔍 Your Bottom Wear Matters More!") */}
            <div className="w-full max-w-xs bg-white border-2 border-black rounded-full py-2.5 px-4 flex items-center gap-2 shadow-sm z-20">
              <Search className="w-4 h-4 text-black flex-shrink-0" />
              <span className="text-xs font-bold text-black tracking-tight font-sans">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            {/* Horizontal Sliding Runway of Pants inside Phone Frame */}
            <div className="relative w-full h-[360px] flex items-center justify-center overflow-hidden my-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLower.id}
                  initial={{ opacity: 0, x: 140, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -140, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={currentLower.image}
                    alt={currentLower.name}
                    fill
                    className="object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.2)]"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Floating Price Pill */}
              <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded-full font-black text-xs font-display shadow-md">
                ₹{currentLower.price}
              </div>
            </div>

            {/* Phone Bottom Card: Brand Outro & Quick Add */}
            <div className="w-full bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm z-20 space-y-2.5 text-center">
              <div className="flex items-center justify-center gap-2">
                <span
                  className="w-3 h-3 rounded-full border border-black/20"
                  style={{ backgroundColor: currentLower.hex }}
                />
                <h4 className="text-xs sm:text-sm font-black uppercase text-black line-clamp-1">
                  {currentLower.name}
                </h4>
              </div>

              <div className="flex items-center justify-center gap-1.5">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-7 h-7 text-[10px] font-bold rounded-md border transition-all ${
                      selectedSize === sz
                        ? 'bg-black text-white border-black'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{added ? 'Added to Bag!' : `Add To Bag (₹${currentLower.price})`}</span>
              </button>
            </div>
          </div>

          {/* Dapper Looks / Bong99 Outro Note */}
          <div className="mt-8 text-center">
            <div className="font-display font-black text-xl tracking-tight text-black uppercase">
              BONG99 STREETWEAR • DAPPER LOOKS
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Available in 28 to 36 waist sizes with elasticated flex waistband.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
