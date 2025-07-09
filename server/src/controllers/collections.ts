import { Request, Response } from "express";
import prisma from "../models/prisma";
import { toTitleCase } from "../utils/toTitleCase";
import logger from "../utils/logger"; // add this at the top

export const getCollectionProducts = async (req: Request, res: Response) => {
  try {
    logger.info("Fetching products in collection", {
      params: req.params,
      query: req.query,
    });
    const { collectionHandle } = req.params;

    if (!/^[a-z0-9-]+$/.test(collectionHandle)) {
      logger.warn("Invalid collection handle format", { collectionHandle });
      res.status(400).json({ error: "Invalid collection handle format" });
      return;
    }

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

    const products = await prisma.product.findMany({
      where: {
        collections: {
          some: {
            collection: {
              handle: collectionHandle,
            },
          },
        },
        ...where,
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    });

    if (!products) {
      logger.warn("Collection products not found", { collectionHandle });

      res.status(404).json({ error: "collection products not found" });
      return;
    }

    logger.info("Fetched collection products", {
      collectionHandle,
      count: products.length,
    });

    res.setHeader("Content-Type", "application/json");
    res.json({ products });
  } catch (err) {
    logger.error("Failed to fetch collection products", { error: err });
    res.status(500).json({ error: "Failed to fetch collection products" });
  }
};

export const getCollectionDetails = async (req: Request, res: Response) => {
  try {
    const { collectionHandle } = req.params;
    logger.info("Fetching collection details", { collectionHandle });

    if (!/^[a-z0-9-]+$/.test(collectionHandle)) {
      logger.warn("Invalid collection handle format", { collectionHandle });

      res.status(400).json({ error: "Invalid collection handle format" });
      return;
    }
    const collection = await prisma.collection.findUnique({
      where: { handle: collectionHandle },
    });

    if (!collection) {
      logger.warn("Collection not found", { collectionHandle });
      res.status(404).json({ error: "Collection not found" });
      return;
    }

    logger.info("Collection details fetched", { collectionHandle });

    res.setHeader("Content-Type", "application/json");
    res.json(collection);
  } catch (err) {
    logger.error("Failed to fetch collection details", { error: err });
    res.status(500).json({ error: "Failed to fetch collection details" });
  }
};

export const getAllCollections = async (req: Request, res: Response) => {
  try {
    logger.info("Fetching all collections", { query: req.query });

    // pagination
    const rawPage = parseInt(req.query.page as string);
    const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

    const rawLimit = parseInt(req.query.limit as string);
    const limit = Number.isInteger(rawLimit) && rawLimit > 0 ? rawLimit : 30;
    const skip = (page - 1) * limit;
    // Sorting
    const allowedSortFields = ["updatedAt", "publishedAt", "title"];
    const sortBy = allowedSortFields.includes(req.query.sortBy as string)
      ? (req.query.sortBy as string)
      : "publishedAt2";
    const sortOrder =
      (req.query.sortOrder as string) === "asc" ? "asc" : "desc";

    const allowedFields = [
      "id",
      "title",
      "handle",
      "body_html",
      "publishedAt",
      "updatedAt",
      "productsCount",
    ];

    const fields = req.query.fields
      ? (req.query.fields as string).split(",").map((f) => f.trim())
      : [];

    const select = fields.length
      ? fields.reduce((acc, field) => {
          if (allowedFields.includes(field)) acc[field] = true;
          return acc;
        }, {} as Record<string, boolean>)
      : undefined; // undefined = select all

    const collection = await prisma.collection.findMany({
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
      ...(select && { select }),
    });

    logger.info("Fetched collections", { count: collection.length });

    res.setHeader("Content-Type", "application/json");
    res.json(collection);
  } catch (err) {
    logger.error("Failed to fetch collections", { error: err });
    res.status(500).json({ error: "Failed to fetch collections" });
  }
};

// Todo Admin Put/Post/Delete Add/Remove product to collection
