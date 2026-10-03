'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, RotateCw, Sparkles, Check, Instagram, Globe } from 'lucide-react';
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
    description: 'Structured 220 GSM pique knit with non-curling collar and pearlized buttons.',
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
    description: 'Crisp optic white cotton with double-layer placket and ribbed sleeve cuffs.',
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
    description: 'Rich royal wine shade with pre-shrunk combed yarn and reinforced side slits.',
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
    description: 'Versatile deep navy pique shirt with breathable micro-perforated cotton weave.',
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
    description: 'Tactical earth-tone polo shirt tailored for semi-formal layering and evening wear.',
  },
];

export default function PoloWheelExperience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [wheelRotation, setWheelRotation] = useState(0);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const currentPolo = POLO_ITEMS[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % POLO_ITEMS.length);
    setWheelRotation((prev) => prev - (360 / POLO_ITEMS.length));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + POLO_ITEMS.length) % POLO_ITEMS.length);
    setWheelRotation((prev) => prev + (360 / POLO_ITEMS.length));
  };

  const handleSelectSlice = (idx) => {
    const diff = idx - activeIndex;
    setActiveIndex(idx);
    setWheelRotation((prev) => prev - diff * (360 / POLO_ITEMS.length));
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
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#F4EFEA] text-[#1E1E1E] overflow-hidden border-t border-[#DDD6CD]">
      {/* Background Subtle Paper Texture */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#D6CFC4_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Exact Editorial Layout from polo tshirt .png */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/15 text-black text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              POLO T-SHIRT COLLECTION
            </div>

            {/* Horizontal rule from reference */}
            <div className="w-24 h-0.5 bg-black" />

            {/* Editorial Headline exactly matching reference */}
            <h2 className="text-4xl sm:text-6xl font-black uppercase font-display leading-[0.95] tracking-tight text-black">
              PREMIUM <br />
              QUALITY YOU <br />
              CAN FEEL
            </h2>

            {/* Social handle matching reference: 📸 Prospera.Clothing -> Bong99.Streetwear */}
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-700">
              <Instagram className="w-4 h-4 text-black" />
              <span>Bong99.Streetwear</span>
            </div>

            {/* Horizontal rule from reference */}
            <div className="w-24 h-0.5 bg-black" />

            {/* Website URL from reference */}
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-600">
              www.bong99.com
            </div>

            {/* Garment Price & Spec */}
            <div className="pt-2 flex items-baseline gap-4">
              <span className="text-4xl sm:text-5xl font-black text-black font-display">
                ₹{currentPolo.price}
              </span>
              <span className="text-lg text-zinc-500 line-through">
                ₹{currentPolo.originalPrice}
              </span>
              <span className="text-xs px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 font-bold rounded-full">
                FACTORY DIRECT
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
              {currentPolo.fabric}. Tailored knit anti-curl collar, mother-of-pearl buttons, and structured side vents.
            </p>

            {/* Color Swatches */}
            <div>
              <span className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider block mb-2">
                Colorway: <strong>{currentPolo.color}</strong> ({currentPolo.title})
              </span>
              <div className="flex items-center gap-3">
                {POLO_ITEMS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectSlice(idx)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      activeIndex === idx
                        ? 'scale-125 border-black ring-2 ring-black/30'
                        : 'border-white hover:scale-110 shadow-sm'
                    }`}
                    style={{ backgroundColor: item.hex }}
                    title={item.color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <span className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider block mb-2">
                Select Size
              </span>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-10 h-9 rounded-lg text-xs font-bold border transition-colors ${
                      selectedSize === sz
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-zinc-800 border-zinc-300 hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                onClick={handleAddToCart}
                className="py-3 px-6 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{added ? 'Added to Bag!' : `Add To Bag (₹${currentPolo.price})`}</span>
              </button>
              <button
                onClick={handleNext}
                className="py-3 px-5 bg-white hover:bg-[#EAE4DC] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-zinc-300"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Rotate Wheel</span>
              </button>
            </div>
          </div>

          {/* Right Column: Giant Rotating Circular Wheel (Ref: polo tshirt .png) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[520px] sm:min-h-[620px] overflow-hidden">
            {/* The Giant Circular Disc Wheel */}
            <motion.div
              animate={{ rotate: wheelRotation }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="relative w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] md:w-[700px] md:h-[700px] rounded-full border-[12px] border-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] bg-[#EBE4DC] flex items-center justify-center flex-shrink-0"
              style={{ transformOrigin: 'center center' }}
            >
              {/* Radial Slices / Wedges */}
              {POLO_ITEMS.map((item, idx) => {
                const total = POLO_ITEMS.length;
                const sliceAngle = 360 / total;
                const rotation = idx * sliceAngle;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectSlice(idx)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {/* Wedge divider line */}
                    <div className="absolute top-0 w-1.5 h-1/2 bg-white origin-bottom transform -translate-x-1/2" />

                    {/* Garment inside the slice */}
                    <div
                      className="absolute top-8 sm:top-12 flex flex-col items-center group-hover:scale-105 transition-transform"
                      style={{ transform: `rotate(${-rotation - wheelRotation}deg)` }}
                    >
                      <div className="relative w-28 h-36 sm:w-36 sm:h-48 rounded-xl overflow-hidden shadow-xl border-2 border-white bg-white/70">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                        <div className="absolute bottom-1 inset-x-1 bg-black/80 text-white rounded text-[9px] font-bold text-center py-0.5">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Central Metallic Hub */}
              <div className="relative z-30 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white border-4 border-black/15 shadow-2xl flex flex-col items-center justify-center text-center p-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">
                  BONG99
                </span>
                <span className="text-xs sm:text-sm font-black font-display text-black">
                  ₹189
                </span>
                <span className="text-[8px] uppercase tracking-wider text-amber-800 font-bold">
                  PIQUE WEAVE
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
