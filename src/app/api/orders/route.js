import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import Coupon from '@/models/Coupon';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request) {
  try {
    await dbConnect();
    const user = getUserFromRequest(request);
    const body = await request.json();

    const {
      customer,
      items,
      subtotal,
      shippingFee,
      discount,
      couponCode,
      totalAmount,
      paymentMethod,
    } = body;

    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return NextResponse.json(
        { success: false, message: 'Please provide full customer shipping details' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Cart items cannot be empty' },
        { status: 400 }
      );
    }

    // Generate unique order number
    const timestamp = Date.now().toString().slice(-4);
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `BONG-${timestamp}${randomHex}`;

    // Update inventory
    for (const item of items) {
      if (item.productId) {
        await Product.updateOne(
          {
            _id: item.productId,
            'inventory.size': item.size,
            'inventory.color': item.color,
          },
          {
            $inc: {
              'inventory.$.stock': -item.quantity,
              'inventory.$.sold': item.quantity,
              totalStock: -item.quantity,
            },
          }
        );
      }
    }

    // Update coupon usage if provided
    if (couponCode) {
      await Coupon.updateOne(
        { code: couponCode.toUpperCase() },
        { $inc: { usedCount: 1 } }
      );
    }

    const newOrder = await Order.create({
      orderNumber,
      user: user ? user.id : null,
      customer,
      items,
      subtotal,
      shippingFee,
      discount,
      couponCode,
      totalAmount,
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      orderStatus: 'Confirmed',
      statusTimeline: [
        {
          status: 'Confirmed',
          date: new Date(),
          note: paymentMethod === 'cod' ? 'Order placed via Cash on Delivery' : 'Order placed online',
        },
      ],
    });

    return NextResponse.json({
      success: true,
      order: newOrder,
      message: 'Order created successfully!',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    const user = getUserFromRequest(request);
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    let query = {};
    if (user && user.role === 'admin') {
      // Admin can view all
    } else if (user) {
      query.$or = [{ user: user.id }, { 'customer.email': user.email }];
    } else if (email) {
      query['customer.email'] = email;
    } else {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const orders = await Order.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
