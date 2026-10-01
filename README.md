# Bong99 — Premium Indian Street-Fashion E-Commerce

> **"STYLE STARTS AT ₹99"** — *Trendy clothing. Crazy prices.*

Bong99 is a full-stack, highly animated modern streetwear brand e-commerce platform built around the core concept that fashion-forward clothing can be premium, high-density, and bio-washed without inflated mall markups.

---

## 🚀 Key Brand & Pricing Identity

| Category | Price | Signature Aesthetics & Silhouettes |
| :--- | :--- | :--- |
| **Plain T-Shirts** | **₹99** | 100% Super-combed Bio-Washed Cotton (180 GSM). 7+ vibrant solid colorways. |
| **Printed T-Shirts** | **₹149** | Cyberpunk Bears, Tokyo Raves, Acid-Wash Rebel Smiley, Non-cracking screen ink (200 GSM). |
| **Polo T-Shirts** | **₹189** | Honeycomb 220 GSM Pique Cotton with anti-curl double-knit collars & tailored placket. |
| **Off-Shoulder Tees** | **₹189** | Korean relaxed slouch cut with elongated drop-shoulders and boxy street drape. |
| **Lowers & Track Pants**| **₹179** | Contrast athletic racing stripes, deep zipper utility pockets & pleated straight trousers. |

---

## 🎬 Reference Video & Image Animations

1. **Plain T-Shirts — Clothes Rack to Front 3D Presentation** (`/plain-tshirts`)
   - *Reference*: `plane tshirt page .png` & `plan tshirt page 2.png` (Ugmonk/BAFK wardrobe concept).
   - Side-by-side hanging t-shirts on a wooden rack; scrolling or selecting glides the chosen shirt directly to the front for full 360° inspection and one-click buying.

2. **Printed T-Shirts — 360° Graphic Orbit Experience** (`/printed-tshirts`)
   - *Reference*: `printed tshirt page.mov`.
   - Central floating Bong99 apparel tag surrounded by an orbiting constellation of graphic streetwear tees that fan out and rotate dynamically on scroll.

3. **Polo T-Shirts — Rotating Radial Wheel Arc** (`/polo`)
   - *Reference*: `polo tshirt .png`.
   - High-contrast editorial typography on the left (*"PREMIUM QUALITY YOU CAN FEEL"*) and a circular rotating carousel wheel on the right showcasing different polo colors on scroll.

4. **Lowers — Mobile Viewfinder Runway** (`/lowers`)
   - *Reference*: `lower page.mov`.
   - Center mobile phone frame with the pill *"🔍 Your Bottom Wear Matters More!"*, with bottoms gliding horizontally through the viewfinder.

5. **Homepage Morphing Scroller** (`/#scroll-experience`)
   - Interactive step-by-step product journey smoothly transitioning: **Plain → Printed → Polo → Off-Shoulder → Lower**.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router) + React 18
- **Styling**: Tailwind CSS + Custom Streetwear Dark Theme
- **Animations**: Framer Motion & GSAP Smooth Transforms
- **Database**: MongoDB Atlas (`Cluster0 / bong99`) via Mongoose
- **Image Storage & Uploads**: Cloudinary API (`wtzgxhnl`)
- **Authentication**: JWT-based session management with bcrypt password hashing
- **Payments**: Razorpay-ready structure + Cash on Delivery (COD) support

---

## 🔑 Configured Credentials

- **MongoDB Atlas**: Connected to `Cluster0` (`bong99` database)
- **Cloudinary**: Cloud `wtzgxhnl`, API Key `254813272263332`
- **Default Master Admin**: `admin@bong99.com` / `bong99admin`
- **Default Demo Customer**: `customer@bong99.com` / `password123`
- **Coupons**: `BONG99` (₹50 off), `WELCOME10` (10% off), `FASHION20` (20% off)

---

## 🏃 Running the Application

### 1. Development Mode
```bash
npm run dev
```

### 2. Seed Database
```bash
npm run seed
```

### 3. Production Build & Start
```bash
npm run build
npm run start
```
Server runs at `http://localhost:3000`.

---

## 📱 Routes & Features

- **`/`**: Streetwear Hero, Scroller, 4 Animation Experiences, "Why Pay More?" Matrix, Reviews.
- **`/shop`**: Full catalog with multi-filters (Category, Price, Size, Color), instant search, and Quick View.
- **`/plain-tshirts`**: Dedicated clothes rack to front scroll experience.
- **`/printed-tshirts`**: Dedicated 360° graphic orbit experience.
- **`/polo`**: Dedicated rotating radial circle experience.
- **`/lowers`**: Dedicated mobile viewfinder bottom wear runway.
- **`/product/[slug]`**: PDP with swipeable image gallery, swatches, size selector, specs, and related drops.
- **`/cart`**: Persistent bag with free shipping progress bar and promo code validator.
- **`/checkout`**: Complete shipping collection + COD and Razorpay payment options.
- **`/order-success/[orderNumber]`**: Live order confirmation receipt with lifecycle tracker.
- **`/account`**: Customer portal (Login/Sign Up, addresses, order history).
- **`/admin`**: Master operations dashboard (Products, Inventory, Orders lifecycle, Customers, Coupons).
