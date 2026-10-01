import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'wtzgxhnl',
  api_key: process.env.CLOUDINARY_API_KEY || '254813272263332',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'AqukSubNd6NArwPeDQDrCCiaTjc',
  secure: true,
});

export async function uploadImage(fileBase64OrUrl, folder = 'bong99/products') {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileBase64OrUrl, {
      folder,
      resource_type: 'auto',
    });
    return {
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      format: uploadResponse.format,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
}

export default cloudinary;
