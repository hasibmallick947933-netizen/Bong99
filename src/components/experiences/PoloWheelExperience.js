'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, ArrowRight, Instagram, RotateCw } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const POLO_ITEMS = [
  {
    id: 'polo-black',
    title: 'SUMMER VIBES',
    name: 'Obsidian Pique Heritage Polo',
    color: 'Obsidian Black',
    hex: '#141414',
    price: 189,
    originalPrice: 899,
    fabric: '220 GSM Honeycomb Heavy Pique Cotton',
    image: 'https://images.unsplash.com/photo-1625910513413-7e4526d152c7?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'polo-white',
    title: 'COASTAL CALM',
    name: 'Snow White Structured Polo',
    color: 'Pure White',
    hex: '#F8F9FA',
    price: 189,
    originalPrice: 899,
    fabric: '220 GSM Honeycomb Heavy Pique Cotton',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'polo-maroon',
    title: 'ROYAL HERITAGE',
    name: 'Deep Wine Heritage Polo',
    color: 'Wine Maroon',
    hex: '#5A1A24',
    price: 189,
    originalPrice: 899,
    fabric: '220 GSM Honeycomb Heavy Pique Cotton',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'polo-navy',
    title: 'OCEAN HORIZON',
    name: 'Twilight Navy Executive Polo',
    color: 'Midnight Navy',
    hex: '#1A2838',
    price: 189,
    originalPrice: 899,
    fabric: '220 GSM Honeycomb Heavy Pique Cotton',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'polo-olive',
    title: 'FOREST DRIFT',
    name: 'Pine Olive Structured Polo',
    color: 'Forest Olive',
    hex: '#2F4032',
    price: 189,
    originalPrice: 899,
    fabric: '220 GSM Honeycomb Heavy Pique Cotton',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
  },
];

export default function PoloWheelExperience() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const currentPolo = POLO_ITEMS[activeIndex];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Scroll directly drives the continuous physical rotation of the giant wheel!
  const wheelRotate = useTransform(scrollYProgress, [0, 1], [0, -360]);

  // Synchronize active polo item based on wheel position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        POLO_ITEMS.length - 1,
        Math.floor(v * POLO_ITEMS.length)
      );
      if (idx >= 0 && idx !== activeIndex) {
        setActiveIndex(idx);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

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
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#F7F4EE] text-[#1E1E1E]">
      {/* Pinned Sticky Section during scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-6 sm:py-8">
        {/* Top Minimalist Header */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs tracking-widest uppercase font-semibold text-zinc-500 border-b border-[#E0D9CF] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black" />
            <span>03 / POLO ROTATING WHEEL</span>
          </div>
          <div className="hidden sm:block text-[11px] text-zinc-400 tracking-normal font-sans">
            Scroll to rotate the radial colorway disc • 220 GSM Honeycomb Pique
          </div>
          <div className="font-mono font-bold text-black">
            ₹189 FLAT
          </div>
        </div>

        {/* Central Grid: Editorial Left + Giant Radial Wheel Right */}
        <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Exact Editorial Minimalist Layout from polo tshirt .png */}
          <div className="lg:col-span-5 space-y-5 z-10">
            <div className="w-16 h-0.5 bg-black" />

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase font-display leading-[0.95] tracking-tight text-black">
              PREMIUM <br />
              QUALITY YOU <br />
              CAN FEEL
            </h2>

            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600">
              <Instagram className="w-3.5 h-3.5 text-black" />
              <span>Bong99.Streetwear</span>
            </div>

            <div className="w-16 h-0.5 bg-black" />

            <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
              www.bong99.com
            </div>

            <div className="pt-1 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-mono font-black text-black">
                ₹{currentPolo.price}
              </span>
              <span className="text-sm font-mono text-zinc-400 line-through">
                ₹{currentPolo.originalPrice}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-zinc-200 text-zinc-800 rounded">
                {currentPolo.title}
              </span>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed font-sans max-w-sm">
              {currentPolo.fabric}. Tailored knit anti-curl collar, mother-of-pearl buttons, and structured side vents.
            </p>

            {/* Size Options */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-wider block">
                Select Size
              </span>
              <div className="flex gap-1.5">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-9 h-8 rounded text-xs font-bold border transition-colors ${
                      selectedSize === sz
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-zinc-800 border-[#DDD5CC] hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 pt-1">
              <button
                onClick={handleAddToCart}
                className="py-2.5 px-5 bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 active:scale-95 shadow-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{added ? 'Added to Bag!' : `Add To Bag (₹${currentPolo.price})`}</span>
              </button>
              <Link
                href="/polo"
                className="py-2.5 px-4 bg-white hover:bg-[#ECE4DB] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1 border border-[#DDD5CC]"
              >
                <span>Full Line</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Giant Rotating Circular Radial Wheel (Driven by Scroll) */}
          <div className="lg:col-span-7 relative flex items-center justify-center overflow-hidden min-h-[460px] sm:min-h-[560px]">
            {/* The Giant Rotating Radial Wheel */}
            <motion.div
              style={{ rotate: wheelRotate, transformOrigin: 'center center' }}
              className="relative w-[480px] h-[480px] sm:w-[580px] sm:h-[580px] md:w-[660px] md:h-[660px] rounded-full border-[10px] border-white shadow-2xl bg-[#EBE3D8] flex items-center justify-center flex-shrink-0"
            >
              {/* Radial Slices / Wedges */}
              {POLO_ITEMS.map((item, idx) => {
                const total = POLO_ITEMS.length;
                const sliceAngle = 360 / total;
                const rotation = idx * sliceAngle;

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {/* Wedge divider line */}
                    <div className="absolute top-0 w-1 h-1/2 bg-white origin-bottom transform -translate-x-1/2" />

                    {/* Garment inside radial slice */}
                    <div
                      className="absolute top-8 sm:top-12 flex flex-col items-center group-hover:scale-105 transition-transform"
                      style={{ transform: `rotate(${-rotation}deg)` }}
                    >
                      <div className="relative w-24 h-32 sm:w-32 sm:h-44 rounded-xl overflow-hidden shadow-lg border-2 border-white bg-white/80 p-1">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-1"
                        />
                        <div className="absolute bottom-1 inset-x-1 bg-black/80 text-white rounded text-[8px] font-bold text-center py-0.5">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Central Minimalist Hub */}
              <div className="relative z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border border-black/10 shadow-xl flex flex-col items-center justify-center text-center p-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  BONG99
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-black">
                  ₹189
                </span>
                <span className="text-[7px] uppercase tracking-wider text-zinc-600 font-semibold">
                  PIQUE WEAVE
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Minimalist Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] text-zinc-400 font-mono border-t border-[#E0D9CF] pt-3">
          <span>{activeIndex + 1} / {POLO_ITEMS.length} COLORWAYS</span>
          <span className="animate-pulse">SCROLL TO ROTATE WHEEL ↓</span>
        </div>
      </div>
    </div>
  );
}
