import { type Price } from './price';

export type Category = 'women' | 'jewelry' | 'home';

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Variant {
  id: string;
  size: string;
  color: string;
  stock: number;
}

export interface ProductStory {
  /** The core crafting technique (e.g., Jamdani, Banarasi, Kantha) */
  craftTechnique: string;
  /** Regional origin (e.g., Varanasi, Bengal, Kanchipuram) */
  regionalOrigin: string;
  /** Detailed narrative block describing the artisan legacy and process */
  description: string;
}

export type AspectRatio = '4:5' | '3:4' | '1:1' | '16:9';

/** Map of Aspect Ratio to corresponding image URL */
export type ImageUrls = Record<AspectRatio, string>;

/**
 * First-class Product domain model per blueprint.
 * Includes a mandatory productStory field and strongly-typed aspect ratio image contracts.
 */
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: Price;
  /** List of images, each mapped strictly across required design system aspect ratios */
  images: ImageUrls[];
  variants: Variant[];
  occasionTags: string[];
  fabric: string;
  productStory: ProductStory;
  stockStatus: StockStatus;
  category: Category;
  metalType?: string; // Optional jewelry-specific metadata
  gemstoneType?: string; // Optional jewelry-specific metadata
}

/**
 * Placeholder / Forward-Compatible Types for future departments.
 * Keeps compilation clean and signals "not yet modeled" without data pollution.
 */
export interface JewelryProduct extends Product {
  category: 'jewelry';
  /** Stub for future jewelry-specific parameters (metalType, caratWeight, etc.) */
  metalType?: string;
}

export interface HomeProduct extends Product {
  category: 'home';
  /** Stub for future home-decor-specific parameters (dimensions, material, etc.) */
  dimensions?: { width: number; height: number; depth?: number };
}
