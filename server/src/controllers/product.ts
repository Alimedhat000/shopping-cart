import { Request, Response } from "express";
import prisma from "../models/prisma";
import { toTitleCase } from "../utils/toTitleCase";
import logger from "../utils/logger";

export const getProductDetails = async (req: Request, res: Response) => {
  try {
    logger.info("Fetching product details", { params: req.params });

    const { productHandle } = req.params;
    if (!/^[a-z0-9-]+$/.test(productHandle)) {
      logger.warn("Invalid product handle format", { productHandle });

      res.status(400).json({ error: "Invalid product handle format" });
      return;
    }

    const product = await prisma.product.findUnique({
      where: { handle: productHandle },
      include: {
        images: true,
        variants: true,
        options: true,
      },
    });

    if (!product) {
      logger.warn("Product not found", { productHandle });

      res.status(404).json({ error: "Product not found" });
      return;
    }

    logger.info("Product details fetched", { productHandle });

    res.json(product);
  } catch (err) {
    logger.error("Failed to fetch product", { error: err });
    res.status(500).json({ error: "Failed to fetch product details" });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    logger.info("Fetching all products", { query: req.query });
    // pagination
    const rawPage = parseInt(req.query.page as string);
    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

    const rawLimit = parseInt(req.query.limit as string);
    const limit = Number.isInteger(rawLimit) && rawLimit > 0 ? rawLimit : 30;
    const skip = (page - 1) * limit;
    // Sorting
    const allowedSortFields = [
      "createdAt",
      "updatedAt",
      "publishedAt",
      "price",
      "title",
      "vendor",
      "productType",
    ];
    const sortBy = allowedSortFields.includes(req.query.sortBy as string)
      ? (req.query.sortBy as string)
      : "createdAt";
    const sortOrder =
      (req.query.sortOrder as string) === "asc" ? "asc" : "desc";
    // Search
    const search = (req.query.search as string)?.toLowerCase();
    const vendor = req.query.vendor
      ? toTitleCase(req.query.vendor as string)
      : undefined;
    const productType = req.query.productType as string;
    const tags = req.query.tags
      ? (req.query.tags as string).split(",").map((tag) => toTitleCase(tag))
      : [];

    const fields = req.query.fields
      ? (req.query.fields as string).split(",").map((f) => f.trim())
      : [];

    const excludeId = req.query.excludeId
      ? BigInt(req.query.excludeId as string)
      : undefined;

    // Build Where object
    const where: any = {};
    if (search) {
      where.title = { contains: search, mode: "insensitive" };
    }
    if (vendor) {
      where.vendor = { contains: vendor, mode: "insensitive" };
    }
    if (productType) {
      where.productType = { contains: productType, mode: "insensitive" };
    }
    if (tags.length > 0) {
      where.tags = { hasEvery: tags };
    }

    if (excludeId) {
      where.NOT = { id: excludeId };
    }

    const allowedFields = [
      "id",
      "title",
      "handle",
      "vendor",
      "body_html",
      "productType",
      "tags",
      "createdAt",
      "updatedAt",
      "publishedAt",
    ];

    const select = fields.length
      ? fields.reduce((acc, field) => {
          if (allowedFields.includes(field)) acc[field] = true;
          return acc;
        }, {} as Record<string, boolean>)
      : undefined;

    const products = await prisma.product.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
      ...(select && { select }),
      include: {
        variants: true,
        images: true,
      },
    });

    const totalCount = await prisma.product.count({ where });

    logger.info("Fetched products", {
      count: products.length,
      page,
      limit,
      query: req.query,
    });

    res.setHeader("Content-Type", "application/json");
    res.json({ products, count: totalCount });
  } catch (err) {
    logger.error("Failed to fetch products", { error: err });
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Todo Admin Post/Update/Delete
