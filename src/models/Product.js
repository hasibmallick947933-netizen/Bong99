import mongoose from 'mongoose';

const VariantInventorySchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  stock: { type: Number, default: 50 },
  sold: { type: Number, default: 0 },
});

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      required: true,
      enum: ['plain-tshirts', 'printed-tshirts', 'polo', 'off-shoulder', 'lowers'],
    },
    categoryLabel: {
      type: String,
      default: 'Plain T-Shirts',
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      default: 499,
    },
    images: {
      type: [String],
      default: [],
    },
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true },
        image: { type: String, default: '' },
      },
    ],
    sizes: {
      type: [String],
      default: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    inventory: [VariantInventorySchema],
    totalStock: {
      type: Number,
      default: 200,
    },
    material: {
      type: String,
      default: '100% Super Combed Bio-Washed Cotton (180 GSM)',
    },
    fit: {
      type: String,
      default: 'Streetwear Comfort Fit',
    },
    washCare: {
      type: String,
      default: 'Machine wash cold with similar colors. Do not iron directly on print. Tumble dry low.',
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
    isDrop: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    reviewCount: {
      type: Number,
      default: 24,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Auto calculate total stock if variants provided
ProductSchema.pre('save', function (next) {
  if (this.inventory && this.inventory.length > 0) {
    this.totalStock = this.inventory.reduce((sum, item) => sum + (item.stock || 0), 0);
  }
  next();
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
