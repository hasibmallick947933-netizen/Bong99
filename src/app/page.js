import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ScrollProductExperience from '@/components/home/ScrollProductExperience';
import PlainTeeRackExperience from '@/components/experiences/PlainTeeRackExperience';
import PrintedTeeOrbitExperience from '@/components/experiences/PrintedTeeOrbitExperience';
import PoloWheelExperience from '@/components/experiences/PoloWheelExperience';
import LowerViewfinderExperience from '@/components/experiences/LowerViewfinderExperience';
import CategoryCards from '@/components/home/CategoryCards';
import WhyPayMore from '@/components/home/WhyPayMore';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Scroll Product Experience (Step-by-step transition Plain -> Printed -> Polo -> Off-Shoulder -> Lower) */}
      <ScrollProductExperience />

      {/* 3. Plain T-Shirts Rack Experience (Ref: plane tshirt page .png & plan tshirt page 2.png) */}
      <PlainTeeRackExperience />

      {/* 4. Printed Graphic T-Shirts Orbit Experience (Ref: printed tshirt page.mov) */}
      <PrintedTeeOrbitExperience />

      {/* 5. Polo T-Shirts Rotating Radial Wheel Experience (Ref: polo tshirt .png) */}
      <PoloWheelExperience />

      {/* 6. Lowers / Pants Viewfinder Experience (Ref: lower page.mov) */}
      <LowerViewfinderExperience />

      {/* 7. Category Showcase Cards ("SHOP BONG99") */}
      <CategoryCards />

      {/* 8. Signature Pricing Matrix ("WHY PAY MORE?") */}
      <WhyPayMore />

      {/* 9. Social Proof / Streetwear Reviews */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              Verified Streetwear Verified
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display uppercase">
              LOVED BY OVER <span className="text-amber-400">50,000+</span> YOUTH
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              Real fit reviews from customers across India rocking Bong99 everyday drops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed italic">
                "I bought 3 plain white t-shirts for ₹99 each thinking they might be thin. When they arrived, the 180 GSM cotton quality blew my mind! Thick, opaque, and looks like Zara."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
                <div className="w-8 h-8 rounded-full bg-zinc-800 font-bold text-xs flex items-center justify-center text-white">
                  AK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Aakash K.</h4>
                  <span className="text-[10px] text-zinc-500">Kolkata • Verified Buyer</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed italic">
                "The Never Give Up cyber bear print is insane. 5 washes later, not even a single hairline crack on the print. For ₹149 this is literally the best streetwear deal in India."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
                <div className="w-8 h-8 rounded-full bg-zinc-800 font-bold text-xs flex items-center justify-center text-white">
                  RD
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Rohan Das</h4>
                  <span className="text-[10px] text-zinc-500">Bengaluru • Verified Buyer</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed italic">
                "Got the sand beige track pants for ₹179. The fit is beautifully baggy and the side piping gives that retro Balenciaga runner aesthetic. 10/10."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
                <div className="w-8 h-8 rounded-full bg-zinc-800 font-bold text-xs flex items-center justify-center text-white">
                  PS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Priya Sen</h4>
                  <span className="text-[10px] text-zinc-500">Delhi • Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Final Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-zinc-900 via-zinc-950 to-zinc-950 border-t border-zinc-900 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
            EXPERIENCE THE REAL BONG99
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display uppercase tracking-tight">
            UPGRADE YOUR WARDROBE <br />
            <span className="text-amber-400">WITHOUT EMPTYING YOUR WALLET</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Plain tees at ₹99. Graphics at ₹149. Lowers at ₹179. Polos at ₹189. Fast shipping across India with Cash on Delivery available.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-transform active:scale-95 shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
