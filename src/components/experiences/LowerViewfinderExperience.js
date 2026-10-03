'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, ShoppingBag, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const LOWER_ITEMS = [
  {
    id: 'lower-track-sand',
    name: 'Baggy Street Track Pant (Race Piping)',
    color: 'Sand Beige',
    hex: '#D7C4B7',
    fit: 'Wide-Leg Street Drape',
    price: 179,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    details: 'Heavy loopback fleece with side athletic piping and deep zipper pockets.',
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
    details: 'Double front pleats, hidden elastic comfort waistband, and cuffed straight hem.',
  },
  {
    id: 'lower-cargo-olive',
    name: 'Combat Olive Tailored Trouser',
    color: 'Military Olive',
    hex: '#414D3C',
    fit: 'Structured Chino / Utility',
    price: 179,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    details: 'Double-button waistband closure, knife-pleat drape, and stretch twill.',
  },
  {
    id: 'lower-denim-blue',
    name: 'Vintage Straight-Fit Peached Denim',
    color: 'Washed Light Blue',
    hex: '#96B3CE',
    fit: 'Classic Baggy Denim Cut',
    price: 179,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80',
    details: 'Peached vintage light stone wash denim with reinforced bar-tacks.',
  },
];

export default function LowerViewfinderExperience() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [typedText, setTypedText] = useState('You');
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const currentLower = LOWER_ITEMS[activeIndex];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 1. Horizontal runway of pants gliding across the phone screen driven directly by scroll!
  const runwayX = useTransform(scrollYProgress, [0.05, 0.85], ['60%', '-200%']);

  // 2. Typing animation linked to scroll progress:
  // "Q You" -> "Q Your Bottom Wear Matter" -> "Q Your Bottom Wear Matters More!"
  const fullSentence = "Your Bottom Wear Matters More!";
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const charCount = Math.floor(v * fullSentence.length * 1.4);
      const text = fullSentence.slice(0, Math.min(fullSentence.length, Math.max(3, charCount)));
      setTypedText(text);

      // Also sync active pant item based on scroll segment
      const itemIdx = Math.min(
        LOWER_ITEMS.length - 1,
        Math.floor(v * LOWER_ITEMS.length * 1.1)
      );
      if (itemIdx >= 0 && itemIdx !== activeIndex) {
        setActiveIndex(itemIdx);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  // 3. Outro logo inside phone fades in near end of scroll (0.85 -> 1.0)
  const outroOpacity = useTransform(scrollYProgress, [0.85, 0.98], [0, 1]);
  const outroScale = useTransform(scrollYProgress, [0.85, 0.98], [0.9, 1]);

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
    <div ref={containerRef} className="relative h-[250vh] bg-white text-black">
      {/* Pinned Sticky Viewport during scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-6 sm:py-8">
        {/* Minimalist Top Indicator */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs tracking-widest uppercase font-semibold text-zinc-500 border-b border-zinc-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black" />
            <span>02 / LOWERS RUNWAY VIEWFINDER</span>
          </div>
          <div className="hidden sm:block text-[11px] text-zinc-400 tracking-normal font-sans">
            Scroll to glide bottom wear through the device viewfinder
          </div>
          <div className="font-mono font-bold text-black">
            ₹179 FLAT
          </div>
        </div>

        {/* Central Smartphone Silhouette (Exact recreation of lower page.mov) */}
        <div className="max-w-md mx-auto w-full my-auto flex flex-col items-center">
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[520px] sm:h-[580px] rounded-[48px] border-[5px] border-black bg-[#FAFAFA] p-5 shadow-2xl flex flex-col items-center justify-between overflow-hidden">
            {/* Top Device Speaker Notch */}
            <div className="w-18 h-3.5 bg-black rounded-b-xl -mt-5 mb-2 shadow" />

            {/* The Typing Search Pill (Driven by scroll) */}
            <div className="w-full max-w-[280px] bg-white border border-black/80 rounded-full py-2 px-3.5 flex items-center gap-2 shadow-sm z-20">
              <Search className="w-3.5 h-3.5 text-black flex-shrink-0" />
              <span className="text-[11px] font-bold text-black tracking-tight font-sans truncate">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>

            {/* Viewfinder Window: Horizontal Track of Sliding Pants */}
            <div className="relative w-full h-[320px] flex items-center justify-center overflow-hidden my-auto">
              <motion.div
                style={{ x: runwayX }}
                className="flex items-center gap-16 absolute left-0"
              >
                {LOWER_ITEMS.map((item, idx) => (
                  <div
                    key={item.id}
                    className="relative w-[240px] sm:w-[260px] h-[300px] flex-shrink-0 flex items-center justify-center cursor-pointer"
                    onClick={() => setActiveIndex(idx)}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.18)]"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </motion.div>

              {/* End of Scroll Outro inside phone (Ref: lower_frame_6.jpg - Bong99 Dapper Looks) */}
              <motion.div
                style={{ opacity: outroOpacity, scale: outroScale }}
                className="absolute inset-0 bg-[#FAFAFA] z-30 flex flex-col items-center justify-center text-center p-6"
              >
                <div className="font-display font-black text-3xl tracking-tight text-black uppercase">
                  BONG99
                </div>
                <div className="text-[10px] tracking-widest uppercase font-bold text-zinc-600 mt-1">
                  DAPPER LOOKS • BOTTOM WEAR
                </div>
                <div className="w-8 h-0.5 bg-black my-3" />
                <div className="text-xl font-mono font-bold text-black">
                  ₹179
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">
                  100% Cotton Loopback & Peached Denim
                </p>
              </motion.div>
            </div>

            {/* Bottom Quick-Add & Spec Card */}
            <div className="w-full bg-white border border-zinc-200 rounded-2xl p-3.5 shadow-sm z-20 space-y-2 text-center">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 font-bold uppercase truncate max-w-[200px]">
                  <span
                    className="w-2 h-2 rounded-full border border-black/20 flex-shrink-0"
                    style={{ backgroundColor: currentLower.hex }}
                  />
                  <span className="truncate">{currentLower.color} • {currentLower.fit}</span>
                </div>
                <span className="font-mono font-bold text-black">
                  ₹{currentLower.price}
                </span>
              </div>

              {/* Size Buttons */}
              <div className="flex items-center justify-center gap-1">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-7 h-6 text-[10px] font-bold rounded border transition-all ${
                      selectedSize === sz
                        ? 'bg-black text-white border-black'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2 bg-black hover:bg-zinc-800 text-white font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>{added ? 'Added!' : `Add to Bag (₹${currentLower.price})`}</span>
                </button>
                <Link
                  href="/lowers"
                  className="px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-black rounded-xl text-[11px] font-bold flex items-center justify-center"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Minimalist Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] text-zinc-400 font-mono border-t border-zinc-200 pt-3">
          <span>STYLE {activeIndex + 1} OF {LOWER_ITEMS.length}</span>
          <span className="animate-pulse">SCROLL TO ADVANCE RUNWAY ↓</span>
        </div>
      </div>
    </div>
  );
}
