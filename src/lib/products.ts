import pSerum from "@/assets/p-serum.jpg";
import pPerfume from "@/assets/p-perfume.jpg";
import pOil from "@/assets/p-oil.jpg";
import pCream from "@/assets/p-cream.jpg";
import pScrub from "@/assets/p-scrub.jpg";
import pLotion from "@/assets/p-lotion.jpg";
import pGift from "@/assets/p-gift.jpg";
import catPerfumes from "@/assets/cat-perfumes.jpg";
import catBody from "@/assets/cat-body.jpg";
import catSkincare from "@/assets/cat-skincare.jpg";
import catGift from "@/assets/cat-gift.jpg";

export type Category = "Perfumes" | "Body Care" | "Skincare" | "Gift Sets";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  subtitle: string;
  rating: number;
  reviews: number;
  bestSeller?: boolean;
  newArrival?: boolean;
  inventory: number;
}

export const categoryImages: Record<Category, string> = {
  Perfumes: catPerfumes,
  "Body Care": catBody,
  Skincare: catSkincare,
  "Gift Sets": catGift,
};

export const products: Product[] = [
  {
    id: "liquid-gold-serum",
    name: "Liquid Gold Serum",
    category: "Skincare",
    price: 82,
    image: pSerum,
    subtitle: "Hydration & Radiance",
    rating: 4.9,
    reviews: 328,
    bestSeller: true,
    inventory: 42,
  },
  {
    id: "midnight-bloom-eau",
    name: "Midnight Bloom Eau",
    category: "Perfumes",
    price: 145,
    image: pPerfume,
    subtitle: "50ml • Floral Musk",
    rating: 4.8,
    reviews: 214,
    bestSeller: true,
    inventory: 18,
  },
  {
    id: "satin-body-oil",
    name: "Satin Body Oil",
    category: "Body Care",
    price: 64,
    image: pOil,
    subtitle: "Infused with Jasmine",
    rating: 4.7,
    reviews: 176,
    bestSeller: true,
    inventory: 55,
  },
  {
    id: "peony-face-cream",
    name: "Peony Face Cream",
    category: "Skincare",
    price: 68,
    image: pCream,
    subtitle: "Barrier Repair Moisturizer",
    rating: 4.9,
    reviews: 402,
    newArrival: true,
    inventory: 30,
  },
  {
    id: "sugar-glow-scrub",
    name: "Sugar Glow Scrub",
    category: "Body Care",
    price: 38,
    image: pScrub,
    subtitle: "Polishing • Vanilla Sugar",
    rating: 4.6,
    reviews: 120,
    inventory: 60,
  },
  {
    id: "rose-shimmer-lotion",
    name: "Rose Shimmer Lotion",
    category: "Body Care",
    price: 46,
    image: pLotion,
    subtitle: "Rose Gold Glow",
    rating: 4.8,
    reviews: 88,
    newArrival: true,
    inventory: 24,
  },
  {
    id: "atelier-gift-edit",
    name: "The Atelier Gift Edit",
    category: "Gift Sets",
    price: 210,
    image: pGift,
    subtitle: "Curated Ritual Box",
    rating: 5.0,
    reviews: 54,
    bestSeller: true,
    newArrival: true,
    inventory: 12,
  },
  {
    id: "velvet-dusk-parfum",
    name: "Velvet Dusk Parfum",
    category: "Perfumes",
    price: 165,
    image: pPerfume,
    subtitle: "50ml • Sandalwood & Amber",
    rating: 4.7,
    reviews: 92,
    inventory: 20,
  },
  {
    id: "silk-hand-cream",
    name: "Silk Hand Cream",
    category: "Body Care",
    price: 28,
    image: pCream,
    subtitle: "Deep Nourishing",
    rating: 4.5,
    reviews: 66,
    inventory: 80,
  },
];

export const categories: Category[] = ["Perfumes", "Body Care", "Skincare", "Gift Sets"];

export const getProduct = (id: string) => products.find((p) => p.id === id);
