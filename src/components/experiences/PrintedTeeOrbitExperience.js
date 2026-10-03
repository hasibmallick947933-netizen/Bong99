'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, ArrowRight, RotateCw, RefreshCw, Sun, Moon, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const GRAPHIC_TEES = [
  {
    id: 'orbit-cyber-bear',
    name: 'Never Give Up Cyber Bear Drop',
    graphic: 'High Density 3D Cyber Bear',
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
    graphic: 'Harajuku Rave Panda Graphic',
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
    graphic: 'Acid Neon Splatter Pop Art',
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
    name: 'Rebel Smile Happiness Distressed',
    graphic: 'Distressed Rebel Smiley',
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
    graphic: 'Heavy Metal Vintage Bear',
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
    graphic: 'Cyber Mask Cyberpunk',
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
    name: 'Harajuku Bamboo Street Panda',
    graphic: 'Minimal Typography Panda',
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
    name: 'Urban Camo Tactical Bear',
    graphic: 'Military Cyber Street',
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
    name: 'Skater Club GFX Drop',
    graphic: 'Subway Graffiti Bear',
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
    name: 'Future World Holographic GFX',
    graphic: 'Holographic Cyber Rave',
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
  const [isWhiteTheme, setIsWhiteTheme] = useState(initialTheme === 'white');
  const [isFrontView, setIsFrontView] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedTee, setSelectedTee] = useState(GRAPHIC_TEES[0]);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const rotateNext = () => setRotationAngle((prev) => prev + 36);
  const rotatePrev = () => setRotationAngle((prev) => prev - 36);
  const toggleView = () => setIsFrontView((prev) => !prev);

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

  const bgClass = isWhiteTheme ? 'bg-[#F2F3F5] text-zinc-900' : 'bg-[#121316] text-white';
  const tagBg = isWhiteTheme ? 'bg-[#18181B] text-white border-white/20' : 'bg-white text-black border-black/20';

  return (
    <section className={`relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 overflow-hidden ${bgClass}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Theme Switcher (White vs Dark Editions from user prompt) */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Dual Edition Switcher */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-black/10 backdrop-blur border border-black/10 mb-4">
            <button
              onClick={() => setIsWhiteTheme(true)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isWhiteTheme
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-500 hover:text-black'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Studio White Edition</span>
            </button>
            <button
              onClick={() => setIsWhiteTheme(false)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                !isWhiteTheme
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Street Dark Edition</span>
            </button>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase font-display">
            PRINTED GRAPHICS <span className={isWhiteTheme ? 'text-amber-800' : 'text-amber-400'}>₹149</span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base opacity-75 max-w-2xl mx-auto leading-relaxed">
            Inspired by youth street culture. Watch the circular constellation of graphic prints rotate around the signature Bong99 apparel swing tag.
          </p>
        </div>

        {/* Orbit Constellation Playground (Exact recreation of printed tshirt page.mov) */}
        <div className="relative min-h-[580px] sm:min-h-[660px] flex items-center justify-center">
          {/* Circular Orbit Ring Guide */}
          <div className={`absolute w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] rounded-full border border-dashed pointer-events-none opacity-25 ${
            isWhiteTheme ? 'border-zinc-500' : 'border-zinc-400'
          }`} />

          {/* Central Hanging Apparel Swing Tag (Ref: printed tshirt page.mov) */}
          <motion.div
            onClick={toggleView}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="z-30 relative flex flex-col items-center cursor-pointer select-none"
            title="Click to flip tag & shirts"
          >
            {/* Hanging String with Top Eyelet */}
            <div className={`w-0.5 h-16 sm:h-20 mb-1 ${isWhiteTheme ? 'bg-zinc-800' : 'bg-zinc-400'}`} />
            
            {/* Tag Body with 3D Flip */}
            <motion.div
              animate={{ rotateY: isFrontView ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`w-36 sm:w-44 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col items-center text-center border-2 ${tagBg}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* String Eyelet Hole */}
              <div className={`w-3 h-3 rounded-full mb-2 ${isWhiteTheme ? 'bg-white' : 'bg-black'}`} />

              {!isFrontView ? (
                /* Side A: Style Culture & Welcome Message */
                <div className="space-y-1.5">
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
                  <div className="mt-2 text-[8px] uppercase tracking-widest font-semibold opacity-60">
                    FLAUNT IT, TAG US, GET 10% OFF!
                  </div>
                  <div className="mt-2 px-2.5 py-0.5 rounded-full font-black text-[10px] bg-red-600 text-white">
                    FLAT ₹149
                  </div>
                  <div className="text-[8px] uppercase tracking-widest opacity-60 pt-1">
                    MADE IN INDIA
                  </div>
                </div>
              ) : (
                /* Side B: Inverted Logo side */
                <div className="space-y-2 transform rotate-180">
                  <div className="font-display font-black text-2xl tracking-tighter">
                    BONG<span className="text-red-500">99</span>
                  </div>
                  <div className="text-[9px] uppercase tracking-widest font-black">
                    EST. 2024 / EAST & WEST
                  </div>
                  <div className="text-[10px] font-bold">
                    COLLAR RIB & CHEST PRINTS
                  </div>
                  <div className="text-[8px] uppercase opacity-60">
                    CLICK TO FLIP BACK
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Orbiting T-Shirts Array (10 items in circular formation) */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out"
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          >
            {GRAPHIC_TEES.map((tee) => {
              const rad = (tee.angle * Math.PI) / 180;
              const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 175 : 255;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              const isSelected = selectedTee.id === tee.id;
              const displayImage = isFrontView ? tee.imageFront : tee.imageBack;

              return (
                <div
                  key={tee.id}
                  className="absolute pointer-events-auto"
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${-rotationAngle}deg)`,
                  }}
                >
                  <motion.button
                    onClick={() => setSelectedTee(tee)}
                    whileHover={{ scale: 1.15, zIndex: 40 }}
                    className={`relative w-20 h-28 sm:w-28 sm:h-36 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 border-2 ${
                      isSelected
                        ? 'border-amber-500 ring-4 ring-amber-500/30 scale-110'
                        : isWhiteTheme
                        ? 'border-white hover:border-zinc-900 bg-white'
                        : 'border-zinc-700 hover:border-white bg-zinc-900'
                    }`}
                  >
                    <Image
                      src={displayImage}
                      alt={tee.name}
                      fill
                      className="object-contain p-1"
                      sizes="120px"
                    />

                    {/* Tag badge */}
                    <div className="absolute top-1 left-1 bg-black/80 text-white px-1.5 py-0.5 rounded text-[8px] font-black">
                      ₹{tee.price}
                    </div>

                    {/* Print text label */}
                    <div className="absolute bottom-0 inset-x-0 bg-black/80 text-white p-1 text-[8px] font-bold text-center truncate">
                      {isFrontView ? tee.frontGraphic : tee.graphic}
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>

          {/* Controller Floating Bar */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
            <button
              onClick={rotatePrev}
              className="px-3.5 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all bg-white text-black hover:bg-zinc-100 border border-zinc-300"
            >
              <RotateCw className="w-3.5 h-3.5 transform -scale-x-100" />
              <span>Rotate Left</span>
            </button>
            <button
              onClick={toggleView}
              className="px-4 py-2 rounded-full text-xs font-black shadow-lg flex items-center gap-1.5 transition-all bg-black text-white hover:bg-zinc-800"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isFrontView ? 'Show Back Graphics' : 'Show Front Collars'}</span>
            </button>
            <button
              onClick={rotateNext}
              className="px-3.5 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all bg-white text-black hover:bg-zinc-100 border border-zinc-300"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Rotate Right</span>
            </button>
          </div>
        </div>

        {/* Selected Graphic Inspection Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`max-w-2xl mx-auto mt-10 rounded-2xl p-6 shadow-2xl border flex flex-col sm:flex-row items-center gap-6 ${
              isWhiteTheme
                ? 'bg-white border-zinc-200 text-black'
                : 'bg-zinc-900 border-zinc-800 text-white'
            }`}
          >
            <div className="relative w-28 h-36 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 flex-shrink-0 border border-current/10">
              <Image
                src={isFrontView ? selectedTee.imageFront : selectedTee.imageBack}
                alt={selectedTee.name}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="text-[10px] font-black uppercase tracking-wider text-red-500">
                {selectedTee.graphic} • {isFrontView ? 'FRONT VIEW' : 'BACK GRAPHIC'}
              </div>
              <h4 className="text-lg font-black font-display uppercase">
                {selectedTee.name}
              </h4>
              <div className="flex items-baseline justify-center sm:justify-start gap-3">
                <span className="text-2xl font-black font-display">
                  ₹{selectedTee.price}
                </span>
                <span className="text-xs opacity-50 line-through">
                  ₹{selectedTee.originalPrice}
                </span>
                <span className="text-[10px] bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400 px-2 py-0.5 rounded font-bold">
                  HOT DROP
                </span>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="px-5 py-2.5 bg-black text-white hover:bg-zinc-800 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{added ? 'Added to Bag!' : `Add to Bag (₹${selectedTee.price})`}</span>
                </button>
                <Link
                  href="/printed-tshirts"
                  className="text-xs opacity-75 hover:opacity-100 flex items-center gap-1 font-semibold"
                >
                  <span>Explore Drops</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
