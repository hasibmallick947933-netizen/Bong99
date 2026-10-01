'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Zap,
  Star,
  Truck,
  RefreshCw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Share2,
  Check,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/slug/${params.slug}`);
        const data = await res.json();
        if (data.success && data.product) {
          setProduct(data.product);
          setRelated(data.related || []);
          setSelectedSize(data.product.sizes?.[0] || 'L');
          setSelectedColor(data.product.colors?.[0]?.name || 'Standard');
        }
      } catch (e) {
        console.error('Error fetching product:', e);
      } finally {
        setLoading(false);
      }
    }
    if (params.slug) {
      loadProduct();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <Link href="/shop" className="text-amber-400 hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'];

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between mb-8 text-xs text-zinc-400">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Catalog</span>
          </Link>
          <div className="flex items-center gap-2">
            <span>Home</span>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-zinc-200 line-clamp-1">{product.name}</span>
          </div>
        </div>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Image Gallery (Mobile swipeable & desktop multi-view) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative h-[420px] sm:h-[580px] w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
              <Image
                src={images[selectedImage] || images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />

              {/* Price Tag Overlay */}
              <div className="absolute top-4 left-4 bg-amber-400 text-black px-4 py-1 rounded-full font-black text-sm font-display tracking-wider shadow-xl">
                ₹{product.price}
              </div>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 transition-colors shadow-lg border border-zinc-700"
                aria-label="Share product"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Next/Prev Image Arrows for Quick Navigation */}
              {images.length > 1 && (
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
                    className="p-2 rounded-full bg-zinc-900/80 text-white pointer-events-auto hover:bg-amber-400 hover:text-black transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
                    className="p-2 rounded-full bg-zinc-900/80 text-white pointer-events-auto hover:bg-amber-400 hover:text-black transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation (Swipeable horizontal bar) */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-24 h-28 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      selectedImage === idx
                        ? 'border-amber-400 ring-2 ring-amber-400/30 scale-105'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Buying Options & Spec Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                {product.categoryLabel || 'Bong99 Official'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-display mt-1 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-amber-400">4.9</span>
                </div>
                <span className="text-xs text-zinc-400">
                  ({product.reviewCount || 120} verified customer reviews)
                </span>
              </div>

              {/* Price Banner */}
              <div className="flex items-baseline gap-4 mt-5 p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800">
                <div>
                  <span className="text-4xl font-black text-amber-400 font-display">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-zinc-500 line-through ml-2">
                    ₹{product.originalPrice}
                  </span>
                </div>
                <span className="text-xs font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/40">
                  SAVE {discountPercent}% OFF
                </span>
              </div>
            </div>

            {/* Color Swatch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="text-zinc-300">Select Color</span>
                  <span className="text-amber-400">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === c.name
                          ? 'border-amber-400 ring-4 ring-amber-400/40 scale-110'
                          : 'border-zinc-700 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-2">
                <span className="text-zinc-300">Select Size</span>
                <span className="text-zinc-500 font-normal underline cursor-pointer">
                  View Size Guide
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2.5">
                {(product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === sz
                        ? 'bg-amber-400 text-black border-amber-400 font-black shadow-lg shadow-amber-400/20'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Quantity
              </span>
              <div className="flex items-center border border-zinc-700 rounded-xl bg-zinc-900 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-zinc-800 text-zinc-300 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-white min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 hover:bg-zinc-800 text-zinc-300 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Buy Now Buttons */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-4 px-6 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all flex items-center justify-center gap-2 border border-zinc-700 active:scale-95 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-4 px-6 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-2xl transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-amber-400/25"
                >
                  <Zap className="w-4 h-4" />
                  <span>BUY NOW</span>
                </button>
              </div>
            </div>

            {/* Trust Perks */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 text-center">
              <div className="space-y-1">
                <Truck className="w-4 h-4 text-amber-400 mx-auto" />
                <span className="text-[10px] text-zinc-400 block font-medium">Free Shipping &gt; ₹499</span>
              </div>
              <div className="space-y-1">
                <RefreshCw className="w-4 h-4 text-emerald-400 mx-auto" />
                <span className="text-[10px] text-zinc-400 block font-medium">7-Day Free Exchange</span>
              </div>
              <div className="space-y-1">
                <ShieldCheck className="w-4 h-4 text-blue-400 mx-auto" />
                <span className="text-[10px] text-zinc-400 block font-medium">Cash On Delivery</span>
              </div>
            </div>

            {/* Accordion Tabs for Material, Fit, Wash care & Shipping */}
            <div className="border-t border-zinc-800 pt-4 space-y-3">
              <div className="flex border-b border-zinc-800 pb-2 gap-4 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 ${activeTab === 'details' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-zinc-500'}`}
                >
                  Details & Material
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-1 ${activeTab === 'shipping' ? 'text-amber-400 border-b-2 border-amber-400' : 'text-zinc-500'}`}
                >
                  Shipping & Returns
                </button>
              </div>

              {activeTab === 'details' ? (
                <div className="space-y-2 text-xs text-zinc-400 leading-relaxed pt-2">
                  <p><strong className="text-zinc-200">Material:</strong> {product.material || '100% Super-Combed Bio-Washed Cotton (180 GSM)'}</p>
                  <p><strong className="text-zinc-200">Fit:</strong> {product.fit || 'Regular Streetwear Fit'}</p>
                  <p><strong className="text-zinc-200">Wash Care:</strong> {product.washCare || 'Machine wash cold with similar colors. Do not iron directly on graphics.'}</p>
                </div>
              ) : (
                <div className="space-y-2 text-xs text-zinc-400 leading-relaxed pt-2">
                  <p><strong className="text-zinc-200">Dispatch:</strong> Ships within 24-48 hours via premium express couriers (Bluedart, Delhivery).</p>
                  <p><strong className="text-zinc-200">Delivery Time:</strong> 3-5 business days across India.</p>
                  <p><strong className="text-zinc-200">Returns:</strong> 7-day hassle free replacement or returns for sizing issues.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-zinc-800">
            <h2 className="text-2xl font-black text-white font-display uppercase mb-8">
              COMPLETE THE <span className="text-amber-400">FIT</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((item) => (
                <Link
                  key={item._id}
                  href={`/product/${item.slug}`}
                  className="group bg-zinc-900/60 border border-zinc-800 rounded-3xl overflow-hidden hover:border-amber-400 transition-all duration-300"
                >
                  <div className="relative h-60 w-full bg-zinc-950 overflow-hidden">
                    <Image
                      src={item.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-amber-400 text-black px-2.5 py-0.5 rounded-full font-black text-xs font-display">
                      ₹{item.price}
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-amber-400 font-display">
                        ₹{item.price}
                      </span>
                      <span className="text-[10px] text-zinc-500 line-through">
                        ₹{item.originalPrice}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
