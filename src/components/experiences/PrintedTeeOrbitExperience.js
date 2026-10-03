'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, ArrowRight, Sun, Moon } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const GRAPHIC_TEES = [
  {
    id: 'orbit-cyber-bear',
    name: 'Never Give Up Cyber Bear Drop',
    graphic: 'Cyber Bear 3D',
    frontGraphic: 'NEVER GIVE UP',
    color: 'Midnight Black',
    hex: '#161616',
    price: 149,
    originalPrice: 699,
    imageBack: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
    imageFront: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    angle: 0,
  },
  {
    id: 'orbit-panda-what',
    name: 'Tokyo Bamboo Panda "What?"',
    graphic: 'Rave Panda GFX',
    frontGraphic: 'What?',
    color: 'Lilac Smoke',
    hex: '#D1C4E9',
    price: 149,
    originalPrice: 699,
    imageBack: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    imageFront: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    angle: 36,
  },
  {
    id: 'orbit-feel-good',
    name: 'Feel Good Acid Neon Teddy',
    graphic: 'Neon Splatter Art',
    frontGraphic: 'FEEL GOOD',
    color: 'Charcoal Grey',
    hex: '#4A4A4A',
    price: 149,
    originalPrice: 699,
    imageBack: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    imageFront: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    angle: 72,
  },
  {
    id: 'orbit-smile-acid',
    name: 'Rebel Smile Acid Grunge',
    graphic: 'Rebel Smile GFX',
    frontGraphic: 'SMILE YOURSELF',
    color: 'Snow White',
    hex: '#F8F9FA',
    price: 149,
    originalPrice: 699,
    imageBack: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    imageFront: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    angle: 108,
  },
  {
    id: 'orbit-lets-rock',
    name: "Let's Rock Metal Teddy",
    graphic: 'Heavy Metal Bear',
    frontGraphic: "LET'S ROCK!",
    color: 'Vintage Rose',
    hex: '#C48B9F',
    price: 149,
    originalPrice: 699,
    imageBack: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80',
    imageFront: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80',
    angle: 144,
  },
  {
    id: 'orbit-life-culture',
    name: 'Cyberpunk Mask Life Culture',
    graphic: 'Cyber Mask GFX',
    frontGraphic: 'STYLE CULTURE',
    color: 'Washed Teal',
    hex: '#6B8E8E',
    price: 149,
    originalPrice: 699,
    imageBack: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
    imageFront: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
    angle: 180,
  },
  {
    id: 'orbit-bamboo-panda',
    name: 'Harajuku Bamboo Panda',
    graphic: 'Bamboo Panda GFX',
    frontGraphic: 'BAMBOO',
    color: 'Sage Pistachio',
    hex: '#A2B997',
    price: 149,
    originalPrice: 699,
    imageBack: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    imageFront: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
    angle: 216,
  },
  {
    id: 'orbit-retro-camo',
    name: 'Urban Tactical Camo Bear',
    graphic: 'Tactical Cyber GFX',
    frontGraphic: 'TACTICAL',
    color: 'Port Rust',
    hex: '#7A3B39',
    price: 149,
    originalPrice: 699,
    imageBack: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
    imageFront: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
    angle: 252,
  },
  {
    id: 'orbit-skater-bear',
    name: 'Subway Skate Club Bear',
    graphic: 'Subway Graffiti GFX',
    frontGraphic: 'SKATE CLUB',
    color: 'Powder Blue',
    hex: '#A0BED9',
    price: 149,
    originalPrice: 699,
    imageBack: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    imageFront: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    angle: 288,
  },
  {
    id: 'orbit-cyber-future',
    name: 'Future World Holographic',
    graphic: 'Holo Cyber GFX',
    frontGraphic: 'FUTURE WORLD',
    color: 'Jet Black',
    hex: '#141416',
    price: 149,
    originalPrice: 699,
    imageBack: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    imageFront: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    angle: 324,
  },
];

export default function PrintedTeeOrbitExperience({ initialTheme = 'white' }) {
  const containerRef = useRef(null);
  const [isWhiteTheme, setIsWhiteTheme] = useState(initialTheme === 'white');
  const [isFrontView, setIsFrontView] = useState(false);
  const [selectedTee, setSelectedTee] = useState(GRAPHIC_TEES[0]);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 1. Tag 3D Flip linked to scroll:
  const tagRotateY = useTransform(scrollYProgress, [0.2, 0.6], [0, 180]);
  const tagSwingZ = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 6, -2]);

  // 2. T-Shirts Orbit Ring rotation linked to scroll:
  const orbitRotation = useTransform(scrollYProgress, [0, 1], [0, 240]);

  // 3. Auto-flip t-shirt display (back graphics vs front collars) based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setIsFrontView(v > 0.45);
      const teeIdx = Math.min(
        GRAPHIC_TEES.length - 1,
        Math.floor(v * GRAPHIC_TEES.length)
      );
      if (teeIdx >= 0 && teeIdx !== GRAPHIC_TEES.indexOf(selectedTee)) {
        setSelectedTee(GRAPHIC_TEES[teeIdx]);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, selectedTee]);

  const handleAddToCart = () => {
    addToCart(
      {
        _id: selectedTee.id,
        name: selectedTee.name,
        price: selectedTee.price,
        originalPrice: selectedTee.originalPrice,
        images: [isFrontView ? selectedTee.imageFront : selectedTee.imageBack],
        category: 'printed-tshirts',
        slug: 'never-give-up-cyber-bear-tee',
      },
      'L',
      selectedTee.color,
      1
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const bgClass = isWhiteTheme ? 'bg-[#F3F4F6] text-zinc-900' : 'bg-[#121316] text-white';
  const tagBg = isWhiteTheme ? 'bg-[#18181B] text-white border-white/20' : 'bg-white text-black border-black/20';

  return (
    <div ref={containerRef} className={`relative h-[250vh] transition-colors duration-500 ${bgClass}`}>
      {/* Sticky Pinned Viewport during scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-6 sm:py-8">
        {/* Top Minimalist Navigation Header */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs tracking-widest uppercase font-semibold border-b border-current/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current" />
            <span>04 / PRINTED GRAPHIC ORBIT</span>
          </div>

          {/* Minimal Theme Switcher */}
          <div className="flex items-center gap-1.5 p-0.5 rounded-full border border-current/20">
            <button
              onClick={() => setIsWhiteTheme(true)}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-1 ${
                isWhiteTheme ? 'bg-white text-black shadow-sm' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Sun className="w-3 h-3" />
              <span>Studio White</span>
            </button>
            <button
              onClick={() => setIsWhiteTheme(false)}
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-1 ${
                !isWhiteTheme ? 'bg-zinc-800 text-white shadow-sm' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <Moon className="w-3 h-3" />
              <span>Street Dark</span>
            </button>
          </div>

          <div className="font-mono font-bold">
            ₹149 FLAT
          </div>
        </div>

        {/* Central Orbit Constellation (Recreating printed tshirt page.mov) */}
        <div className="relative min-h-[440px] sm:min-h-[540px] flex items-center justify-center my-auto">
          {/* Subtle Circular Orbit Guideline */}
          <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full border border-dashed border-current/20 pointer-events-none" />

          {/* Central Hanging Apparel Swing Tag (Driven by Scroll 3D Flip) */}
          <motion.div
            style={{ rotateZ: tagSwingZ }}
            className="z-30 relative flex flex-col items-center cursor-pointer select-none"
            onClick={() => setIsFrontView((prev) => !prev)}
          >
            {/* Hanging String */}
            <div className="w-0.5 h-16 sm:h-20 bg-current/40 mb-1" />

            {/* 3D Flipping Tag Body */}
            <motion.div
              style={{
                rotateY: tagRotateY,
                transformStyle: 'preserve-3d',
              }}
              className={`w-36 sm:w-44 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col items-center text-center border ${tagBg}`}
            >
              {/* String Eyelet Hole */}
              <div className={`w-2.5 h-2.5 rounded-full mb-2 ${isWhiteTheme ? 'bg-white' : 'bg-black'}`} />

              <div className="space-y-1">
                <div className="font-display font-black text-2xl tracking-tighter">
                  BONG<span className="text-red-500">99</span>
                </div>
                <div className="text-[8px] uppercase tracking-widest font-black opacity-75">
                  STYLE CULTURE
                </div>
                <div className="w-full border-t border-current/20 my-2" />
                <p className="text-[10px] font-bold leading-tight">
                  Welcome to Bong99 Street Family
                </p>
                <div className="mt-1.5 px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-red-600 text-white">
                  FLAT ₹149
                </div>
                <div className="text-[8px] uppercase tracking-widest opacity-60 pt-1">
                  MADE IN INDIA
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Orbiting T-Shirts Array (10 Tees in Radial Ring, Rotated by Scroll) */}
          <motion.div
            style={{ rotate: orbitRotation }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {GRAPHIC_TEES.map((tee) => {
              const rad = (tee.angle * Math.PI) / 180;
              const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 165 : 240;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              const isSelected = selectedTee.id === tee.id;
              const displayImage = isFrontView ? tee.imageFront : tee.imageBack;

              return (
                <div
                  key={tee.id}
                  className="absolute pointer-events-auto"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  <button
                    onClick={() => setSelectedTee(tee)}
                    className={`relative w-16 h-24 sm:w-24 sm:h-32 rounded-xl overflow-hidden shadow-xl transition-all duration-300 border ${
                      isSelected
                        ? 'border-red-500 ring-2 ring-red-500/40 scale-110'
                        : 'border-current/20 hover:border-current bg-white/10'
                    }`}
                  >
                    <Image
                      src={displayImage}
                      alt={tee.name}
                      fill
                      className="object-contain p-1"
                      sizes="90px"
                    />

                    {/* Badge */}
                    <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white p-0.5 text-[8px] font-mono text-center truncate">
                      ₹{tee.price}
                    </div>
                  </button>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Selected Graphic Inspection Bar */}
        <div className="max-w-2xl mx-auto w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-current/15 rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4 z-30">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0 border border-current/10">
              <Image
                src={isFrontView ? selectedTee.imageFront : selectedTee.imageBack}
                alt={selectedTee.name}
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase text-red-500">
                {isFrontView ? 'Front Collar Print' : selectedTee.graphic}
              </div>
              <h4 className="text-xs sm:text-sm font-bold uppercase truncate max-w-[200px] sm:max-w-xs">
                {selectedTee.name}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="font-mono font-bold text-sm">₹{selectedTee.price}</div>
              <div className="text-[9px] text-zinc-400 line-through">₹{selectedTee.originalPrice}</div>
            </div>
            <button
              onClick={handleAddToCart}
              className="py-2 px-4 bg-black text-white dark:bg-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{added ? 'Added!' : 'Add'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Minimalist Bar */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] opacity-60 font-mono border-t border-current/15 pt-3">
          <span>{GRAPHIC_TEES.indexOf(selectedTee) + 1} / {GRAPHIC_TEES.length} GRAPHIC DROPS</span>
          <span className="animate-pulse">SCROLL TO FLIP TAG & ROTATE RING ↓</span>
        </div>
      </div>
    </div>
  );
}
