'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/shop' },
    { name: 'Plain Tees (₹99)', href: '/plain-tshirts' },
    { name: 'Printed Tees (₹149)', href: '/printed-tshirts' },
    { name: 'Polo (₹189)', href: '/polo' },
    { name: 'Lowers (₹179)', href: '/lowers' },
    { name: 'Off-Shoulder', href: '/shop/off-shoulder' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/* Top Banner Ticker */}
      <div className="bg-amber-400 text-black py-1.5 px-4 text-xs font-semibold tracking-wider text-center flex items-center justify-center gap-2 overflow-hidden border-b border-amber-500">
        <Sparkles className="w-3.5 h-3.5 fill-black flex-shrink-0 animate-pulse" />
        <span className="font-bold">STYLE STARTS AT ₹99</span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">FREE SHIPPING ON ORDERS OVER ₹499</span>
        <span className="hidden md:inline">|</span>
        <span className="hidden md:inline">CASH ON DELIVERY AVAILABLE</span>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 shadow-xl py-3'
            : 'bg-zinc-950/70 backdrop-blur-sm border-b border-zinc-900 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile hamburger & Logo */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-lg focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Bong99 Logo */}
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/logo.png"
                    alt="Bong99 Logo"
                    width={36}
                    height={36}
                    className="object-contain w-full h-full"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black tracking-tighter text-white font-display">
                    BONG<span className="text-amber-400">99</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-zinc-400 -mt-1 font-medium">
                    Fashion ₹99+
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    {link.name}
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
                className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Admin Badge or Account Link */}
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-400/40 hover:bg-amber-400/30 transition-colors"
                >
                  Admin Panel
                </Link>
              ) : null}

              <Link
                href="/account"
                className="p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-full transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-full transition-colors group"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-black font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Expandable Search Input */}
          {searchOpen && (
            <div className="mt-3 pt-3 border-t border-zinc-800 animate-fadeIn">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="absolute left-3 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search plain t-shirt, graphic bear, polo, lowers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-zinc-900 text-white pl-10 pr-24 py-2.5 rounded-full text-sm border border-zinc-700 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-1.5 bg-amber-400 text-black text-xs font-bold rounded-full hover:bg-amber-300 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 space-y-2 mt-3 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-400 text-black font-bold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold bg-zinc-900 text-amber-400 border border-amber-400/30"
              >
                <span>Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <div className="pt-3 border-t border-zinc-800">
              <Link
                href="/account"
                className="flex items-center justify-between px-3 py-2 text-xs text-zinc-400 hover:text-white"
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
