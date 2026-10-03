'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const PLAIN_TEES = [
  {
    id: 'plain-white',
    name: "Bong99 Essential Tee (Snow White)",
    colorName: 'Pure White',
    hex: '#F8F9FA',
    hangerColor: '#D4AF37',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    tag: 'BESTSELLER',
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
    features: ['Zero shrinkage', 'Pre-shrunk double rib collar', 'Opaque heavyweight drape'],
  },
  {
    id: 'plain-navy',
    name: "Bong99 Essential Tee (Midnight Navy)",
    colorName: 'Midnight Navy',
    hex: '#1E293B',
    hangerColor: '#C0C0C0',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    tag: 'ESSENTIAL',
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
    features: ['Deep reactive indigo dye', 'Reinforced neck tape', 'Fade resistant 50+ washes'],
  },
  {
    id: 'plain-black',
    name: "Bong99 Essential Tee (Obsidian Black)",
    colorName: 'Obsidian Black',
    hex: '#141416',
    hangerColor: '#D4AF37',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    tag: 'CLASSIC',
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
    features: ['Ultra-dense jet black finish', 'No linting', 'Tailored relaxed shoulder'],
  },
  {
    id: 'plain-olive',
    name: "Bong99 Essential Tee (Deep Forest / Olive)",
    colorName: 'Military Olive',
    hex: '#3E4E39',
    hangerColor: '#C0C0C0',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    tag: 'EARTH TONE',
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
    features: ['Organic mineral wash', 'Streetwear drop shoulder', 'Ultra-breathable weave'],
  },
  {
    id: 'plain-sand',
    name: "Bong99 Essential Tee (Desert Dune Sand)",
    colorName: 'Desert Sand',
    hex: '#D7C4B7',
    hangerColor: '#D4AF37',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    tag: 'MINIMAL',
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
    features: ['Warm neutral palette', 'Perfect for layering', 'Silky bio-soft touch'],
  },
  {
    id: 'plain-charcoal',
    name: "Bong99 Essential Tee (Charcoal Slate)",
    colorName: 'Charcoal Slate',
    hex: '#52525B',
    hangerColor: '#C0C0C0',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    tag: 'CORE',
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
    features: ['Heathered combed yarn', 'Moisture wicking', 'Zero twist yarn softness'],
  },
  {
    id: 'plain-rust',
    name: "Bong99 Essential Tee (Port Wine Rust)",
    colorName: 'Port Rust',
    hex: '#7A3B39',
    hangerColor: '#D4AF37',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
    price: 99,
    originalPrice: 499,
    tag: 'SIGNATURE',
    fabric: '100% Super Combed Bio-Washed Cotton • 180 GSM',
    features: ['Rich terracotta tone', 'Enzyme bio-polish', 'Signature Bong99 fit'],
  },
];

export default function PlainTeeRackExperience() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const activeTee = PLAIN_TEES[selectedIndex];

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
    <section className="relative bg-[#EDE6DF] text-[#1F1E1D] pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500">
      {/* Background Soft Studio Ambience */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#E2D7CE]/70 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Editorial Header - Exactly matching "BAFK AD SERIE" / "UGMONK" studio style */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1E1D]/5 border border-[#1F1E1D]/15 text-[#1F1E1D] text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            BONG99 ESSENTIALS / AD SERIE
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase font-display text-[#1F1E1D]">
            PLAIN T-SHIRTS <span className="text-amber-800">₹99</span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-[#5A5652] max-w-2xl mx-auto leading-relaxed font-sans">
            Her türlü ortamda rahatlıkla giyebileceğiniz premium 180 GSM bio-washed combed cotton plain tees. 
            Collar ribbing that never curls, ultra-dense colorways, and comfortable everyday luxury.
          </p>
        </div>

        {/* The Realistic Wardrobe Clothing Rack (Ref: plan tshirt page 2.png & plane tshirt page .png) */}
        <div className="relative max-w-5xl mx-auto mb-14">
          {/* Clothing Rack Stand Frame */}
          <div className="relative pt-6">
            {/* White Metal Top Arch Rail */}
            <div className="relative mx-auto w-[92%] sm:w-[88%] h-4 bg-gradient-to-b from-white via-[#EFEFEF] to-[#D5D5D5] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-[#C5BFB8] z-20 flex items-center justify-between px-4 sm:px-8">
              <div className="w-3.5 h-3.5 rounded-full bg-[#3F3D3B] shadow-inner" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#3F3D3B] shadow-inner" />
            </div>

            {/* Left and Right Vertical Rack Legs */}
            <div className="absolute top-7 left-[4%] sm:left-[6%] w-2 sm:w-2.5 h-64 bg-gradient-to-r from-[#D0CBC5] via-white to-[#BFB9B2] rounded-b shadow-md z-10" />
            <div className="absolute top-7 right-[4%] sm:right-[6%] w-2 sm:w-2.5 h-64 bg-gradient-to-r from-[#D0CBC5] via-white to-[#BFB9B2] rounded-b shadow-md z-10" />

            {/* Clothes Rack Row of Folded / Hanging T-Shirts */}
            <div className="relative z-30 flex items-start justify-center gap-2 sm:gap-4 md:gap-5 pt-2 pb-6 overflow-x-auto no-scrollbar px-4">
              {PLAIN_TEES.map((tee, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={tee.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`group relative flex flex-col items-center flex-shrink-0 transition-all duration-300 focus:outline-none ${
                      isSelected ? '-translate-y-3 scale-105' : 'opacity-85 hover:opacity-100 hover:-translate-y-1'
                    }`}
                    aria-label={`Select ${tee.name}`}
                  >
                    {/* Metal Hook connected to rail */}
                    <div className="w-5 h-7 border-t-2 border-r-2 border-[#555] rounded-tr-full transform -rotate-45 mb-0.5" />

                    {/* Natural Wooden / Metallic Hanger Shoulder */}
                    <div className="w-16 sm:w-24 md:w-28 h-3.5 bg-gradient-to-b from-[#DEB887] via-[#D2A679] to-[#A0522D] rounded-t-lg shadow-sm border border-[#8B4513]/40 -mb-1 z-10" />

                    {/* Hanging T-Shirt Body on Rack */}
                    <div
                      className={`relative w-16 sm:w-24 md:w-28 h-28 sm:h-40 md:h-48 rounded-b-xl overflow-hidden shadow-xl transition-all duration-300 border-2 ${
                        isSelected
                          ? 'border-amber-800 ring-4 ring-amber-700/20 shadow-2xl'
                          : 'border-white/60 hover:border-white'
                      }`}
                    >
                      <Image
                        src={tee.image}
                        alt={tee.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 70px, 120px"
                      />
                      {/* Tint overlay matching garment color */}
                      <div
                        className="absolute inset-0 opacity-15"
                        style={{ backgroundColor: tee.hex }}
                      />

                      {/* Active indicator badge */}
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 bg-amber-800 text-white rounded-full p-0.5 shadow">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>

                    {/* Swatch Dot & Color Name */}
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full border border-black/20 shadow-sm"
                        style={{ backgroundColor: tee.hex }}
                      />
                      <span className="text-[10px] font-semibold text-[#3F3D3B] hidden md:inline">
                        {tee.colorName}
                      </span>
                    </div>

                    <span className="text-[11px] font-black text-amber-900 mt-0.5 font-display">
                      ₹{tee.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Garment Spotlight (Glide from Rack to Front Inspection) */}
        <div className="max-w-4xl mx-auto bg-white/85 backdrop-blur-md border border-[#DCD3C9] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Front Cutout View of Selected Shirt */}
            <div className="md:col-span-6 relative h-80 sm:h-96 w-full rounded-2xl bg-[#F8F5F2] border border-[#E8DFD5] flex items-center justify-center p-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTee.id}
                  initial={{ opacity: 0, scale: 0.9, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeTee.image}
                    alt={activeTee.name}
                    fill
                    className="object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
                    priority
                  />

                  {/* Brand Price Pill */}
                  <div className="absolute top-3 left-3 bg-[#1F1E1D] text-white px-3 py-1 rounded-full font-black text-xs tracking-wider shadow">
                    ₹{activeTee.price}
                  </div>

                  {/* Tag Pill */}
                  <div className="absolute top-3 right-3 bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wider uppercase">
                    {activeTee.tag}
                  </div>

                  {/* Color name badge */}
                  <div className="absolute bottom-3 left-3 bg-white/95 border border-[#DDD4CB] text-[#1F1E1D] px-3 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: activeTee.hex }}
                    />
                    <span>{activeTee.colorName}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Garment Editorial Specifications & Instant Ordering */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-900">
                  UGMONK & BAFK DESIGN LANGUAGE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1F1E1D] font-display uppercase mt-0.5">
                  {activeTee.name}
                </h3>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-3xl font-black text-amber-900 font-display">
                    ₹{activeTee.price}
                  </span>
                  <span className="text-sm text-[#88837E] line-through">
                    ₹{activeTee.originalPrice}
                  </span>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                    SAVE 80% (DIRECT FACTORY)
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#55504A] leading-relaxed">
                {activeTee.fabric}. Custom knit collar that remains crisp after heavy use. Designed for minimalist everyday wear.
              </p>

              {/* Color Swatch Selection Bar */}
              <div>
                <label className="text-[11px] font-bold text-[#3F3D3B] uppercase tracking-wider block mb-2">
                  Select Colorway ({activeTee.colorName})
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {PLAIN_TEES.map((tee, idx) => (
                    <button
                      key={tee.id}
                      onClick={() => setSelectedIndex(idx)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${
                        selectedIndex === idx
                          ? 'scale-125 border-amber-900 ring-2 ring-amber-900/30'
                          : 'border-white hover:scale-110 shadow-sm'
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
                  <label className="text-[11px] font-bold text-[#3F3D3B] uppercase tracking-wider">
                    Select Fit Size
                  </label>
                  <span className="text-[10px] text-[#7A7570] font-medium">True To Size / Regular Fit</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        selectedSize === sz
                          ? 'bg-[#1F1E1D] text-white border-[#1F1E1D] shadow'
                          : 'bg-white text-[#3F3D3B] border-[#DDD5CC] hover:border-[#1F1E1D]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Bag and Catalog actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 bg-[#1F1E1D] hover:bg-black text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{added ? 'Added to Bag!' : `Add to Bag (₹${activeTee.price})`}</span>
                </button>
                <Link
                  href="/plain-tshirts"
                  className="py-3 px-5 bg-white hover:bg-[#F2ECE5] text-[#1F1E1D] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-[#D5CCC1]"
                >
                  <span>All ₹99</span>
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
