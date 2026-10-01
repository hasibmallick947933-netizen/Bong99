'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, ShoppingBag, Zap, Check, Star, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductQuickView({ product, isOpen, onClose }) {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : 'M');
  const [selectedColor, setSelectedColor] = useState(
    product?.colors && product.colors.length > 0 ? product.colors[0].name : 'Default'
  );
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'];

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl text-white">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Left */}
            <div className="p-6 bg-zinc-900/40 flex flex-col justify-between">
              {/* Main Photo */}
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <Image
                  src={images[selectedImage] || images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-amber-400 text-black px-3 py-0.5 rounded-full font-black text-xs font-display">
                  ₹{product.price}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-14 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImage === idx ? 'border-amber-400 scale-105' : 'border-zinc-700 opacity-60'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Right */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  {product.categoryLabel || 'Bong99 Collection'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
                  {product.name}
                </h3>

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-amber-400 font-display">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-zinc-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                    SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>

                <p className="text-xs text-zinc-400 mt-3 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block mb-1.5">
                    Color: <span className="text-amber-400">{selectedColor}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          selectedColor === c.name ? 'scale-125 border-amber-400 ring-2 ring-amber-400/40' : 'border-zinc-700'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div>
                <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider block mb-1.5">
                  Size
                </span>
                <div className="flex gap-2">
                  {(product.sizes || ['S', 'M', 'L', 'XL', 'XXL']).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-9 h-8 rounded-lg text-xs font-bold border transition-colors ${
                        selectedSize === sz
                          ? 'bg-amber-400 text-black border-amber-400'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <div className="flex gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 border border-zinc-700"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3 px-4 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
