'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex flex-col justify-between bg-[#FAFAFA] text-black overflow-hidden pt-8 pb-10 px-4 sm:px-8 border-b border-zinc-200"
    >
      <motion.div
        style={{ scale: heroScale, opacity: heroOpacity }}
        className="max-w-7xl mx-auto w-full my-auto flex flex-col items-center text-center py-10"
      >
        {/* Top Minimalist Brand Banner */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-700 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006838]" />
          <span>দারুণ কোয়ালিটি, অবিশ্বাস্য দাম ♡</span>
          <span className="text-zinc-400">•</span>
          <span className="font-mono text-[#006838]">₹99 / ₹149 / ₹199</span>
        </div>

        {/* Minimal High-Fashion Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase font-display tracking-tighter leading-[0.88] text-black max-w-5xl">
          STYLE STARTS <br />
          <span className="text-[#006838]">AT ₹99.</span>
        </h1>

        {/* Understated Editorial Subtitle */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-600 max-w-xl mx-auto font-sans font-normal leading-relaxed">
          Affordable streetwear engineered with 100% bio-washed combed cotton. 
          Scroll down to experience our interactive garment showcases.
        </p>

        {/* Minimalist Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Explore All Drops</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="#scroll-experience"
            className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-zinc-100 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-zinc-300"
          >
            <span>Interactive Runway</span>
          </Link>
        </div>

        {/* Direct Index Pills to the 4 Experiences */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl w-full mt-12 pt-8 border-t border-zinc-200 text-left">
          <Link
            href="/plain-tshirts"
            className="p-3 rounded-xl bg-white border border-zinc-200 hover:border-black transition-all group"
          >
            <div className="text-[10px] font-mono text-zinc-400">01 / RACK</div>
            <div className="text-xs font-bold text-black group-hover:text-amber-800 mt-0.5">
              Plain T-Shirts
            </div>
            <div className="text-[11px] font-mono font-bold text-[#006838]">₹99 Flat</div>
          </Link>

          <Link
            href="/lowers"
            className="p-3 rounded-xl bg-white border border-zinc-200 hover:border-black transition-all group"
          >
            <div className="text-[10px] font-mono text-zinc-400">02 / RUNWAY</div>
            <div className="text-xs font-bold text-black group-hover:text-zinc-600 mt-0.5">
              Street Lowers
            </div>
            <div className="text-[11px] font-mono font-bold text-black">₹179 Flat</div>
          </Link>

          <Link
            href="/polo"
            className="p-3 rounded-xl bg-white border border-zinc-200 hover:border-black transition-all group"
          >
            <div className="text-[10px] font-mono text-zinc-400">03 / WHEEL</div>
            <div className="text-xs font-bold text-black group-hover:text-amber-900 mt-0.5">
              Pique Polos
            </div>
            <div className="text-[11px] font-mono font-bold text-black">₹189 Flat</div>
          </Link>

          <Link
            href="/printed-tshirts"
            className="p-3 rounded-xl bg-white border border-zinc-200 hover:border-black transition-all group"
          >
            <div className="text-[10px] font-mono text-zinc-400">04 / ORBIT</div>
            <div className="text-xs font-bold text-black group-hover:text-red-600 mt-0.5">
              Graphic Drops
            </div>
            <div className="text-[11px] font-mono font-bold text-[#E30613]">₹149 Flat</div>
          </Link>
        </div>
      </motion.div>

      {/* Minimalist Bottom Scroll Cue */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-xs text-zinc-400 font-mono pt-4">
        <span>BONG99 • EST. 2024</span>
        <span className="flex items-center gap-1 animate-bounce">
          <span>SCROLL DOWN</span>
          <ArrowDown className="w-3 h-3" />
        </span>
        <span>MADE IN INDIA</span>
      </div>
    </section>
  );
}
