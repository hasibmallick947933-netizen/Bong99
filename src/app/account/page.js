'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Package, MapPin, LogOut, ArrowRight, ShieldCheck, Mail, Lock, Phone } from 'lucide-react';

export default function AccountPage() {
  const { user, login, register, logout, loading } = useAuth();
  const router = useRouter();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Orders state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (e) {
      console.error('Error fetching orders:', e);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      if (isRegisterMode) {
        await register(name, email, password, phone);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const fillDemoCustomer = () => {
    setEmail('customer@bong99.com');
    setPassword('password123');
    setIsRegisterMode(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-amber-400" />
      </div>
    );
  }

  // If user is logged in, show customer profile & order history
  if (user) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-amber-400 text-black font-black text-2xl flex items-center justify-center font-display">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-display">{user.name}</h1>
                <p className="text-xs text-zinc-400">{user.email} • {user.phone || 'Streetwear Explorer'}</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-zinc-800 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  Bong99 Member
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="px-4 py-2.5 bg-amber-400/20 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-xl border border-amber-400/40 hover:bg-amber-400/30 transition-colors"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={logout}
                className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-zinc-700 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Orders Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-400" />
                <span>Order History ({orders.length})</span>
              </h2>
            </div>

            {ordersLoading ? (
              <div className="text-center py-12 text-zinc-500">Loading your orders...</div>
            ) : orders.length === 0 ? (
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-12 text-center space-y-4">
                <Package className="w-12 h-12 text-zinc-600 mx-auto" />
                <h3 className="text-base font-bold text-white">No orders yet</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Your street wardrobe is waiting! Shop plain tees from ₹99 and graphic prints from ₹149.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-400 text-black font-bold text-xs rounded-xl hover:bg-amber-300 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord._id}
                    className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
                          ORDER #{ord.orderNumber}
                        </span>
                        <div className="text-xs text-zinc-400 mt-0.5">
                          Placed on {new Date(ord.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/30">
                          {ord.orderStatus}
                        </span>
                        <span className="text-lg font-black text-white font-display">
                          ₹{ord.totalAmount}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {ord.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800">
                          <div className="w-10 h-12 rounded bg-zinc-800 relative overflow-hidden flex-shrink-0">
                            {item.image && (
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-white truncate">{item.name}</h4>
                            <p className="text-[10px] text-zinc-400">
                              {item.size} • {item.color} • Qty {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-xs text-zinc-500 pt-1">
                      <span>Delivery: {ord.customer.city}, {ord.customer.state}</span>
                      <Link
                        href={`/order-success/${ord.orderNumber}`}
                        className="text-amber-400 hover:underline font-semibold"
                      >
                        Track Status →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Not logged in: Show Login / Sign Up Form
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
            Bong99 Account
          </span>
          <h1 className="text-3xl font-black font-display uppercase tracking-tight">
            {isRegisterMode ? 'CREATE ACCOUNT' : 'WELCOME BACK'}
          </h1>
          <p className="text-xs text-zinc-400">
            {isRegisterMode
              ? 'Join the ₹99 streetwear club for exclusive drops'
              : 'Sign in to track orders, manage addresses, and check out faster'}
          </p>
        </div>

        {/* Demo Fast Fill Button */}
        <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 text-center">
          <span className="text-[11px] text-zinc-400 block mb-1.5 font-medium">Quick Demo Testing:</span>
          <button
            type="button"
            onClick={fillDemoCustomer}
            className="w-full py-1.5 px-3 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold hover:bg-amber-400/30 transition-colors"
          >
            Fill Demo Customer Credentials
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {isRegisterMode && (
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Mobile Phone (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98300 12345"
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {authError && (
            <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-400 text-xs rounded-xl">
              {authError}
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-400/20 active:scale-95 disabled:opacity-50"
          >
            {authLoading ? 'AUTHENTICATING...' : isRegisterMode ? 'SIGN UP FOR BONG99' : 'SIGN IN'}
          </button>
        </form>

        {/* Toggle Login vs Register */}
        <div className="text-center pt-2 text-xs text-zinc-400">
          {isRegisterMode ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(false)}
                className="text-amber-400 font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(true)}
                className="text-amber-400 font-bold hover:underline"
              >
                Create Account
              </button>
            </span>
          )}
        </div>

        {/* Link to Admin Login */}
        <div className="pt-4 border-t border-zinc-800 text-center">
          <Link
            href="/admin/login"
            className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Admin Dashboard Access →
          </Link>
        </div>
      </div>
    </div>
  );
}
