'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('bong99_cart');
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
      const storedCoupon = localStorage.getItem('bong99_coupon');
      if (storedCoupon) {
        setCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.error('Error loading cart from storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('bong99_cart', JSON.stringify(cartItems));
      if (coupon) {
        localStorage.setItem('bong99_coupon', JSON.stringify(coupon));
      } else {
        localStorage.removeItem('bong99_coupon');
      }
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  }, [cartItems, coupon, isLoaded]);

  const addToCart = (product, size, color, quantity = 1) => {
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'M';
    const selectedColor = color || (product.colors && product.colors[0]?.name) || 'Standard';
    const selectedImage = (product.colors && product.colors.find(c => c.name === selectedColor)?.image) ||
      (product.images && product.images[0]) || '';

    const cartItemId = `${product._id || product.slug}-${selectedSize}-${selectedColor}`;

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === cartItemId);
      if (existing) {
        return prevItems.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: cartItemId,
          productId: product._id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice || product.price * 2,
          size: selectedSize,
          color: selectedColor,
          image: selectedImage,
          quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
    localStorage.removeItem('bong99_cart');
    localStorage.removeItem('bong99_coupon');
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Free shipping over ₹499 or ₹49 standard shipping
  const shippingFee = subtotal > 499 || subtotal === 0 ? 0 : 49;

  let discount = 0;
  if (coupon && subtotal >= (coupon.minOrderAmount || 0)) {
    if (coupon.discountType === 'percentage') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
      if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
        discount = coupon.maxDiscountAmount;
      }
    } else {
      discount = coupon.discountValue;
    }
  }

  const totalAmount = Math.max(0, subtotal - discount + shippingFee);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = async (code) => {
    if (!code) return;
    setCouponLoading(true);
    setCouponError('');
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim().toUpperCase(), subtotal }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.message || 'Invalid coupon');
        setCoupon(null);
        return false;
      }
      setCoupon(data.coupon);
      return true;
    } catch (err) {
      setCouponError('Network error applying coupon');
      return false;
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponError('');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        shippingFee,
        discount,
        totalAmount,
        totalItems,
        coupon,
        couponError,
        couponLoading,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
