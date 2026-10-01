import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Bong99:HM2506@cluster0.knjvex4.mongodb.net/bong99?retryWrites=true&w=majority&appName=Cluster0";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, select: false },
  phone: String,
  role: { type: String, default: 'customer' },
  addresses: Array,
}, { timestamps: true });

const VariantInventorySchema = new mongoose.Schema({
  size: String,
  color: String,
  stock: Number,
  sold: Number,
});

const ProductSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  description: String,
  category: String,
  categoryLabel: String,
  price: Number,
  originalPrice: Number,
  images: [String],
  colors: Array,
  sizes: [String],
  inventory: [VariantInventorySchema],
  totalStock: Number,
  material: String,
  fit: String,
  washCare: String,
  isFeatured: Boolean,
  isDrop: Boolean,
  rating: Number,
  reviewCount: Number,
  tags: [String],
}, { timestamps: true });

const CouponSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  discountType: String,
  discountValue: Number,
  minOrderAmount: Number,
  maxDiscountAmount: Number,
  expiryDate: Date,
  usageLimit: Number,
  usedCount: Number,
  isActive: Boolean,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);

// Curated high-res fashion apparel images for initial photography
const products = [
  // 1. PLAIN T-SHIRTS (From ₹99)
  {
    name: "Classic Minimalist Plain Tee - Pure White",
    slug: "classic-plain-tee-pure-white",
    description: "Premium combed cotton plain crew-neck tee. Ultra-soft breathable feel engineered for everyday streetwear and layering. Preshrunk bio-washed fabric.",
    category: "plain-tshirts",
    categoryLabel: "Plain T-Shirts",
    price: 99,
    originalPrice: 499,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Pure White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80" },
      { name: "Pitch Black", hex: "#111111", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80" },
      { name: "Heather Grey", hex: "#9E9E9E", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80" },
      { name: "Forest Green", hex: "#2E5A44", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80" },
      { name: "Crimson Red", hex: "#B91C1C", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Super-Combed Bio-Washed Cotton (180 GSM)",
    fit: "Regular Everyday Fit",
    isFeatured: true,
    isDrop: false,
    rating: 4.9,
    reviewCount: 142,
    tags: ["plain", "basics", "essential", "white", "crewneck"]
  },
  {
    name: "Obsidian Core Plain Tee - Pitch Black",
    slug: "obsidian-core-plain-tee-black",
    description: "Deep jet-black pigment dyed plain t-shirt with reinforced ribbed collar and double-stitched sleeves. The quintessential streetwear staple.",
    category: "plain-tshirts",
    categoryLabel: "Plain T-Shirts",
    price: 99,
    originalPrice: 499,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Pitch Black", hex: "#111111", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80" },
      { name: "Pure White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Super-Combed Bio-Washed Cotton (180 GSM)",
    fit: "Streetwear Regular",
    isFeatured: true,
    isDrop: false,
    rating: 4.8,
    reviewCount: 98,
    tags: ["plain", "black", "streetwear", "basics"]
  },
  {
    name: "Urban Earth Plain Tee - Olive Green",
    slug: "urban-earth-plain-tee-olive",
    description: "Earthy military-olive tone plain tee crafted with fine combed organic cotton yarn. Smooth tactile finish with zero color bleeding.",
    category: "plain-tshirts",
    categoryLabel: "Plain T-Shirts",
    price: 99,
    originalPrice: 499,
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Olive Green", hex: "#3F4F38", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80" },
      { name: "Washed Indigo", hex: "#2C3E50", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL"],
    material: "100% Combed Cotton (180 GSM)",
    fit: "Relaxed Everyday",
    isFeatured: true,
    isDrop: false,
    rating: 4.7,
    reviewCount: 64,
    tags: ["plain", "olive", "earth", "green"]
  },

  // 2. PRINTED / DESIGNED T-SHIRTS (From ₹149)
  {
    name: "Never Give Up Cyber Bear Graphic Tee",
    slug: "never-give-up-cyber-bear-tee",
    description: "High-density puff screen print featuring futuristic cyber-bear graphics and bold typography. Silicon-softened wash for ultimate drape.",
    category: "printed-tshirts",
    categoryLabel: "Printed T-Shirts",
    price: 149,
    originalPrice: 699,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Midnight Black", hex: "#18181B", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80" },
      { name: "Vintage Maroon", hex: "#4A0E17", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80" },
      { name: "Bone White", hex: "#F3F4F6", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Combed Ring-Spun Cotton (200 GSM)",
    fit: "Oversized Streetwear Fit",
    isFeatured: true,
    isDrop: true,
    rating: 4.9,
    reviewCount: 210,
    tags: ["printed", "graphic", "bear", "streetwear", "oversized"]
  },
  {
    name: "Style Culture Tokyo Panda Street Tee",
    slug: "style-culture-tokyo-panda-tee",
    description: "Iconic Tokyo underground rave panda print with distressed typography. Non-cracking screen print ink cured under high heat.",
    category: "printed-tshirts",
    categoryLabel: "Printed T-Shirts",
    price: 149,
    originalPrice: 699,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Lilac Smoke", hex: "#D8B4E2", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80" },
      { name: "Pistachio Sage", hex: "#A8D5BA", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80" },
      { name: "Coal Ash", hex: "#222222", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Premium Cotton (200 GSM Heavyweight)",
    fit: "Boxy Street Fit",
    isFeatured: true,
    isDrop: false,
    rating: 4.8,
    reviewCount: 175,
    tags: ["panda", "printed", "japanese", "streetwear"]
  },
  {
    name: "Happiness Smile Rebel Acid-Wash Graphic Tee",
    slug: "happiness-smile-rebel-tee",
    description: "Distressed neon splatter smiley graphic with graffiti typography. Hand-touched aesthetic for an unapologetic urban rebel vibe.",
    category: "printed-tshirts",
    categoryLabel: "Printed T-Shirts",
    price: 149,
    originalPrice: 699,
    images: [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Blush Pink", hex: "#E8B4B8", image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80" },
      { name: "Chalk White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL"],
    material: "100% Cotton Bio-Washed",
    fit: "Oversized Drop-Shoulder",
    isFeatured: true,
    isDrop: true,
    rating: 4.9,
    reviewCount: 88,
    tags: ["smile", "acid-wash", "printed", "grunge"]
  },

  // 3. POLO T-SHIRTS (₹189)
  {
    name: "Classic Pique Heritage Polo - Royal Obsidian",
    slug: "classic-pique-heritage-polo-black",
    description: "Breathable honeycomb pique knit polo shirt featuring clean ribbed collar, tailored 2-button placket, and side-vent hem. Elevates casual fashion effortlessly.",
    category: "polo",
    categoryLabel: "Polo T-Shirts",
    price: 189,
    originalPrice: 899,
    images: [
      "https://images.unsplash.com/photo-1625910513413-7e4526d152c7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Obsidian Black", hex: "#121212", image: "https://images.unsplash.com/photo-1625910513413-7e4526d152c7?w=800&auto=format&fit=crop&q=80" },
      { name: "Snow White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80" },
      { name: "Deep Maroon", hex: "#661122", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80" },
      { name: "Forest Pine", hex: "#1C3F2E", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80" },
      { name: "Twilight Navy", hex: "#16253D", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Breathable Pique Combed Cotton (220 GSM)",
    fit: "Tailored Modern Slim",
    isFeatured: true,
    isDrop: false,
    rating: 4.9,
    reviewCount: 168,
    tags: ["polo", "pique", "formal-casual", "collared"]
  },
  {
    name: "Structured Minimalist Polo - Crisp Snow White",
    slug: "structured-minimalist-polo-white",
    description: "Refined pristine white polo tee with anti-curl collar technology and mother-of-pearl style matte buttons. Perfect for semi-formal styling.",
    category: "polo",
    categoryLabel: "Polo T-Shirts",
    price: 189,
    originalPrice: 899,
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1625910513413-7e4526d152c7?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Snow White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80" },
      { name: "Sky Mist Blue", hex: "#93C5FD", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Premium Combed Pique Cotton (220 GSM)",
    fit: "Modern Regular",
    isFeatured: true,
    isDrop: false,
    rating: 4.8,
    reviewCount: 119,
    tags: ["polo", "white", "collared", "pique"]
  },

  // 4. OFF-SHOULDER T-SHIRTS (₹189)
  {
    name: "Korean Drop-Shoulder Relaxed Tee - Bone Sand",
    slug: "korean-drop-shoulder-tee-sand",
    description: "Contemporary relaxed silhouette with extended drop shoulders, wide boxy sleeves, and clean draped hemline. Inspired by Seoul and Harajuku youth street fashion.",
    category: "off-shoulder",
    categoryLabel: "Off-Shoulder T-Shirts",
    price: 189,
    originalPrice: 799,
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Bone Sand", hex: "#E7DFD5", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80" },
      { name: "Charcoal Slate", hex: "#2B2D42", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80" },
      { name: "Muted Olive", hex: "#556B2F", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "100% Heavyweight Ring-Spun Cotton (240 GSM)",
    fit: "Oversized Off-Shoulder Boxy Fit",
    isFeatured: true,
    isDrop: true,
    rating: 4.9,
    reviewCount: 154,
    tags: ["off-shoulder", "drop-shoulder", "oversized", "streetwear", "korean"]
  },
  {
    name: "Cyber Street Slouch Drop Tee - Raven Black",
    slug: "cyber-street-slouch-tee-black",
    description: "Dramatic wide-neck drop-shoulder cut with elongated armholes and high-low curved bottom hem. High aesthetic presence with ultra-soft hand feel.",
    category: "off-shoulder",
    categoryLabel: "Off-Shoulder T-Shirts",
    price: 189,
    originalPrice: 799,
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Raven Black", hex: "#0F0F10", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80" },
      { name: "Chalk Cream", hex: "#F5F5F0", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL"],
    material: "100% Combed Cotton (220 GSM)",
    fit: "Slouchy Relaxed Fit",
    isFeatured: true,
    isDrop: false,
    rating: 4.7,
    reviewCount: 92,
    tags: ["off-shoulder", "black", "streetwear", "boxy"]
  },

  // 5. LOWER / TRACK PANTS (₹179)
  {
    name: "Street Track Pant with Contrast Race Piping - Sand Beige",
    slug: "street-track-pant-contrast-piping-beige",
    description: "Wide-leg streetwear track pant with double side-stripe racing piping, elastic drawstring waistband, deep zippered pockets, and structured fall.",
    category: "lowers",
    categoryLabel: "Lowers / Track Pants",
    price: 179,
    originalPrice: 999,
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Sand Beige", hex: "#D4C7B5", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80" },
      { name: "Pitch Black", hex: "#111111", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80" },
      { name: "Army Olive", hex: "#4B5320", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Heavyweight Poly-Cotton Fleece Blend with Anti-Pilling Finish",
    fit: "Wide-Leg Baggy Street Fit",
    isFeatured: true,
    isDrop: true,
    rating: 4.9,
    reviewCount: 184,
    tags: ["lower", "trackpant", "jogger", "piping", "beige"]
  },
  {
    name: "Pleated Urban Comfort Trouser - Jet Black",
    slug: "pleated-urban-comfort-trouser-black",
    description: "Modern loose-drape tailored pant with front double pleats, relaxed straight cut, and hidden elasticated side waistband. Pairs seamlessly with sneakers and loafers.",
    category: "lowers",
    categoryLabel: "Lowers / Track Pants",
    price: 179,
    originalPrice: 1199,
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Jet Black", hex: "#111111", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80" },
      { name: "Graphite Charcoal", hex: "#374151", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    material: "Stretch Cotton-Twill Blend with Soft Peach Finish",
    fit: "Relaxed Straight Pleated",
    isFeatured: true,
    isDrop: false,
    rating: 4.8,
    reviewCount: 140,
    tags: ["trouser", "pleated", "lower", "black", "smart-casual"]
  },
  {
    name: "Everyday Utility Cargo Jogger - Combat Olive",
    slug: "everyday-utility-cargo-jogger-olive",
    description: "Tactical streetwear joggers with 6 multi-utility pockets, ribbed ankle cuffs, custom drawstring toggles, and reinforced knee darting.",
    category: "lowers",
    categoryLabel: "Lowers / Track Pants",
    price: 179,
    originalPrice: 1099,
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80"
    ],
    colors: [
      { name: "Combat Olive", hex: "#424D37", image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&auto=format&fit=crop&q=80" },
      { name: "Obsidian Black", hex: "#111111", image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=800&auto=format&fit=crop&q=80" }
    ],
    sizes: ["S", "M", "L", "XL"],
    material: "Ripstop Cotton Twill with Elastane Stretch",
    fit: "Tapered Cargo Jogger",
    isFeatured: true,
    isDrop: false,
    rating: 4.9,
    reviewCount: 167,
    tags: ["cargo", "jogger", "olive", "lower", "utility"]
  }
];

async function seed() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully!");

  console.log("Clearing existing products and seeding fresh catalog...");
  await Product.deleteMany({});

  for (const item of products) {
    // Generate inventory variants
    const inventory = [];
    const sizes = item.sizes || ["S", "M", "L", "XL"];
    const colors = item.colors || [{ name: "Standard", hex: "#000000" }];
    for (const s of sizes) {
      for (const c of colors) {
        inventory.push({
          size: s,
          color: c.name,
          stock: Math.floor(Math.random() * 40) + 20,
          sold: Math.floor(Math.random() * 30),
        });
      }
    }
    const totalStock = inventory.reduce((acc, curr) => acc + curr.stock, 0);

    await Product.create({
      ...item,
      inventory,
      totalStock,
    });
  }
  console.log(`Seeded ${products.length} products successfully!`);

  // Seed Admin user
  const adminPassword = await bcrypt.hash("bong99admin", 10);
  await User.findOneAndUpdate(
    { email: "admin@bong99.com" },
    {
      name: "Bong99 Master Admin",
      email: "admin@bong99.com",
      password: adminPassword,
      phone: "+91 98765 43210",
      role: "admin",
    },
    { upsert: true, new: true }
  );
  console.log("Admin user seeded: admin@bong99.com / bong99admin");

  // Seed Demo Customer
  const custPassword = await bcrypt.hash("password123", 10);
  await User.findOneAndUpdate(
    { email: "customer@bong99.com" },
    {
      name: "Rahul Sharma",
      email: "customer@bong99.com",
      password: custPassword,
      phone: "+91 98300 12345",
      role: "customer",
      addresses: [
        {
          fullName: "Rahul Sharma",
          phone: "+91 98300 12345",
          addressLine: "Flat 4B, Park Mansions, Park Street",
          city: "Kolkata",
          state: "West Bengal",
          pincode: "700016",
          isDefault: true,
        }
      ]
    },
    { upsert: true, new: true }
  );
  console.log("Customer user seeded: customer@bong99.com / password123");

  // Seed Coupons
  await Coupon.deleteMany({});
  await Coupon.create([
    {
      code: "BONG99",
      discountType: "fixed",
      discountValue: 50,
      minOrderAmount: 299,
      maxDiscountAmount: 50,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      usageLimit: 5000,
      isActive: true,
    },
    {
      code: "WELCOME10",
      discountType: "percentage",
      discountValue: 10,
      minOrderAmount: 199,
      maxDiscountAmount: 200,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      usageLimit: 2000,
      isActive: true,
    },
    {
      code: "FASHION20",
      discountType: "percentage",
      discountValue: 20,
      minOrderAmount: 499,
      maxDiscountAmount: 300,
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      usageLimit: 1000,
      isActive: true,
    }
  ]);
  console.log("Coupons seeded: BONG99, WELCOME10, FASHION20");

  console.log("Seed completed successfully!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seed error:", err);
  process.exit(1);
});
