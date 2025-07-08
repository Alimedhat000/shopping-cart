import fs from "fs";
import path from "path";

const logPath = path.join(
  __dirname,
  `seed-${new Date().toISOString().replace(/[:.]/g, "-")}.log`
);
const logStream = fs.createWriteStream(logPath, { flags: "a" });

function log(message: string) {
  const timestamp = new Date().toISOString();
  const fullMessage = `[${timestamp}] ${message}`;
  console.log(fullMessage);
  logStream.write(fullMessage + "\n");
}

function logError(message: string, error: any) {
  const timestamp = new Date().toISOString();
  const errorMsg = `[${timestamp}] ERROR: ${message} - ${
    error?.message || error
  }`;
  console.error(errorMsg);
  logStream.write(errorMsg + "\n");
}

import { PrismaClient } from "../generated/prisma";
import productsData from "../scraper/output/products.json";
import collectionsData from "../scraper/output/collections.json";
import { Image, Variant, ProductOption } from "../types/schemas";

const prisma = new PrismaClient();

async function main() {
  // Clean the db first - order matters due to foreign key constraints
  await prisma.collectionProduct.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.image.deleteMany();
  await prisma.productOption.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();

  // Reset auto-increment sequences if using PostgreSQL
  // Uncomment these lines if you're using PostgreSQL:
  // await prisma.$executeRaw`ALTER SEQUENCE "Product_id_seq" RESTART WITH 1`;
  // await prisma.$executeRaw`ALTER SEQUENCE "Collection_id_seq" RESTART WITH 1`;
  // await prisma.$executeRaw`ALTER SEQUENCE "Image_id_seq" RESTART WITH 1`;

  // Remove duplicates from productsData based on id
  const uniqueProducts = Array.isArray(productsData)
    ? productsData.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p.id === product.id)
      )
    : [];

  log(`Processing ${uniqueProducts.length} unique products...`);

  // Process products with better error handling
  for (const [index, p] of uniqueProducts.entries()) {
    try {
      log(`Creating product ${index + 1}/${uniqueProducts.length}: ${p.title}`);

      await prisma.product.create({
        data: {
          id: BigInt(p.id),
          title: p.title,
          handle: p.handle,
          vendor: p.vendor,
          productType: p.product_type,
          body_html: p.body_html ?? undefined,
          tags: p.tags,
          createdAt: new Date(p.created_at),
          updatedAt: new Date(p.updated_at),
          publishedAt: p.published_at ? new Date(p.published_at) : undefined,
        },
      });
    } catch (error) {
      logError(`Error creating product ${p.title} (ID: ${p.id}):`, error);
      // Continue with next product instead of failing completely
      continue;
    }
  }

  log("Attaching variants, options, and images to products...");

  for (const [index, p] of uniqueProducts.entries()) {
    try {
      log(
        `Attaching variants, options, and images to product ${index + 1}/${
          uniqueProducts.length
        }: ${p.title}`
      );

      const productId = BigInt(p.id);

      // 1. Product Options
      for (const opt of p.options ?? []) {
        await prisma.productOption.create({
          data: {
            name: opt.name,
            position: opt.position,
            values: opt.values,
            product: { connect: { id: productId } },
          },
        });
      }

      // 2. Images
      for (const img of p.images ?? []) {
        await prisma.image.create({
          data: {
            id: BigInt(img.id),
            src: img.src,
            alt: (img as Image).alt ?? null,
            width: img.width,
            height: img.height,
            position: img.position,
            createdAt: new Date(img.created_at),
            updatedAt: new Date(img.updated_at),
            product: { connect: { id: productId } },
          },
        });
      }

      // 3. Variants (with optional featuredImage)
      for (const v of p.variants ?? []) {
        const data: any = {
          id: BigInt(v.id),
          title: v.title,
          option1: v.option1,
          option2: v.option2,
          option3: v.option3,
          available: v.available,
          price: parseFloat(v.price),
          compareAtPrice: v.compare_at_price
            ? parseFloat(v.compare_at_price)
            : null,
          position: v.position,
          createdAt: new Date(v.created_at),
          updatedAt: new Date(v.updated_at),
          product: { connect: { id: productId } },
        };

        // If featuredImage exists, use connectOrCreate
        if (v.featured_image) {
          data.featuredImage = {
            connectOrCreate: {
              where: { id: BigInt(v.featured_image.id) },
              create: {
                id: BigInt(v.featured_image.id),
                src: v.featured_image.src,
                alt: v.featured_image.alt,
                width: v.featured_image.width,
                height: v.featured_image.height,
                position: v.featured_image.position ?? 1,
                createdAt: new Date(v.featured_image.created_at),
                updatedAt: new Date(v.featured_image.updated_at),
              },
            },
          };
        }

        await prisma.variant.create({ data });
      }
    } catch (error) {
      logError(
        `Failed to attach nested data to product ${p.title} (ID: ${p.id})`,
        error
      );
      continue;
    }
  }

  // Remove duplicates from collectionsData based on id
  const uniqueCollections = Array.isArray(collectionsData)
    ? collectionsData.filter(
        (collection, index, self) =>
          index === self.findIndex((c) => c.id === collection.id)
      )
    : [];

  log(`Processing ${uniqueCollections.length} unique collections...`);

  // Process collections
  for (const [index, c] of uniqueCollections.entries()) {
    try {
      log(
        `Creating collection ${index + 1}/${uniqueCollections.length}: ${
          c.title
        }`
      );

      await prisma.collection.create({
        data: {
          id: BigInt(c.id),
          title: c.title,
          handle: c.handle,
          publishedAt: c.published_at ? new Date(c.published_at) : undefined,
          updatedAt: new Date(c.updated_at),
          productsCount: c.products_count,
        },
      });
    } catch (error) {
      logError(`Error creating collection ${c.title} (ID: ${c.id}):`, error);
      continue;
    }
  }

  // Create product-collection relationships
  log("Creating product-collection relationships...");
  for (const [index, p] of uniqueProducts.entries()) {
    try {
      const productId = BigInt(p.id);
      const vendor = p.vendor;

      log(
        `Creating product-collection relationship for product ${index + 1}/${
          uniqueProducts.length
        }: ${p.title}`
      );

      const matchingCollection = await prisma.collection.findFirst({
        where: {
          title: vendor,
        },
      });

      if (matchingCollection) {
        await prisma.collectionProduct.create({
          data: {
            product: { connect: { id: productId } },
            collection: { connect: { id: matchingCollection.id } },
          },
        });
      }

      // 2. Attach to tag-based collections
      const tagSetsToCollectionTitles: Record<string, string> = {
        "women,essentials": "Women's Essentials",
        "women,modest": "Women's Modest",
        "women,night out": "Women's Night Out",
        "women,casuals": "Women's Casuals",
        "women,beachwear": "Women's Beachwear",
        "women,sportswear": "Women's Sportswear",
        "women,clothing": "Women's Clothing",
        "women,jackets": "Women's Jackets",
        "women,denim": "Women's Denim",
        "women,dresses": "Women's Dresses",
        "women,loungewear": "Women Loungewear",
        "women,skirts": "Women's Skirts",
        "women,tops": "Women's Tops",
        "women,mini bags": "Women Mini Bags",
        "women,crossbody bags": "Women's Crossbody Bags",
        "women,glasses": "Women Glasses",
        "women,hats & caps": "Women Hats & Caps",

        "men,essentials": "Men's Essentials",
        "men,casuals": "Men's Casuals",
        "men,sportswear": "Men's Sportswear",
        "men,loungewear": "Men Loungewear",
        "men,beachwear": "Men's Beachwear",
        "men,jackets": "Men's Jackets",
        "men,clothing": "Men's Clothing",
        "men,shorts": "Men's Shorts",
        "men,hoodies": "Men's Hoodies",
        "men,pants": "Men's Pants",
        "men,denim": "Men's Denim",
        "men,t-shirts": "Men's T-Shirts",

        bags: "Bags",
        essentials: "Essentials",
        modest: "Modest",
        "night out": "Night Out",
        casuals: "Casuals",
        loungewear: "Loungewear",
        "swimwear & beachwear": "Swimwear & Beachwear",
        sportswear: "Sportswear",
      };

      const productTags = p.tags.map((t: string) => t.trim().toLowerCase());

      for (const [tagCombo, collectionTitle] of Object.entries(
        tagSetsToCollectionTitles
      )) {
        const comboTags = tagCombo
          .split(",")
          .map((t) => t.trim().toLowerCase());

        const hasAllTags = comboTags.every((tag) => productTags.includes(tag));

        if (hasAllTags) {
          log(
            `product ${index + 1}/${uniqueProducts.length}: ${
              p.title
            } matched tags of collection ${collectionTitle}`
          );
          const collection = await prisma.collection.findFirst({
            where: { title: collectionTitle },
          });

          if (collection) {
            log(
              `Creating product-collection relationship for product ${
                index + 1
              }/${uniqueProducts.length}: ${
                p.title
              } and collection ${collectionTitle}`
            );
            await prisma.collectionProduct.create({
              data: {
                product: { connect: { id: productId } },
                collection: { connect: { id: collection.id } },
              },
            });
          } else {
            log(`Didn't find collection ${collectionTitle}`);
          }
        }
      }
    } catch (error) {
      logError(`Error creating relationship for product ${p.title}:`, error);
      continue;
    }
  }

  log("Seed completed successfully!");
}

main()
  .catch((e) => {
    logError("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    logStream.end();
  });
