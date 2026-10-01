import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request) {
  try {
    const user = getUserFromRequest(request);
    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { image, folder } = await request.json();
    if (!image) {
      return NextResponse.json(
        { success: false, message: 'Image base64/URL is required' },
        { status: 400 }
      );
    }

    const uploaded = await uploadImage(image, folder || 'bong99/products');

    return NextResponse.json({
      success: true,
      url: uploaded.url,
      publicId: uploaded.publicId,
    });
  } catch (error) {
    console.error('Image upload failed:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Image upload failed' },
      { status: 500 }
    );
  }
}
