import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import PlainTeeRackExperience from '@/components/experiences/PlainTeeRackExperience';
import LowerViewfinderExperience from '@/components/experiences/LowerViewfinderExperience';
import PoloWheelExperience from '@/components/experiences/PoloWheelExperience';
import PrintedTeeOrbitExperience from '@/components/experiences/PrintedTeeOrbitExperience';
import WhyPayMore from '@/components/home/WhyPayMore';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-0 bg-white text-black selection:bg-black selection:text-white">
      {/* 1. Minimalist Editorial Hero Section */}
      <HeroSection />

      {/* 2. Scroll-Pinned Plain T-Shirts Rack Experience (Ref: plane tshirt page .png & plan tshirt page 2.png) */}
      <PlainTeeRackExperience />

      {/* 3. Scroll-Pinned Lowers / Pants Viewfinder Experience (Ref: lower page.mov) */}
      <LowerViewfinderExperience />

      {/* 4. Scroll-Pinned Polo T-Shirts Rotating Radial Wheel Experience (Ref: polo tshirt .png) */}
      <PoloWheelExperience />

      {/* 5. Scroll-Pinned Printed Graphic T-Shirts Orbit Experience (Ref: printed tshirt page.mov) */}
      <PrintedTeeOrbitExperience />

      {/* 6. Minimalist Pricing Matrix ("WHY PAY MORE?") */}
      <WhyPayMore />

      {/* 7. Minimalist Verified Customer Feedback */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA] border-t border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-zinc-200">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-1">
                COMMUNITY & REVIEWS
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase font-display tracking-tight text-black">
                VERIFIED FIT REVIEWS
              </h2>
            </div>
            <p className="mt-2 sm:mt-0 text-xs text-zinc-500 max-w-xs">
              Over 50,000+ orders dispatched across India with 4.9/5 star satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-1 text-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-black" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed italic">
                "I bought 3 plain white t-shirts for ₹99 each. The 180 GSM cotton quality is unbelievably thick, opaque, and feels like Zara."
              </p>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-black">Aakash K.</span>
                <span className="text-zinc-400 font-mono">Kolkata • Verified Buyer</span>
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-1 text-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-black" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed italic">
                "The Never Give Up cyber bear print is crazy good. 5 washes later, not even a hairline crack. For ₹149 this is the best streetwear deal in India."
              </p>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-black">Rohan Das</span>
                <span className="text-zinc-400 font-mono">Bengaluru • Verified Buyer</span>
              </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center gap-1 text-black">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-black" />
                ))}
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed italic">
                "Got the sand beige track pants for ₹179. The fit is beautifully baggy and the side piping gives that high-fashion runner aesthetic."
              </p>
              <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                <span className="font-bold text-black">Priya Sen</span>
                <span className="text-zinc-400 font-mono">Delhi • Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Minimalist Call To Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-block text-[11px] font-mono uppercase tracking-widest text-zinc-400">
            BONG99 • MORE CHOICES. LESS PRICES.
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase font-display tracking-tight leading-tight">
            UPGRADE YOUR WARDROBE <br />
            <span className="text-[#FEDE32]">STARTS AT ₹99</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Plain tees at ₹99. Graphics at ₹149. Lowers at ₹179. Polos at ₹189. Fast shipping across India with Cash on Delivery.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-white hover:bg-zinc-200 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 active:scale-95"
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
