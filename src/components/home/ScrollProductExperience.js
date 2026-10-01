'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const SCROLL_STAGES = [
  {
    step: 1,
    id: 'plain',
    badge: 'Starting at ₹99',
    categoryName: 'Plain T-Shirts',
    headline: 'Pure Bio-Washed Combed Cotton',
    price: 99,
    originalPrice: 499,
    description: 'Minimalist perfection. 180 GSM super-combed cotton treated with natural bio-enzymes for zero pilling, featherlight drape, and non-fading color retention.',
    colorways: ['White', 'Black', 'Grey', 'Red', 'Olive', 'Navy'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    link: '/plain-tshirts',
    slug: 'classic-plain-tee-pure-white',
  },
  {
    step: 2,
    id: 'printed',
    badge: 'Graphic Drops from ₹149',
    categoryName: 'Printed / Designed T-Shirts',
    headline: 'High-Density Distressed Street Art',
    price: 149,
    originalPrice: 699,
    description: 'Youth Indian street-culture graphic prints featuring futuristic cyber bears, Tokyo raves, grunge typography, and acid-wash aesthetics.',
    colorways: ['Black', 'Vintage Maroon', 'Lilac', 'Bone White'],
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80',
    link: '/printed-tshirts',
    slug: 'never-give-up-cyber-bear-tee',
  },
  {
    step: 3,
    id: 'polo',
    badge: 'Luxe Pique at ₹189',
    categoryName: 'Polo T-Shirts',
    headline: 'Honeycomb 220 GSM Structured Collar',
    price: 189,
    originalPrice: 899,
    description: 'Elevated collared craftsmanship featuring anti-curl double-stitched collar, mother-of-pearl buttons, and athletic side vents.',
    colorways: ['Obsidian Black', 'Snow White', 'Deep Maroon', 'Forest Pine'],
    image: 'https://images.unsplash.com/photo-1625910513413-7e4526d152c7?w=800&auto=format&fit=crop&q=80',
    link: '/polo',
    slug: 'classic-pique-heritage-polo-black',
  },
  {
    step: 4,
    id: 'off-shoulder',
    badge: 'Street Cut at ₹189',
    categoryName: 'Off-Shoulder T-Shirts',
    headline: 'Oversized Korean Drop-Shoulder Fit',
    price: 189,
    originalPrice: 799,
    description: 'Dramatic relaxed street silhouette featuring wide-neck drop shoulders, extended boxy sleeves, and effortless drape for modern street style.',
    colorways: ['Bone Sand', 'Raven Black', 'Charcoal Slate'],
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    link: '/shop/off-shoulder',
    slug: 'korean-drop-shoulder-tee-sand',
  },
  {
    step: 5,
    id: 'lower',
    badge: 'Bottom Wear at ₹179',
    categoryName: 'Lowers / Track Pants',
    headline: 'Wide-Leg Street Trousers & Cargo Joggers',
    price: 179,
    originalPrice: 999,
    description: 'Contrast athletic racing stripes, deep utility zipper pockets, and relaxed straight drape that pairs effortlessly with sneakers.',
    colorways: ['Sand Beige', 'Jet Black', 'Combat Olive', 'Denim Blue'],
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80',
    link: '/lowers',
    slug: 'street-track-pant-contrast-piping-beige',
  },
];

export default function ScrollProductExperience() {
  const [activeStep, setActiveStep] = useState(0);
  const current = SCROLL_STAGES[activeStep];
  const { addToCart } = useCart();

  const handleInstantBag = () => {
    addToCart(
      {
        _id: current.id,
        name: current.categoryName,
        price: current.price,
        originalPrice: current.originalPrice,
        images: [current.image],
        category: current.id === 'lower' ? 'lowers' : current.id === 'plain' ? 'plain-tshirts' : current.id === 'printed' ? 'printed-tshirts' : current.id,
        slug: current.slug,
      },
      'L',
      current.colorways[0],
      1
    );
  };

  return (
    <section id="scroll-experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Wardrobe Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display uppercase">
            SCROLL THROUGH <span className="text-amber-400">THE REVOLUTION</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Watch the categories morph smoothly as you scroll: Plain → Printed → Polo → Off-Shoulder → Lower.
          </p>
        </div>

        {/* Step Indicator Navigation Track */}
        <div className="flex items-center justify-between max-w-4xl mx-auto mb-12 overflow-x-auto pb-4 gap-2 no-scrollbar">
          {SCROLL_STAGES.map((stage, idx) => (
            <button
              key={stage.id}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                activeStep === idx
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25 scale-105'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
                {stage.step}
              </span>
              <span>{stage.categoryName.split('/')[0]}</span>
              <span className="font-extrabold text-[11px] opacity-80">
                ₹{stage.price}
              </span>
            </button>
          ))}
        </div>

        {/* Morphing Product Card */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-12 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Animated Clothing Image Stage */}
            <div className="lg:col-span-6 relative h-80 sm:h-[440px] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.85, rotateY: 20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.85, rotateY: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={current.image}
                    alt={current.categoryName}
                    fill
                    className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                    priority
                  />

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 bg-amber-400 text-black px-3 py-1 rounded-full font-black text-xs font-display tracking-wider shadow-lg">
                    {current.badge}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Category Details & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block">
                    STAGE {current.step} OF 5
                  </span>

                  <h3 className="text-3xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
                    {current.categoryName}
                  </h3>

                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-black text-amber-400 font-display">
                      ₹{current.price}
                    </span>
                    <span className="text-base text-zinc-500 line-through">
                      ₹{current.originalPrice}
                    </span>
                    <span className="text-xs bg-emerald-950 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold border border-emerald-500/30">
                      Starts from ₹{current.price}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                    {current.description}
                  </p>

                  {/* Colorways list */}
                  <div>
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                      Available Colorways:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {current.colorways.map((col) => (
                        <span
                          key={col}
                          className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 text-xs border border-zinc-700"
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-800">
                <button
                  onClick={handleInstantBag}
                  className="flex-1 py-3 px-6 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Quick Add to Bag</span>
                </button>
                <Link
                  href={current.link}
                  className="py-3 px-6 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 border border-zinc-700"
                >
                  <span>Experience {current.categoryName.split('/')[0]}</span>
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
