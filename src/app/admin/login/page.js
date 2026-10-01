'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const user = await login(email, password);
      if (user.role !== 'admin') {
        throw new Error('Access denied. This account does not possess admin privileges.');
      }
      router.push('/admin');
    } catch (err) {
      setErrorMsg(err.message || 'Admin authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDefaultAdmin = () => {
    setEmail('admin@bong99.com');
    setPassword('bong99admin');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-black flex items-center justify-center mx-auto shadow-lg shadow-amber-400/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
            Internal Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight">
            BONG99 ADMIN ACCESS
          </h1>
          <p className="text-xs text-zinc-400">
            Secure portal for catalog, inventory, order lifecycle, and coupons.
          </p>
        </div>

        {/* Quick Fill Button */}
        <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-center">
          <button
            type="button"
            onClick={fillDefaultAdmin}
            className="w-full py-1.5 px-3 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold hover:bg-amber-400/30 transition-colors"
          >
            Auto-fill Master Admin Credentials
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bong99.com"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">Admin Password</label>
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

          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-400 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-amber-400/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING...' : 'ENTER ADMIN DASHBOARD'}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-xs text-zinc-500 hover:text-white transition-colors">
            ← Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
