'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Package,
  Layers,
  ShoppingBag,
  Users,
  Tag,
  Plus,
  Trash2,
  Edit,
  Upload,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  RefreshCw,
  LogOut,
  ExternalLink,
  Search,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAdmin, logout, token } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Product Modal / Form state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'plain-tshirts',
    price: 99,
    originalPrice: 499,
    description: '',
    material: '100% Super-Combed Bio-Washed Cotton (180 GSM)',
    fit: 'Streetwear Fit',
    washCare: 'Machine wash cold. Do not iron print.',
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [{ name: 'Black', hex: '#111111' }, { name: 'White', hex: '#FFFFFF' }],
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Coupon Form state
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 299,
    expiryDate: '2027-12-31',
    usageLimit: 1000,
  });

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin/login');
      return;
    }
    loadAllData();
  }, [isAdmin]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [statsRes, prodRes, ordRes, coupRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/products'),
        fetch('/api/orders', { headers }),
        fetch('/api/admin/coupons', { headers }),
      ]);

      const [statsData, prodData, ordData, coupData] = await Promise.all([
        statsRes.json(),
        prodRes.json(),
        ordRes.json(),
        coupRes.json(),
      ]);

      if (statsData.success) setStats(statsData);
      if (prodData.success) setProducts(prodData.products || []);
      if (ordData.success) setOrders(ordData.orders || []);
      if (coupData.success) setCoupons(coupData.coupons || []);
    } catch (e) {
      console.error('Error loading admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  // Image Upload Handler (Cloudinary)
  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ image: reader.result }),
        });
        const data = await res.json();
        if (data.success && data.url) {
          setProductForm((prev) => ({
            ...prev,
            images: [data.url, ...prev.images],
          }));
        } else {
          alert('Upload failed: ' + (data.message || 'Error'));
        }
      } catch (err) {
        alert('Upload failed: ' + err.message);
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save / Update Product
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const endpoint = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Operation failed');

      alert(editingProduct ? 'Product updated!' : 'Product created!');
      setShowProductModal(false);
      setEditingProduct(null);
      loadAllData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        loadAllData();
      }
    } catch (e) {
      alert(e.message);
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      }
    } catch (e) {
      alert(e.message);
    }
  };

  // Create Coupon
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(couponForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create coupon');

      alert('Coupon created successfully!');
      setCouponForm({
        code: '',
        discountType: 'percentage',
        discountValue: 10,
        minOrderAmount: 299,
        expiryDate: '2027-12-31',
        usageLimit: 1000,
      });
      loadAllData();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 text-black font-black flex items-center justify-center font-display text-sm">
            99
          </div>
          <div>
            <h1 className="text-base font-black uppercase tracking-wider text-white font-display">
              BONG99 COMMAND HUB
            </h1>
            <span className="text-[10px] text-zinc-400">Master Operations Panel</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => {
              logout();
              router.push('/admin/login');
            }}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Admin Navigation Tabs */}
      <nav className="bg-zinc-900/60 border-b border-zinc-800 px-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview & KPIs', icon: TrendingUp },
          { id: 'products', label: `Products (${products.length})`, icon: Package },
          { id: 'inventory', label: 'Inventory Stock', icon: Layers },
          { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
          { id: 'customers', label: 'Customers', icon: Users },
          { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3.5 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all flex-shrink-0 ${
                isActive
                  ? 'border-amber-400 text-amber-400 bg-amber-400/5'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Admin Workspace Container */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-8">
        {loading ? (
          <div className="py-24 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-amber-400 mx-auto" />
            <p className="text-xs text-zinc-500 mt-3">Connecting to MongoDB Atlas...</p>
          </div>
        ) : (
          <>
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Metric Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Gross Revenue
                    </span>
                    <div className="text-3xl font-black text-amber-400 font-display">
                      ₹{stats?.stats?.totalRevenue || 0}
                    </div>
                    <span className="text-[10px] text-emerald-400 mt-2 block">
                      Paid & Processing
                    </span>
                  </div>

                  <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Total Orders
                    </span>
                    <div className="text-3xl font-black text-white font-display">
                      {orders.length}
                    </div>
                    <span className="text-[10px] text-zinc-400 mt-2 block">
                      {stats?.stats?.pendingOrders || 0} requiring fulfillment
                    </span>
                  </div>

                  <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Live Catalog Items
                    </span>
                    <div className="text-3xl font-black text-white font-display">
                      {products.length}
                    </div>
                    <span className="text-[10px] text-zinc-400 mt-2 block">
                      Across 5 Street Categories
                    </span>
                  </div>

                  <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                      Registered Customers
                    </span>
                    <div className="text-3xl font-black text-white font-display">
                      {stats?.stats?.totalCustomers || 1}
                    </div>
                    <span className="text-[10px] text-zinc-400 mt-2 block">
                      Indian Youth Street Club
                    </span>
                  </div>
                </div>

                {/* Recent Orders in Overview */}
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4">
                  <h2 className="text-base font-bold uppercase tracking-wider text-white">
                    Recent Customer Orders
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="text-[11px] uppercase tracking-wider text-zinc-500 border-b border-zinc-800">
                        <tr>
                          <th className="pb-3">Order ID</th>
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Items</th>
                          <th className="pb-3">Total</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60">
                        {orders.slice(0, 5).map((ord) => (
                          <tr key={ord._id} className="hover:bg-zinc-800/30">
                            <td className="py-3 font-mono font-bold text-amber-400">
                              {ord.orderNumber}
                            </td>
                            <td className="py-3">
                              <div className="font-semibold text-white">{ord.customer.name}</div>
                              <div className="text-[10px] text-zinc-500">{ord.customer.phone}</div>
                            </td>
                            <td className="py-3 text-zinc-400">{ord.items.length} pcs</td>
                            <td className="py-3 font-bold text-white">₹{ord.totalAmount}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/30">
                                {ord.orderStatus}
                              </span>
                            </td>
                            <td className="py-3">
                              <button
                                onClick={() => setActiveTab('orders')}
                                className="text-amber-400 hover:underline"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                    Catalog Management
                  </h2>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setProductForm({
                        name: '',
                        category: 'plain-tshirts',
                        price: 99,
                        originalPrice: 499,
                        description: '',
                        material: '100% Super-Combed Bio-Washed Cotton (180 GSM)',
                        fit: 'Streetwear Fit',
                        washCare: 'Machine wash cold.',
                        images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'],
                        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                        colors: [{ name: 'Black', hex: '#111111' }],
                      });
                      setShowProductModal(true);
                    }}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md shadow-amber-400/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <div
                      key={p._id}
                      className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-5 flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-all"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-zinc-950 flex-shrink-0">
                          <Image
                            src={p.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase font-bold text-amber-400">
                            {p.category}
                          </span>
                          <h3 className="text-sm font-bold text-white truncate mt-0.5">{p.name}</h3>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-base font-black text-amber-400 font-display">
                              ₹{p.price}
                            </span>
                            <span className="text-xs text-zinc-500 line-through">
                              ₹{p.originalPrice}
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-400 mt-1 block">
                            Stock: {p.totalStock} units
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-zinc-800">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProductForm({
                              name: p.name,
                              category: p.category,
                              price: p.price,
                              originalPrice: p.originalPrice,
                              description: p.description,
                              material: p.material,
                              fit: p.fit,
                              washCare: p.washCare,
                              images: p.images || [],
                              sizes: p.sizes || ['S', 'M', 'L', 'XL'],
                              colors: p.colors || [],
                            });
                            setShowProductModal(true);
                          }}
                          className="flex-1 py-2 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p._id)}
                          className="p-2 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. INVENTORY TAB */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                  Variant Inventory Tracking
                </h2>
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="text-[11px] uppercase tracking-wider text-zinc-500 border-b border-zinc-800">
                      <tr>
                        <th className="pb-3">Product Name</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Total In Stock</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {products.map((p) => (
                        <tr key={p._id} className="hover:bg-zinc-800/20">
                          <td className="py-3 font-semibold text-white">{p.name}</td>
                          <td className="py-3 text-zinc-400 capitalize">{p.category}</td>
                          <td className="py-3 font-bold text-amber-400">₹{p.price}</td>
                          <td className="py-3 font-mono font-bold text-white">{p.totalStock} units</td>
                          <td className="py-3">
                            {p.totalStock > 20 ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                                In Stock
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-500/30">
                                Low Stock
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                  Orders & Lifecycle Fulfillment
                </h2>

                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div
                      key={ord._id}
                      className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 space-y-4 hover:border-zinc-700 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-amber-400 text-sm">
                              {ord.orderNumber}
                            </span>
                            <span className="text-xs text-zinc-400">
                              Placed {new Date(ord.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-300 mt-1">
                            Customer: <strong className="text-white">{ord.customer.name}</strong> • Phone: {ord.customer.phone} • Email: {ord.customer.email}
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">
                            Shipping Address: {ord.customer.address}, {ord.customer.city}, {ord.customer.state} ({ord.customer.pincode})
                          </div>
                        </div>

                        {/* Status Updater Select */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-zinc-400">Order Status:</span>
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
                            className="bg-zinc-950 border border-zinc-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-amber-400"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Returned">Returned</option>
                          </select>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800">
                            <div className="w-10 h-12 rounded bg-zinc-800 relative overflow-hidden flex-shrink-0">
                              {it.image && <Image src={it.image} alt={it.name} fill className="object-cover" />}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-semibold text-white truncate">{it.name}</h4>
                              <p className="text-[10px] text-zinc-400">
                                {it.size} • {it.color} • Qty {it.quantity}
                              </p>
                              <span className="text-xs font-bold text-amber-400">₹{it.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-xs text-zinc-400 pt-2 border-t border-zinc-800/60">
                        <div>
                          Payment: <span className="uppercase font-bold text-white">{ord.paymentMethod}</span> ({ord.paymentStatus})
                        </div>
                        <div className="text-base font-black text-amber-400 font-display">
                          Total: ₹{ord.totalAmount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. CUSTOMERS TAB */}
            {activeTab === 'customers' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold uppercase tracking-wider text-white">
                  Customer Database & Lifetime Spending
                </h2>
                <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="text-[11px] uppercase tracking-wider text-zinc-500 border-b border-zinc-800">
                      <tr>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Contact</th>
                        <th className="pb-3">Total Orders</th>
                        <th className="pb-3">Total Spent</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {stats?.topCustomers && stats.topCustomers.length > 0 ? (
                        stats.topCustomers.map((c) => (
                          <tr key={c._id} className="hover:bg-zinc-800/20">
                            <td className="py-3 font-semibold text-white">{c.name || 'Bong99 Shopper'}</td>
                            <td className="py-3 text-zinc-400">
                              <div>{c._id}</div>
                              <div className="text-[10px] text-zinc-500">{c.phone}</div>
                            </td>
                            <td className="py-3 font-bold text-white">{c.totalOrders} orders</td>
                            <td className="py-3 font-black text-amber-400 font-display text-sm">
                              ₹{c.totalSpent}
                            </td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300">
                                Active VIP
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-zinc-500">
                            Customer data will appear here as orders are placed.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. COUPONS TAB */}
            {activeTab === 'coupons' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Create Coupon Form Left */}
                <div className="lg:col-span-5 bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-base font-bold uppercase tracking-wider text-white">
                    Create Discount Coupon
                  </h3>
                  <form onSubmit={handleCreateCoupon} className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">Coupon Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SUMMER50"
                        value={couponForm.code}
                        onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs uppercase text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-zinc-300 block mb-1">Type</label>
                        <select
                          value={couponForm.discountType}
                          onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                        >
                          <option value="percentage">Percentage (%)</option>
                          <option value="fixed">Fixed Amount (₹)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-zinc-300 block mb-1">Discount Value *</label>
                        <input
                          type="number"
                          required
                          value={couponForm.discountValue}
                          onChange={(e) => setCouponForm({ ...couponForm, discountValue: e.target.value })}
                          className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">Minimum Order Amount (₹)</label>
                      <input
                        type="number"
                        value={couponForm.minOrderAmount}
                        onChange={(e) => setCouponForm({ ...couponForm, minOrderAmount: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-400/20"
                    >
                      Create Coupon
                    </button>
                  </form>
                </div>

                {/* Existing Coupons Right */}
                <div className="lg:col-span-7 bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 space-y-4">
                  <h3 className="text-base font-bold uppercase tracking-wider text-white">
                    Active Discount Coupons
                  </h3>
                  <div className="space-y-3">
                    {coupons.map((c) => (
                      <div key={c._id} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-amber-400 text-base">{c.code}</span>
                            <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 font-bold">
                              {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                            </span>
                          </div>
                          <span className="text-[11px] text-zinc-400 mt-1 block">
                            Min Order: ₹{c.minOrderAmount} • Used: {c.usedCount || 0} times
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                          Active
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Add / Edit Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-black uppercase tracking-wider text-white font-display">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-zinc-300 font-semibold block mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. Obsidian Core Plain Tee"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 font-semibold block mb-1">Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="plain-tshirts">Plain T-Shirts (₹99)</option>
                    <option value="printed-tshirts">Printed T-Shirts (₹149)</option>
                    <option value="polo">Polo T-Shirts (₹189)</option>
                    <option value="off-shoulder">Off-Shoulder T-Shirts (₹189)</option>
                    <option value="lowers">Lowers & Track Pants (₹179)</option>
                  </select>
                </div>

                <div>
                  <label className="text-zinc-300 font-semibold block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-zinc-300 font-semibold block mb-1">Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                {/* Cloudinary Image Upload Section */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-zinc-300 font-semibold block">
                    Upload Images to Cloudinary (wtzgxhnl)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl cursor-pointer flex items-center gap-2 border border-zinc-700">
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>{uploadingImage ? 'Uploading...' : 'Choose Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-zinc-500">
                      {productForm.images.length} images attached
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
