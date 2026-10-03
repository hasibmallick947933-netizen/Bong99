'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Plain Tees (₹99)', href: '/plain-tshirts', tag: 'Ugmonk Rack' },
    { name: 'Printed Tees (₹149)', href: '/printed-tshirts', tag: 'Tag Orbit' },
    { name: 'Polo Shirts (₹189)', href: '/polo', tag: 'Polo Wheel' },
    { name: 'Lowers Runway (₹179)', href: '/lowers', tag: 'Phone View' },
    { name: 'Full Shop', href: '/shop' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Top Banner Ticker with Brand Tagline from LOGO.png */}
      <div className="bg-[#FEDE32] text-black py-1.5 px-4 text-xs font-semibold tracking-wider flex items-center justify-center gap-3 overflow-hidden border-b border-[#E6C610]">
        <div className="flex items-center gap-2">
          {/* Green, Yellow, Red Price Pills from LOGO.png */}
          <span className="px-2 py-0.5 rounded-full bg-[#006838] text-white text-[10px] font-black">₹99</span>
          <span className="px-2 py-0.5 rounded-full bg-[#F39200] text-black text-[10px] font-black">₹149</span>
          <span className="px-2 py-0.5 rounded-full bg-[#E30613] text-white text-[10px] font-black">₹199</span>
        </div>
        <span className="hidden sm:inline font-bold">|</span>
        <span className="font-extrabold text-[11px] sm:text-xs tracking-wide">
          দারুণ কোয়ালিটি, অবিশ্বাস্য দাম ♡
        </span>
        <span className="hidden md:inline font-bold">|</span>
        <span className="hidden md:inline font-medium text-[11px]">
          Shop Relax Discover • Good Things Cost Less Here! :)
        </span>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-md py-3 text-black'
            : 'bg-white/90 backdrop-blur-sm border-b border-zinc-200 py-3.5 text-black'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile menu toggle & Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-zinc-700 hover:text-black rounded-lg focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Bong99 Logo with actual LOGO.png from workspace */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#FEDE32] p-1 shadow-sm group-hover:scale-105 transition-transform">
                  <Image
                    src="/logo.png"
                    alt="Bong99 Logo"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-black font-display leading-tight">
                    BONG<span className="text-red-600">99</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#006838] font-black -mt-0.5">
                    More Choices. Less Prices.
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Nav Links with experience tags */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-black text-white shadow-sm'
                        : 'text-zinc-700 hover:text-black hover:bg-zinc-100'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions (Search, Account, Cart) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Admin Badge */}
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 hover:bg-amber-200 transition-colors"
                >
                  Admin
                </Link>
              ) : null}

              <Link
                href="/account"
                className="p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-full transition-colors group"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Expandable Search Input */}
          {searchOpen && (
            <div className="mt-3 pt-3 border-t border-zinc-200 animate-fadeIn">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-3 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search plain t-shirt, graphic bear, polo, lowers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-zinc-100 text-black pl-10 pr-24 py-2.5 rounded-full text-sm border border-zinc-300 focus:outline-none focus:border-black transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-1.5 bg-black text-white text-xs font-bold rounded-full hover:bg-zinc-800 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-2 mt-3 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-black text-white font-bold'
                      : 'text-zinc-800 hover:bg-zinc-100'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold bg-amber-50 text-amber-900 border border-amber-300"
              >
                <span>Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <div className="pt-3 border-t border-zinc-200">
              <Link
                href="/account"
                className="flex items-center justify-between px-3 py-2 text-xs text-zinc-600 hover:text-black font-semibold"
              >
                <span>{user ? `Signed in as ${user.name}` : 'Login / Sign Up'}</span>
                <User className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
