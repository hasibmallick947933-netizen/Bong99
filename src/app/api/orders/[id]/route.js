import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    // Lookup by Mongo ID or by orderNumber
    let order = await Order.findOne({
      $or: [
        { _id: params.id.match(/^[0-9a-fA-F]{24}$/) ? params.id : null },
        { orderNumber: params.id },
      ],
    }).lean();

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    const user = getUserFromRequest(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized. Admin access required.' }, { status: 401 });
    }

    const { orderStatus, paymentStatus, note } = await request.json();
    const order = await Order.findOne({
      $or: [
        { _id: params.id.match(/^[0-9a-fA-F]{24}$/) ? params.id : null },
        { orderNumber: params.id },
      ],
    });

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    if (orderStatus && orderStatus !== order.orderStatus) {
      order.orderStatus = orderStatus;
      order.statusTimeline.push({
        status: orderStatus,
        date: new Date(),
        note: note || `Status updated to ${orderStatus}`,
      });
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();
    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
