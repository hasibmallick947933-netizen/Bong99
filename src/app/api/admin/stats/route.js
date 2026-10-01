import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Order from '@/models/Order';
import User from '@/models/User';
import Coupon from '@/models/Coupon';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request) {
  try {
    await dbConnect();
    const user = getUserFromRequest(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const [totalProducts, totalOrders, totalUsers, totalCoupons, orders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Coupon.countDocuments(),
      Order.find({}).sort({ createdAt: -1 }).limit(10).lean(),
    ]);

    const allOrders = await Order.find({ paymentStatus: { $ne: 'failed' } }).select('totalAmount orderStatus paymentStatus createdAt').lean();
    const totalRevenue = allOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    const pendingOrdersCount = allOrders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length;

    // Customer analytics
    const customersWithOrders = await Order.aggregate([
      {
        $group: {
          _id: '$customer.email',
          name: { $first: '$customer.name' },
          phone: { $first: '$customer.phone' },
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' },
          lastOrderDate: { $max: '$createdAt' },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 20 },
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalCustomers: totalUsers,
        pendingOrders: pendingOrdersCount,
      },
      recentOrders: orders,
      topCustomers: customersWithOrders,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
