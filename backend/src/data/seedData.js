import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/User.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";

dotenv.config();

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    description:
      "The ultimate iPhone with A17 Pro chip, titanium design, and pro camera system.",
    price: 134900,
    category: "Electronics",
    stock: 50,
    rating: 4.8,
    numReviews: 120,
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
        publicId: "sample/iphone15",
      },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    description: "200MP camera, built-in S Pen, Snapdragon 8 Gen 3 processor.",
    price: 129999,
    category: "Electronics",
    stock: 35,
    rating: 4.7,
    numReviews: 95,
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
        publicId: "sample/samsung-s24",
      },
    ],
  },
  {
    name: "MacBook Pro M3",
    slug: "macbook-pro-m3",
    description:
      "Supercharged by M3 Pro chip for pro-level performance and battery life.",
    price: 199900,
    category: "Electronics",
    stock: 15,
    rating: 4.9,
    numReviews: 89,
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
        publicId: "sample/macbook",
      },
    ],
  },
  {
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    description:
      "Industry-leading noise canceling headphones with exceptional sound quality.",
    price: 29990,
    category: "Electronics",
    stock: 30,
    rating: 4.7,
    numReviews: 85,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        publicId: "sample/sony-headphones",
      },
    ],
  },
  {
    name: 'Smart LED TV 55"',
    slug: "smart-led-tv-55",
    description:
      "4K Ultra HD Smart TV with built-in streaming apps and Dolby Vision.",
    price: 54999,
    category: "Electronics",
    stock: 20,
    rating: 4.6,
    numReviews: 45,
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
        publicId: "sample/smart-tv",
      },
    ],
  },
  {
    name: "OnePlus 12",
    slug: "oneplus-12",
    description: "Hasselblad camera, 100W fast charging, Snapdragon 8 Gen 3.",
    price: 64999,
    category: "Electronics",
    stock: 40,
    rating: 4.6,
    numReviews: 78,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
        publicId: "sample/oneplus12",
      },
    ],
  },
  {
    name: "iPad Pro 12.9 M2",
    slug: "ipad-pro-12-m2",
    description:
      "Pro display, M2 chip, compatible with Apple Pencil 2nd generation.",
    price: 112900,
    category: "Electronics",
    stock: 25,
    rating: 4.8,
    numReviews: 67,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
        publicId: "sample/ipad-pro",
      },
    ],
  },
  {
    name: "Boat Rockerz 450",
    slug: "boat-rockerz-450",
    description:
      "On-ear wireless headphones with 15 hours battery and deep bass.",
    price: 1499,
    category: "Electronics",
    stock: 120,
    rating: 4.2,
    numReviews: 340,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
        publicId: "sample/boat-rockerz",
      },
    ],
  },
  {
    name: "Canon EOS R50",
    slug: "canon-eos-r50",
    description:
      "Lightweight mirrorless camera with 24.2MP, ideal for beginners and vloggers.",
    price: 74995,
    category: "Electronics",
    stock: 12,
    rating: 4.5,
    numReviews: 42,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
        publicId: "sample/canon-r50",
      },
    ],
  },
  {
    name: "Mi Power Bank 20000mAh",
    slug: "mi-power-bank-20000",
    description: "20000mAh capacity, 18W fast charging, dual USB output.",
    price: 1299,
    category: "Electronics",
    stock: 200,
    rating: 4.4,
    numReviews: 560,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
        publicId: "sample/powerbank",
      },
    ],
  },

  // ===========================
  // FASHION + CLOTHING (10)
  // ===========================
  {
    name: "Men Casual Shirt",
    slug: "men-casual-shirt",
    description: "Cotton casual shirt perfect for summer outings.",
    price: 1499,
    category: "Clothing",
    stock: 150,
    rating: 4.3,
    numReviews: 75,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
        publicId: "sample/casual-shirt",
      },
    ],
  },
  {
    name: "Women Kurti Floral",
    slug: "women-kurti-floral",
    description: "Beautiful cotton kurti with floral Indian design patterns.",
    price: 899,
    category: "Clothing",
    stock: 200,
    rating: 4.4,
    numReviews: 132,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop",
        publicId: "sample/kurti",
      },
    ],
  },
  {
    name: "Nike Air Max 270",
    slug: "nike-air-max-270",
    description:
      "Comfortable running shoes with iconic Air Max 270 cushioning.",
    price: 12995,
    category: "Sports",
    stock: 100,
    rating: 4.5,
    numReviews: 200,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        publicId: "sample/nike-shoes",
      },
    ],
  },
  {
    name: "Levi's 511 Slim Jeans",
    slug: "levis-511-slim-jeans",
    description: "Classic slim fit jeans in stretch denim for all-day comfort.",
    price: 3499,
    category: "Clothing",
    stock: 180,
    rating: 4.5,
    numReviews: 210,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        publicId: "sample/levis-jeans",
      },
    ],
  },
  {
    name: "Men Formal Suit",
    slug: "men-formal-suit",
    description: "Premium 2-piece formal suit perfect for office and events.",
    price: 7999,
    category: "Clothing",
    stock: 60,
    rating: 4.4,
    numReviews: 88,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop",
        publicId: "sample/formal-suit",
      },
    ],
  },
  {
    name: "Women Saree Silk",
    slug: "women-saree-silk",
    description: "Pure silk saree with zari border, perfect for festivals.",
    price: 4999,
    category: "Clothing",
    stock: 80,
    rating: 4.7,
    numReviews: 156,
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
        publicId: "sample/silk-saree",
      },
    ],
  },
  {
    name: "Puma Sports T-Shirt",
    slug: "puma-sports-tshirt",
    description: "Dry-fit sports t-shirt with moisture-wicking technology.",
    price: 999,
    category: "Sports",
    stock: 250,
    rating: 4.3,
    numReviews: 190,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
        publicId: "sample/puma-tshirt",
      },
    ],
  },
  {
    name: "Women Handbag Leather",
    slug: "women-handbag-leather",
    description: "Premium PU leather handbag with multiple compartments.",
    price: 2499,
    category: "Clothing",
    stock: 90,
    rating: 4.5,
    numReviews: 112,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
        publicId: "sample/handbag",
      },
    ],
  },
  {
    name: "Ray-Ban Aviator Sunglasses",
    slug: "rayban-aviator-sunglasses",
    description: "Classic aviator style with UV400 protection.",
    price: 6990,
    category: "Clothing",
    stock: 70,
    rating: 4.6,
    numReviews: 145,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        publicId: "sample/sunglasses",
      },
    ],
  },
  {
    name: "Woodland Trekking Shoes",
    slug: "woodland-trekking-shoes",
    description: "Water-resistant trekking shoes with anti-skid sole.",
    price: 3499,
    category: "Sports",
    stock: 110,
    rating: 4.4,
    numReviews: 98,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=400&fit=crop",
        publicId: "sample/woodland-shoes",
      },
    ],
  },

  // ===========================
  // HOME + KITCHEN (10)
  // ===========================
  {
    name: "Prestige Pressure Cooker 5L",
    slug: "prestige-pressure-cooker-5l",
    description: "5 litre aluminium pressure cooker with safety valve.",
    price: 1299,
    category: "Home",
    stock: 300,
    rating: 4.6,
    numReviews: 450,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
        publicId: "sample/pressure-cooker",
      },
    ],
  },
  {
    name: "Philips Air Fryer",
    slug: "philips-air-fryer",
    description:
      "4.1L capacity, uses up to 90% less fat. Rapid Air technology.",
    price: 9999,
    category: "Home",
    stock: 45,
    rating: 4.7,
    numReviews: 234,
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1648070375693-da39bc9f5d6a?w=400&h=400&fit=crop",
        publicId: "sample/air-fryer",
      },
    ],
  },
  {
    name: "Stainless Steel Water Bottle",
    slug: "steel-water-bottle",
    description: "Keeps drinks cold 24 hours and hot 12 hours. BPA free.",
    price: 599,
    category: "Home",
    stock: 300,
    rating: 4.7,
    numReviews: 210,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
        publicId: "sample/water-bottle",
      },
    ],
  },
  {
    name: "Bajaj Mixer Grinder 750W",
    slug: "bajaj-mixer-grinder-750w",
    description: "750W powerful motor with 3 jars for grinding and mixing.",
    price: 2799,
    category: "Home",
    stock: 85,
    rating: 4.3,
    numReviews: 187,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
        publicId: "sample/mixer-grinder",
      },
    ],
  },
  {
    name: "Cotton Bedsheet King Size",
    slug: "cotton-bedsheet-king-size",
    description:
      "100% premium cotton, 300 thread count, king size with 2 pillow covers.",
    price: 1799,
    category: "Home",
    stock: 160,
    rating: 4.5,
    numReviews: 320,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
        publicId: "sample/bedsheet",
      },
    ],
  },
  {
    name: "Decorative Wall Clock",
    slug: "decorative-wall-clock",
    description:
      "Modern silent wall clock with wooden frame, 12 inch diameter.",
    price: 799,
    category: "Home",
    stock: 140,
    rating: 4.4,
    numReviews: 95,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop",
        publicId: "sample/wall-clock",
      },
    ],
  },
  {
    name: "Bosch Vacuum Cleaner",
    slug: "bosch-vacuum-cleaner",
    description:
      "1600W bagless vacuum cleaner with HEPA filter and 2.5L capacity.",
    price: 8999,
    category: "Home",
    stock: 30,
    rating: 4.6,
    numReviews: 78,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        publicId: "sample/vacuum-cleaner",
      },
    ],
  },
  {
    name: "Scented Candle Set",
    slug: "scented-candle-set",
    description:
      "Set of 6 aromatic candles - lavender, vanilla, rose, jasmine.",
    price: 699,
    category: "Home",
    stock: 200,
    rating: 4.5,
    numReviews: 145,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1602607656374-89fac4559e97?w=400&h=400&fit=crop",
        publicId: "sample/candle-set",
      },
    ],
  },
  {
    name: "Non-Stick Cookware Set",
    slug: "non-stick-cookware-set",
    description: "5-piece non-stick aluminium cookware set with glass lids.",
    price: 2499,
    category: "Home",
    stock: 75,
    rating: 4.4,
    numReviews: 167,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
        publicId: "sample/cookware",
      },
    ],
  },
  {
    name: "The Alchemist",
    slug: "the-alchemist",
    description:
      "A bestselling novel by Paulo Coelho about following your dreams.",
    price: 350,
    category: "Books",
    stock: 200,
    rating: 4.9,
    numReviews: 500,
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
        publicId: "sample/alchemist-book",
      },
    ],
  },
];

const sampleCoupons = [
  {
    code: "WELCOME10",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 500,
    maxDiscountAmount: 500,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    usageLimit: 100,
    perUserLimit: 1,
    isActive: true,
  },
  {
    code: "SAVE200",
    discountType: "fixed",
    discountValue: 200,
    minOrderAmount: 1000,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    usageLimit: 50,
    perUserLimit: 1,
    isActive: true,
  },
  {
    code: "FLAT500",
    discountType: "fixed",
    discountValue: 500,
    minOrderAmount: 2000,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    usageLimit: 200,
    perUserLimit: 2,
    isActive: true,
  },
  {
    code: "ELECTRONICS15",
    discountType: "percentage",
    discountValue: 15,
    minOrderAmount: 5000,
    maxDiscountAmount: 2000,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    usageLimit: 30,
    perUserLimit: 1,
    isActive: true,
  },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany();
    await Coupon.deleteMany();

    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Added ${createdProducts.length} products`);

    const createdCoupons = await Coupon.insertMany(sampleCoupons);
    console.log(`✅ Added ${createdCoupons.length} coupons`);

    const adminExists = await User.findOne({ email: "admin@shopease.com" });
    if (!adminExists) {
      await User.create({
        name: "Admin User",
        email: "admin@shopease.com",
        password: "Admin123!",
        role: "admin",
      });
      console.log(
        "✅ Admin created → email: admin@shopease.com | password: Admin123!",
      );
    } else {
      console.log("ℹ️ Admin already exists");
    }

    console.log("\n🎉 Seed data imported successfully!");
    console.log(`\n📦 Total Products: ${createdProducts.length}`);
    console.log("   📱 Electronics: 10 products");
    console.log("   👗 Fashion/Clothing: 10 products");
    console.log("   🏠 Home/Kitchen: 10 products");
    console.log("\n🎟️ Coupons:");
    console.log("   WELCOME10     → 10% off (min ₹500)");
    console.log("   SAVE200       → ₹200 off (min ₹1000)");
    console.log("   FLAT500       → ₹500 off (min ₹2000)");
    console.log("   ELECTRONICS15 → 15% off (min ₹5000, max ₹2000 off)");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Coupon.deleteMany();
    await User.deleteMany({ role: "user" });
    console.log("⚠️ Data destroyed!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
