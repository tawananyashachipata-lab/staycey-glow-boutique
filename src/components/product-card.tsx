import { Heart, Star } from "lucide-react";
import { useStore } from "@/lib/store-context";
import type { Product } from "@/lib/products";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const wished = isInWishlist(product.id);

  return (
    <article className="group relative flex flex-col">
      <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <button
          onClick={() => {
            toggleWishlist(product.id);
            toast(wished ? "Removed from wishlist" : "Saved to wishlist");
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/85 backdrop-blur-sm transition-colors hover:bg-background"
        >
          <Heart
            className={`h-4 w-4 ${wished ? "fill-primary text-primary" : "text-foreground"}`}
          />
        </button>
        {product.bestSeller && (
          <span className="absolute left-3 top-3 hairline bg-foreground px-2 py-1 text-background">
            Best Seller
          </span>
        )}
        {product.newArrival && !product.bestSeller && (
          <span className="absolute left-3 top-3 hairline bg-primary px-2 py-1 text-primary-foreground">
            New
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="hairline mb-1 text-muted-foreground">{product.category}</p>
          <h3 className="font-medium">{product.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{product.subtitle}</p>
        </div>
        <span className="font-mono text-sm">${product.price.toFixed(2)}</span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.round(product.rating)
                  ? "fill-primary text-primary"
                  : "text-foreground/15"
              }`}
            />
          ))}
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          {product.rating.toFixed(1)} ({product.reviews})
        </span>
      </div>
      <button
        onClick={() => {
          addToCart(product.id);
          toast.success(`${product.name} added to bag`);
        }}
        className="mt-4 w-full border border-foreground/15 py-3 hairline transition-colors hover:bg-foreground hover:text-background"
      >
        Add to Cart
      </button>
    </article>
  );
}
