'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const PLAIN_TEES = [
  {
    id: 'plain-white',
    name: "Bong99 Essential Tee (Snow White)",
    colorName: 'Pure White',
    hex: '#F8F9FA',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
  },
  {
    id: 'plain-navy',
    name: "Bong99 Essential Tee (Midnight Navy)",
    colorName: 'Midnight Navy',
    hex: '#1E293B',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
  },
  {
    id: 'plain-black',
    name: "Bong99 Essential Tee (Obsidian Black)",
    colorName: 'Obsidian Black',
    hex: '#141416',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
  },
  {
    id: 'plain-olive',
    name: "Bong99 Essential Tee (Deep Forest)",
    colorName: 'Military Olive',
    hex: '#3E4E39',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
  },
  {
    id: 'plain-sand',
    name: "Bong99 Essential Tee (Desert Dune)",
    colorName: 'Desert Sand',
    hex: '#D7C4B7',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
  },
  {
    id: 'plain-charcoal',
    name: "Bong99 Essential Tee (Charcoal Slate)",
    colorName: 'Charcoal Slate',
    hex: '#52525B',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
  },
  {
    id: 'plain-rust',
    name: "Bong99 Essential Tee (Port Rust)",
    colorName: 'Port Rust',
    hex: '#7A3B39',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
  },
];

export default function PlainTeeRackExperience() {
  const containerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const activeTee = PLAIN_TEES[selectedIndex];

  // Scroll tracking for container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Scroll animations:
  // As user scrolls through the 250vh pinned container:
  // 1. Rack slightly zooms and shifts upward (0 -> 0.4)
  const rackScale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.95, 0.9]);
  const rackOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 0.85, 0.4]);

  // 2. Front featured garment lifts from rack down into central spotlight (0.2 -> 0.7)
  const spotlightY = useTransform(scrollYProgress, [0.1, 0.6], [80, 0]);
  const spotlightScale = useTransform(scrollYProgress, [0.1, 0.6], [0.85, 1]);
  const spotlightOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);

  // 3. Detail card fades in gracefully
  const detailsOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const detailsY = useTransform(scrollYProgress, [0.3, 0.6], [30, 0]);

  // Sync scroll progress with colorway cycling if user scrolls naturally
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        PLAIN_TEES.length - 1,
        Math.floor(v * PLAIN_TEES.length)
      );
      if (idx !== selectedIndex && idx >= 0) {
        setSelectedIndex(idx);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, selectedIndex]);

  const handleAddToCart = () => {
    addToCart(
      {
        _id: activeTee.id,
        name: activeTee.name,
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
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div ref={containerRef} className="relative h-[220vh] bg-[#F7F5F0] text-[#1E1C1A]">
      {/* Sticky Viewport pinned during scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-6 sm:py-10">
        {/* Minimalist Studio Top Label */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs tracking-widest uppercase font-semibold text-[#666057] border-b border-[#E3DDD3] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1E1C1A]" />
            <span>01 / BONG99 ESSENTIALS</span>
          </div>
          <div className="hidden sm:block text-[11px] text-[#8C8478] tracking-normal font-sans">
            Scroll to lift shirt from rack • 180 GSM Bio-Washed Cotton
          </div>
          <div className="font-mono font-bold text-[#1E1C1A]">
            ₹99 FLAT
          </div>
        </div>

        {/* Central Stage: Rack + Spotlight */}
        <div className="max-w-6xl mx-auto w-full my-auto flex flex-col items-center justify-center">
          {/* Clothing Rack Stand (Pins and scales on scroll) */}
          <motion.div
            style={{ scale: rackScale, opacity: rackOpacity }}
            className="w-full max-w-4xl relative mb-4 sm:mb-6"
          >
            {/* Minimalist White Metal Arch Rail */}
            <div className="relative mx-auto w-[94%] sm:w-[90%] h-3 bg-gradient-to-b from-white via-[#EFEFEF] to-[#D0D0D0] rounded-full shadow-sm border border-[#C5BFB8] z-20 flex items-center justify-between px-6">
              <div className="w-2.5 h-2.5 rounded-full bg-[#3F3D3B]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#3F3D3B]" />
            </div>

            {/* Clothes Rack Row of Folded / Hanging T-Shirts */}
            <div className="relative z-30 flex items-start justify-center gap-2 sm:gap-4 md:gap-5 pt-1.5 pb-2 overflow-x-auto no-scrollbar">
              {PLAIN_TEES.map((tee, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={tee.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`group relative flex flex-col items-center flex-shrink-0 transition-all duration-300 focus:outline-none ${
                      isSelected ? '-translate-y-2 scale-105' : 'opacity-70 hover:opacity-100 hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Metal Hook */}
                    <div className="w-4 h-6 border-t-2 border-r-2 border-[#555] rounded-tr-full transform -rotate-45 mb-0.5" />
                    {/* Wooden Hanger Shoulder */}
                    <div className="w-14 sm:w-20 md:w-24 h-2.5 bg-[#D2A679] rounded-t-sm shadow-sm -mb-0.5 z-10" />

                    {/* Hanging Garment */}
                    <div
                      className={`relative w-14 sm:w-20 md:w-24 h-24 sm:h-32 md:h-36 rounded-b-lg overflow-hidden shadow-md transition-all border ${
                        isSelected
                          ? 'border-[#1E1C1A] ring-2 ring-[#1E1C1A]/20 shadow-lg'
                          : 'border-white/80'
                      }`}
                    >
                      <Image
                        src={tee.image}
                        alt={tee.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 60px, 100px"
                      />
                      <div
                        className="absolute inset-0 opacity-15"
                        style={{ backgroundColor: tee.hex }}
                      />
                    </div>

                    {/* Color dot */}
                    <span
                      className={`mt-1.5 w-2 h-2 rounded-full border border-black/20 ${
                        isSelected ? 'ring-2 ring-[#1E1C1A]' : ''
                      }`}
                      style={{ backgroundColor: tee.hex }}
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Spotlight Presentation: Shirt lifts into hero view on scroll */}
          <motion.div
            style={{
              y: spotlightY,
              scale: spotlightScale,
              opacity: spotlightOpacity,
            }}
            className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl border border-[#E3DDD3] p-5 sm:p-8 shadow-xl grid grid-cols-1 sm:grid-cols-12 gap-6 items-center"
          >
            {/* Left: Cutout Garment Image */}
            <div className="sm:col-span-5 relative h-56 sm:h-72 w-full rounded-xl bg-[#FAF8F5] border border-[#ECE5DC] flex items-center justify-center p-2 overflow-hidden">
              <Image
                src={activeTee.image}
                alt={activeTee.name}
                fill
                className="object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.12)] p-2 transition-all duration-300"
                priority
              />
              <div className="absolute top-2.5 left-2.5 bg-[#1E1C1A] text-white px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold">
                ₹{activeTee.price}
              </div>
              <div className="absolute bottom-2.5 left-2.5 bg-white/95 border border-[#E3DDD3] text-[#1E1C1A] px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full border border-black/20"
                  style={{ backgroundColor: activeTee.hex }}
                />
                <span>{activeTee.colorName}</span>
              </div>
            </div>

            {/* Right: Garment Editorial Specifications */}
            <motion.div
              style={{ opacity: detailsOpacity, y: detailsY }}
              className="sm:col-span-7 space-y-4"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7D766C]">
                  UGMONK & BAFK DESIGN SYSTEM
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#1E1C1A] font-display mt-0.5 tracking-tight">
                  {activeTee.name}
                </h3>
                <div className="flex items-baseline gap-3 mt-1.5">
                  <span className="text-2xl font-black font-mono text-[#1E1C1A]">
                    ₹{activeTee.price}
                  </span>
                  <span className="text-xs text-[#8C8478] line-through font-mono">
                    ₹{activeTee.originalPrice}
                  </span>
                  <span className="text-[10px] bg-zinc-100 text-[#1E1C1A] px-2 py-0.5 rounded-full font-semibold border border-[#DDD]">
                    Factory Direct
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#5C564E] leading-relaxed">
                {activeTee.fabric}. Reinforced anti-curl rib collar, double-needle stitched sleeves, and clean drape.
              </p>

              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-1.5 text-[10px] uppercase tracking-wider text-[#666057] font-semibold">
                  <span>Select Size</span>
                  <span className="font-mono text-[#8C8478]">True To Size</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        selectedSize === sz
                          ? 'bg-[#1E1C1A] text-white border-[#1E1C1A]'
                          : 'bg-white text-[#333] border-[#DDD5CC] hover:border-[#1E1C1A]'
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
                  className="flex-1 py-2.5 px-4 bg-[#1E1C1A] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{added ? 'Added to Bag!' : `Add To Bag (₹${activeTee.price})`}</span>
                </button>
                <Link
                  href="/plain-tshirts"
                  className="py-2.5 px-4 bg-white hover:bg-[#F2ECE5] text-[#1E1C1A] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1 border border-[#D5CCC1]"
                >
                  <span>Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] text-[#7A746C] font-mono border-t border-[#E3DDD3] pt-3">
          <span>{selectedIndex + 1} / {PLAIN_TEES.length} COLORWAYS</span>
          <span className="animate-pulse">SCROLL DOWN TO REVEAL NEXT STAGE ↓</span>
        </div>
      </div>
    </div>
  );
}
