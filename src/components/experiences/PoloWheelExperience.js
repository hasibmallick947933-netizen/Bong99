'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, ArrowRight, ShieldCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const POLO_ITEMS = [
  {
    id: 'polo-black',
    name: 'Classic Pique Heritage Polo',
    color: 'Obsidian Black',
    hex: '#111111',
    price: 189,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1625910513413-7e4526d152c7?w=800&auto=format&fit=crop&q=80',
    details: 'Heavy honeycomb pique weave with anti-curl reinforced collar. Pure luxury silhouette.',
  },
  {
    id: 'polo-white',
    name: 'Structured Snow Pique Polo',
    color: 'Crisp Snow White',
    hex: '#F8F9FA',
    price: 189,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80',
    details: 'Pristine optic white cotton with tailored 2-button front placket and ribbed cuff cuffs.',
  },
  {
    id: 'polo-maroon',
    name: 'Royal Heritage Maroon Polo',
    color: 'Deep Wine Maroon',
    hex: '#581825',
    price: 189,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
    details: 'Rich royal wine shade with pre-shrunk combed yarn. Exceptional color retention.',
  },
  {
    id: 'polo-navy',
    name: 'Twilight Executive Polo',
    color: 'Midnight Navy',
    hex: '#1A2A3A',
    price: 189,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    details: 'Versatile deep navy pique shirt with breathable micro-perforated cotton weave.',
  },
  {
    id: 'polo-green',
    name: 'Pine Forest Structured Polo',
    color: 'Forest Pine',
    hex: '#234433',
    price: 189,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
    details: 'Understated pine hue tailored for semi-formal events, work casual, and evening outings.',
  },
];

export default function PoloWheelExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const { addToCart } = useCart();
  const currentPolo = POLO_ITEMS[activeIndex];

  const nextColor = () => {
    setActiveIndex((prev) => (prev + 1) % POLO_ITEMS.length);
  };

  const prevColor = () => {
    setActiveIndex((prev) => (prev - 1 + POLO_ITEMS.length) % POLO_ITEMS.length);
  };

  const handleAddToCart = () => {
    addToCart(
      {
        _id: currentPolo.id,
        name: `${currentPolo.name} - ${currentPolo.color}`,
        price: currentPolo.price,
        originalPrice: currentPolo.originalPrice,
        images: [currentPolo.image],
        category: 'polo',
        slug: 'classic-pique-heritage-polo-black',
      },
      selectedSize,
      currentPolo.color,
      1
    );
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Typography & Specs (Reference Style) */}
          <div className="lg:col-span-6 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Polo Collection Experience
            </div>

            <div className="w-16 h-0.5 bg-amber-400" />

            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-display uppercase leading-none">
              PREMIUM QUALITY <br />
              <span className="text-amber-400">YOU CAN FEEL</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-lg">
              Crafted from 220 GSM heavyweight combed pique cotton with structured double-knit collars that never roll or lose shape.
            </p>

            <div className="pt-2 flex items-baseline gap-4">
              <span className="text-4xl sm:text-5xl font-black text-white font-display">
                ₹{currentPolo.price}
              </span>
              <span className="text-lg text-zinc-500 line-through">
                ₹{currentPolo.originalPrice}
              </span>
              <span className="px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 font-bold text-xs border border-amber-400/40">
                Polo Exclusive
              </span>
            </div>

            {/* Colorway Pills */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Colorway: <span className="text-amber-400">{currentPolo.color}</span>
              </span>
              <div className="flex items-center gap-3">
                {POLO_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      activeIndex === idx
                        ? 'border-amber-400 ring-4 ring-amber-400/30 scale-125'
                        : 'border-zinc-700 hover:scale-110'
                    }`}
                    style={{ backgroundColor: item.hex }}
                    aria-label={item.color}
                  />
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                Select Size
              </span>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-11 h-10 rounded-lg text-xs font-bold border transition-colors ${
                      selectedSize === sz
                        ? 'bg-amber-400 text-black border-amber-400'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="py-3.5 px-8 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Polo To Bag (₹{currentPolo.price})</span>
              </button>
              <Link
                href="/polo"
                className="py-3.5 px-6 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 border border-zinc-800"
              >
                <span>View Full Line</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Giant Rotating Circular Wheel (Reference: polo tshirt .png) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[500px] sm:min-h-[580px]">
            {/* Ambient Circular Glow */}
            <div className="absolute w-[440px] h-[440px] rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />

            {/* Wheel Arc Frame */}
            <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full border-4 border-zinc-800/80 p-6 flex items-center justify-center shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
              {/* Outer Circular Radial Items (Arc of Polos) */}
              {POLO_ITEMS.map((item, idx) => {
                const total = POLO_ITEMS.length;
                const offset = idx - activeIndex;
                const angle = offset * (360 / total);
                const rad = (angle * Math.PI) / 180;
                const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 130 : 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;

                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      x,
                      y,
                      scale: idx === activeIndex ? 1.25 : 0.8,
                      opacity: idx === activeIndex ? 1 : 0.45,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                    onClick={() => setActiveIndex(idx)}
                    className="absolute cursor-pointer"
                  >
                    <div
                      className={`relative w-20 h-24 sm:w-28 sm:h-36 rounded-2xl overflow-hidden shadow-2xl border-2 transition-all ${
                        idx === activeIndex
                          ? 'border-amber-400 ring-4 ring-amber-400/40 shadow-amber-400/20'
                          : 'border-zinc-700'
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                );
              })}

              {/* Central Hub Display of Selected Polo */}
              <div className="z-20 text-center pointer-events-none bg-zinc-950/90 border border-zinc-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md max-w-[200px]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {currentPolo.color}
                </div>
                <div className="text-sm font-black text-white font-display mt-0.5">
                  ₹{currentPolo.price}
                </div>
                <div className="text-[9px] text-zinc-400 mt-1">
                  100% Pique Cotton
                </div>
              </div>
            </div>

            {/* Vertical Wheel Step Buttons */}
            <div className="absolute right-0 flex flex-col gap-2 z-30">
              <button
                onClick={prevColor}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors shadow-lg"
                aria-label="Previous Polo"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <button
                onClick={nextColor}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors shadow-lg"
                aria-label="Next Polo"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
