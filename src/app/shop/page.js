'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, SlidersHorizontal, Eye, ShoppingBag, X, Sparkles, Star } from 'lucide-react';
import ProductQuickView from '@/components/product/ProductQuickView';
import { useCart } from '@/context/CartContext';

export const dynamic = 'force-dynamic';

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'plain-tshirts', label: 'Plain T-Shirts (₹99)' },
  { id: 'printed-tshirts', label: 'Printed T-Shirts (₹149)' },
  { id: 'polo', label: 'Polo T-Shirts (₹189)' },
  { id: 'off-shoulder', label: 'Off-Shoulder (₹189)' },
  { id: 'lowers', label: 'Lowers & Pants (₹179)' },
];

const PRICES = [
  { id: 'all', label: 'All Prices' },
  { id: '99', label: '₹99 (Plain)' },
  { id: '149', label: '₹149 (Printed)' },
  { id: '179', label: '₹179 (Lowers)' },
  { id: '189', label: '₹189 (Polo & Off-Shoulder)' },
];

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const COLORS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#111111' },
  { name: 'Grey', hex: '#808080' },
  { name: 'Red', hex: '#C53030' },
  { name: 'Blue', hex: '#2B6CB0' },
  { name: 'Green', hex: '#2F855A' },
  { name: 'Yellow', hex: '#D69E2E' },
  { name: 'Beige', hex: '#D7C4B7' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('newest');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedPrice, selectedSize, selectedColor, sortBy]);

  // Handle URL param changes
  useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category'));
    }
    if (searchParams.get('search')) {
      setSearchQuery(searchParams.get('search'));
    }
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedPrice && selectedPrice !== 'all') {
        params.append('minPrice', selectedPrice);
        params.append('maxPrice', selectedPrice);
      }
      if (selectedSize) params.append('size', selectedSize);
      if (selectedColor) params.append('color', selectedColor);
      if (searchQuery) params.append('search', searchQuery);
      if (sortBy) params.append('sort', sortBy);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error('Error fetching catalog:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPrice('all');
    setSelectedSize('');
    setSelectedColor('');
    setSearchQuery('');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-zinc-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Complete Catalog
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase tracking-tight">
              BONG99 <span className="text-amber-400">COLLECTION</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Affordable fashion starting from ₹99. Heavyweight street cuts.
            </p>
          </div>

          {/* Search Input in Header */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, color, style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-full pl-10 pr-20 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-amber-400 text-black text-xs font-bold rounded-full hover:bg-amber-300 transition-colors"
            >
              Go
            </button>
          </form>
        </div>

        {/* Mobile Filter Toggle & Sort Bar */}
        <div className="flex items-center justify-between py-4 border-b border-zinc-800 lg:hidden">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs font-semibold text-zinc-200"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>Filters</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 text-white rounded-lg px-3 py-2 text-xs focus:outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6 bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800/80 h-fit sticky top-24">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                Filter Products
              </span>
              <button
                onClick={resetFilters}
                className="text-[11px] text-zinc-400 hover:text-amber-400 underline transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-3">
                Category
              </label>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-amber-400 text-black font-bold'
                        : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-t border-zinc-800 pt-5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-3">
                Price Point
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRICES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPrice(p.id)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all ${
                      selectedPrice === p.id
                        ? 'bg-amber-400 text-black border-amber-400 font-bold'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="border-t border-zinc-800 pt-5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-3">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(selectedSize === sz ? '' : sz)}
                    className={`w-10 h-9 rounded-lg text-xs font-bold border transition-colors ${
                      selectedSize === sz
                        ? 'bg-amber-400 text-black border-amber-400 font-bold'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="border-t border-zinc-800 pt-5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-3">
                Color
              </label>
              <div className="flex flex-wrap gap-2.5">
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(selectedColor === c.name ? '' : c.name)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      selectedColor === c.name
                        ? 'scale-125 border-amber-400 ring-2 ring-amber-400/40'
                        : 'border-zinc-700 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="border-t border-zinc-800 pt-5">
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {/* Active filters pill list */}
            {(selectedCategory !== 'all' || selectedPrice !== 'all' || selectedSize || selectedColor || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-zinc-500">Active Filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-200 text-xs">
                    Category: {selectedCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                  </span>
                )}
                {selectedPrice !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-200 text-xs">
                    Price: ₹{selectedPrice}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedPrice('all')} />
                  </span>
                )}
                {selectedSize && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-200 text-xs">
                    Size: {selectedSize}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSize('')} />
                  </span>
                )}
                {selectedColor && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-200 text-xs">
                    Color: {selectedColor}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedColor('')} />
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-200 text-xs">
                    "{searchQuery}"
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs text-amber-400 hover:underline ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-zinc-900 rounded-2xl h-80 border border-zinc-800" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 bg-zinc-900/30 rounded-3xl border border-zinc-800 space-y-4">
                <Search className="w-10 h-10 text-zinc-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No products found</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  We couldn't find matches for your active filters. Try clearing your search query or price selection.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-amber-400 text-black font-bold text-xs rounded-full hover:bg-amber-300 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="group bg-zinc-900/60 border border-zinc-800 rounded-3xl overflow-hidden hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Image Area */}
                    <div className="relative h-64 sm:h-72 w-full bg-zinc-950 overflow-hidden">
                      <Link href={`/product/${product.slug}`} className="block w-full h-full">
                        <Image
                          src={product.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Starting Price Pill */}
                      <div className="absolute top-3 left-3 bg-amber-400 text-black px-3 py-0.5 rounded-full font-black text-xs font-display shadow-md">
                        ₹{product.price}
                      </div>

                      {/* Quick View Hover Button */}
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute bottom-3 right-3 p-2.5 rounded-full bg-zinc-900/90 hover:bg-amber-400 hover:text-black text-zinc-300 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl border border-zinc-700"
                        aria-label="Quick View"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Meta info */}
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                        {product.categoryLabel || 'Bong99'}
                      </span>

                      <Link href={`/product/${product.slug}`} className="block">
                        <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-amber-400 font-display">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-zinc-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      </div>

                      {/* Color swatches */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="flex items-center gap-1.5 pt-1">
                          {product.colors.map((c) => (
                            <span
                              key={c.name}
                              className="w-3 h-3 rounded-full border border-zinc-700"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      )}

                      {/* Add to bag button */}
                      <button
                        onClick={() => addToCart(product, 'L', product.colors?.[0]?.name || 'Standard', 1)}
                        className="w-full mt-2 py-2 px-3 bg-zinc-800 hover:bg-amber-400 text-white hover:text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 border border-zinc-700"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-amber-400" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
