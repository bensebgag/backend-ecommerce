import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─────────────────────────────────────────
  // 1. CATEGORIES
  // ─────────────────────────────────────────
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: "Sneakers" },
      update: {},
      create: { name: "Sneakers" },
    }),
    prisma.category.upsert({
      where: { name: "Running Shoes" },
      update: {},
      create: { name: "Running Shoes" },
    }),
    prisma.category.upsert({
      where: { name: "Boots" },
      update: {},
      create: { name: "Boots" },
    }),
    prisma.category.upsert({
      where: { name: "Sandals" },
      update: {},
      create: { name: "Sandals" },
    }),
    prisma.category.upsert({
      where: { name: "Formal Shoes" },
      update: {},
      create: { name: "Formal Shoes" },
    }),
  ]);

  const [sneakers, running, boots, sandals, formal] = categories;
  console.log("✅ Categories created");

  // ─────────────────────────────────────────
  // 2. USERS  (real Clerk IDs)
  // ─────────────────────────────────────────
  const zakaria = await prisma.user.upsert({
    where: { Clerkid: "user_2tiLuK4NR3rlzPfUb6hXZ3h0MUa" },
    update: {},
    create: {
      Clerkid: "user_2tiLuK4NR3rlzPfUb6hXZ3h0MUa",
      role: Role.USER,
      name: "Zakaria Babel Hadj",
    },
  });

  const admin = await prisma.user.upsert({
    where: { Clerkid: "user_2ti6UNOK6L27VfRHgtqxQdzRnQ3" },
    update: {},
    create: {
      Clerkid: "user_2ti6UNOK6L27VfRHgtqxQdzRnQ3",
      role: Role.ADMIN,
      name: "Ben Sbgag",
    },
  });

  console.log("✅ Users created");

  // ─────────────────────────────────────────
  // 3. PRODUCTS
  // typesChoose = flat string[] of image filenames
  // matching how the API maps: (p.typesChoose as string[]).map(filename => `${host}/images/${filename}`)
  // ─────────────────────────────────────────
  const products = await Promise.all([
    // ── SNEAKERS ──────────────────────────
    prisma.product.create({
      data: {
        name: "Air Max Classic",
        categoryId: sneakers.id,
        price: 129.99,
        description:
          "A timeless low-top sneaker with a pristine white leather upper and superior cushioning. Perfect for everyday wear.",
        typesChoose: [
          "product-1744123567349-665598420.png",
          "product-1744123567351-123146905.png",
          "product-1744123567352-233335800.png",
        ],
        quantity: 150,
        discount: 10,
      },
    }),
    prisma.product.create({
      data: {
        name: "Urban Glide Pro",
        categoryId: sneakers.id,
        price: 99.99,
        description:
          "Street-ready sneakers built for comfort and style. Lightweight mesh upper with a responsive foam sole.",
        typesChoose: [
          "product-1744123567349-665598420.png",
          "product-1744123567351-123146905.png",
          "product-1744123567352-233335800.png",
        ],
        quantity: 200,
        discount: 0,
      },
    }),

    // ── RUNNING SHOES ─────────────────────
    prisma.product.create({
      data: {
        name: "SpeedRunner X1",
        categoryId: running.id,
        price: 159.99,
        description:
          "High-performance running shoe with a chunky responsive sole and bold colorway. Built for speed.",
        typesChoose: [
          "product-1744123803308-230112329.png",
          "product-1744123803309-90666781.png",
          "product-1744123803310-262553147.png",
        ],
        quantity: 80,
        discount: 5,
      },
    }),
    prisma.product.create({
      data: {
        name: "TrailBlaze 500",
        categoryId: running.id,
        price: 139.99,
        description:
          "All-terrain trail running shoe with aggressive outsole lugs and durable upper for off-road adventures.",
        typesChoose: [
          "product-1744123803308-230112329.png",
          "product-1744123803309-90666781.png",
          "product-1744123803310-262553147.png",
        ],
        quantity: 60,
        discount: 0,
      },
    }),

    // ── BOOTS ─────────────────────────────
    prisma.product.create({
      data: {
        name: "Chelsea Leather Boot",
        categoryId: boots.id,
        price: 179.99,
        description:
          "Classic Chelsea boot crafted from premium tan full-grain leather with elastic side panels and stacked heel.",
        typesChoose: [
          "product-1744123939180-10948460.png",
          "product-1744123939181-839992832.png",
          "product-1744123939182-185756323.png",
        ],
        quantity: 70,
        discount: 0,
      },
    }),
    prisma.product.create({
      data: {
        name: "Alpine Trek Boot",
        categoryId: boots.id,
        price: 219.99,
        description:
          "Heavy-duty hiking boots with ankle support, waterproof leather upper, and a grippy Vibram outsole.",
        typesChoose: [
          "product-1744123939180-10948460.png",
          "product-1744123939181-839992832.png",
          "product-1744123939182-185756323.png",
        ],
        quantity: 40,
        discount: 15,
      },
    }),

    // ── FORMAL SHOES ──────────────────────
    prisma.product.create({
      data: {
        name: "Oxford Elegance",
        categoryId: formal.id,
        price: 249.99,
        description:
          "Hand-stitched full brogue Oxford in genuine black calfskin leather. The ultimate shoe for business and formal events.",
        typesChoose: [
          "product-1744124068725-737896832.png",
          "product-1744124068726-543548715.png",
          "product-1744124068727-566676814.png",
        ],
        quantity: 30,
        discount: 0,
      },
    }),
    prisma.product.create({
      data: {
        name: "Derby Classic",
        categoryId: formal.id,
        price: 199.99,
        description:
          "Open-lacing Derby shoe in smooth leather with a sleek toe cap. Versatile enough for the office or evening wear.",
        typesChoose: [
          "product-1744124068725-737896832.png",
          "product-1744124068726-543548715.png",
          "product-1744124068727-566676814.png",
        ],
        quantity: 45,
        discount: 5,
      },
    }),

    // ── SANDALS ───────────────────────────
    prisma.product.create({
      data: {
        name: "Coastal Slide",
        categoryId: sandals.id,
        price: 49.99,
        description:
          "Lightweight recovery sandal with a contoured footbed and quick-dry adjustable straps.",
        typesChoose: [
          "product-1744124132740-671776020.png",
          "product-1744124132745-147580281.png",
        ],
        quantity: 120,
        discount: 0,
      },
    }),
    prisma.product.create({
      data: {
        name: "Desert Strap Sandal",
        categoryId: sandals.id,
        price: 69.99,
        description:
          "Multi-strap leather sandal with a cushioned insole, ideal for warm-weather outings and casual wear.",
        typesChoose: [
          "product-1744124132740-671776020.png",
          "product-1744124132745-147580281.png",
        ],
        quantity: 90,
        discount: 10,
      },
    }),
  ]);

  console.log("✅ Products created");

  // ─────────────────────────────────────────
  // 4. PRODUCT SIZES
  // ─────────────────────────────────────────
  const shoeSizes = [39, 40, 41, 42, 43, 44, 45];

  for (const product of products) {
    await Promise.all(
      shoeSizes.map((size) =>
        prisma.productSize.create({
          data: {
            productId: product.id,
            size,
            quantity: Math.floor(Math.random() * 20) + 5,
            price:
              size >= 44 ? parseFloat((product.price + 5).toFixed(2)) : null,
          },
        }),
      ),
    );
  }

  console.log("✅ Product sizes created");

  // ─────────────────────────────────────────
  // 5. REVIEWS
  // ─────────────────────────────────────────
  await Promise.all([
    prisma.review.create({
      data: { userId: zakaria.Clerkid, productId: products[0].id, like: 24 },
    }),
    prisma.review.create({
      data: { userId: zakaria.Clerkid, productId: products[2].id, like: 31 },
    }),
    prisma.review.create({
      data: { userId: zakaria.Clerkid, productId: products[4].id, like: 9 },
    }),
    prisma.review.create({
      data: { userId: admin.Clerkid, productId: products[6].id, like: 42 },
    }),
    prisma.review.create({
      data: { userId: admin.Clerkid, productId: products[8].id, like: 5 },
    }),
    prisma.review.create({
      data: { userId: zakaria.Clerkid, productId: products[9].id, like: 15 },
    }),
  ]);

  console.log("✅ Reviews created");

  // ─────────────────────────────────────────
  // 6. CHARTS (orders)
  // ─────────────────────────────────────────
  const zakariaChart = await prisma.chart.create({
    data: {
      userId: zakaria.Clerkid,
      orderAmount: 289.98,
      discount: 13.0,
      totalPayment: 276.98,
      products: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            selectedColors: { color: "White" },
            selectedSizes: { size: 42 },
          },
          {
            productId: products[8].id,
            quantity: 2,
            selectedColors: { color: "Brown" },
            selectedSizes: { size: 41 },
          },
        ],
      },
    },
  });

  const adminChart = await prisma.chart.create({
    data: {
      userId: admin.Clerkid,
      orderAmount: 409.98,
      discount: 33.0,
      totalPayment: 376.98,
      products: {
        create: [
          {
            productId: products[4].id,
            quantity: 1,
            selectedColors: { color: "Tan" },
            selectedSizes: { size: 43 },
          },
          {
            productId: products[6].id,
            quantity: 1,
            selectedColors: { color: "Black" },
            selectedSizes: { size: 42 },
          },
        ],
      },
    },
  });

  console.log("✅ Charts created");

  // ─────────────────────────────────────────
  // 7. BILLS
  // ─────────────────────────────────────────
  await Promise.all([
    prisma.bill.create({
      data: {
        userId: zakaria.Clerkid,
        chartId: zakariaChart.id,
        Invoice: "INV-2024-001",
        createdAt: new Date("2024-03-15T10:30:00Z"),
      },
    }),
    prisma.bill.create({
      data: {
        userId: admin.Clerkid,
        chartId: adminChart.id,
        Invoice: "INV-2024-002",
        createdAt: new Date("2024-04-02T14:00:00Z"),
      },
    }),
  ]);

  console.log("✅ Bills created");
  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
