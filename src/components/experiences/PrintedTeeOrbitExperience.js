'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, ArrowRight, RotateCw, ZoomIn } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const ORBIT_TEES = [
  {
    id: 'orbit-1',
    name: 'Never Give Up Cyber Bear',
    graphic: 'High Density 3D Cyber Bear',
    color: 'Midnight Black',
    price: 149,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
    angle: 0,
  },
  {
    id: 'orbit-2',
    name: 'Style Culture Tokyo Panda',
    graphic: 'Harajuku Rave Panda Graphic',
    color: 'Lilac Smoke',
    price: 149,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    angle: 60,
  },
  {
    id: 'orbit-3',
    name: 'Feel Good Graffiti Pop Bear',
    graphic: 'Acid Neon Splatter Pop Art',
    color: 'Vintage Maroon',
    price: 149,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    angle: 120,
  },
  {
    id: 'orbit-4',
    name: 'Happiness Smile Acid Grunge',
    graphic: 'Distressed Rebel Smiley',
    color: 'Blush Pink',
    price: 149,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80',
    angle: 180,
  },
  {
    id: 'orbit-5',
    name: "Let's Rock Rocker Teddy",
    graphic: 'Heavy Metal Vintage Bear',
    color: 'Chalk White',
    price: 149,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    angle: 240,
  },
  {
    id: 'orbit-6',
    name: 'What? Bamboo Panda Minimal',
    graphic: 'Typography Street Minimalist',
    color: 'Pistachio Sage',
    price: 149,
    originalPrice: 699,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80',
    angle: 300,
  },
];

export default function PrintedTeeOrbitExperience() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedTee, setSelectedTee] = useState(ORBIT_TEES[0]);
  const { addToCart } = useCart();

  const rotateNext = () => setRotationAngle((prev) => prev + 60);
  const rotatePrev = () => setRotationAngle((prev) => prev - 60);

  const handleAddToCart = () => {
    addToCart(
      {
        _id: selectedTee.id,
        name: selectedTee.name,
        price: selectedTee.price,
        originalPrice: selectedTee.originalPrice,
        images: [selectedTee.image],
        category: 'printed-tshirts',
        slug: 'never-give-up-cyber-bear-tee',
      },
      'L',
      selectedTee.color,
      1
    );
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      {/* Background Street Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Streetwear Graphic Culture
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display uppercase">
            Printed T-Shirts Orbit <span className="text-amber-400">₹149</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Inspired by youth street culture. Watch the circular constellation of graphic prints rotate around the signature Bong99 apparel tag.
          </p>
        </div>

        {/* Orbit Playground */}
        <div className="relative min-h-[580px] sm:min-h-[640px] flex items-center justify-center">
          {/* Circular Orbit Ring Line */}
          <div className="absolute w-[360px] h-[360px] sm:w-[500px] sm:h-[500px] rounded-full border border-dashed border-zinc-800 pointer-events-none" />

          {/* Central Hanging Tag Reference */}
          <motion.div
            className="z-20 relative flex flex-col items-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Hanging String */}
            <div className="w-0.5 h-16 bg-zinc-500 mb-1" />
            {/* Tag Body */}
            <div className="w-40 sm:w-44 bg-zinc-100 text-black rounded-lg p-5 shadow-2xl flex flex-col items-center text-center border-4 border-zinc-800">
              {/* Eyelet hole */}
              <div className="w-3 h-3 rounded-full bg-zinc-900 mb-3" />
              <div className="font-display font-black text-2xl tracking-tighter">
                BONG<span className="text-red-600">99</span>
              </div>
              <div className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold mt-1">
                STYLE CULTURE
              </div>
              <div className="my-3 w-full border-t border-zinc-300" />
              <p className="text-[11px] font-semibold text-zinc-800 leading-tight">
                Welcome to Bong99 Street Family
              </p>
              <div className="mt-3 px-2.5 py-1 bg-black text-white rounded text-[10px] font-bold tracking-wider">
                FROM ₹149
              </div>
              <div className="mt-2 text-[8px] uppercase tracking-widest text-zinc-500 font-semibold">
                MADE IN INDIA
              </div>
            </div>
          </motion.div>

          {/* Orbiting T-Shirts Array */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-700 ease-out"
            style={{ transform: `rotate(${rotationAngle}deg)` }}
          >
            {ORBIT_TEES.map((tee, idx) => {
              const rad = (tee.angle * Math.PI) / 180;
              // Radius is responsive
              const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 170 : 230;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              const isSelected = selectedTee.id === tee.id;

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
                    whileHover={{ scale: 1.15, zIndex: 30 }}
                    className={`relative w-20 h-28 sm:w-28 sm:h-36 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 border-2 ${
                      isSelected
                        ? 'border-amber-400 ring-4 ring-amber-400/30 scale-110'
                        : 'border-zinc-700 hover:border-white'
                    }`}
                  >
                    <Image
                      src={tee.image}
                      alt={tee.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1.5">
                      <span className="text-[9px] sm:text-[10px] font-black text-white line-clamp-1">
                        ₹{tee.price}
                      </span>
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>

          {/* Rotate Orbit Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
            <button
              onClick={rotatePrev}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-full border border-zinc-700 flex items-center gap-1.5 transition-colors shadow-lg"
            >
              <RotateCw className="w-3.5 h-3.5 transform -scale-x-100" />
              <span>Rotate Left</span>
            </button>
            <button
              onClick={rotateNext}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold rounded-full flex items-center gap-1.5 transition-colors shadow-lg shadow-amber-400/20"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Rotate Right</span>
            </button>
          </div>
        </div>

        {/* Selected Graphic Tee Showcase Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto mt-8 bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-2xl backdrop-blur-md"
          >
            <div className="relative w-28 h-36 rounded-xl overflow-hidden bg-zinc-950 flex-shrink-0 border border-zinc-800">
              <Image
                src={selectedTee.image}
                alt={selectedTee.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-red-400">
                {selectedTee.graphic}
              </div>
              <h4 className="text-lg font-black text-white font-display">
                {selectedTee.name}
              </h4>
              <div className="flex items-baseline justify-center sm:justify-start gap-3">
                <span className="text-2xl font-black text-amber-400 font-display">
                  ₹{selectedTee.price}
                </span>
                <span className="text-xs text-zinc-500 line-through">
                  ₹{selectedTee.originalPrice}
                </span>
                <span className="text-[10px] bg-red-950 text-red-400 px-2 py-0.5 rounded font-bold border border-red-500/30">
                  HOT DROP
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-amber-400/20 active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Instant Bag (₹{selectedTee.price})</span>
                </button>
                <Link
                  href="/printed-tshirts"
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Explore Drops</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
