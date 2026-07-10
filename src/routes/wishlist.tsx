import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { useStore } from "@/lib/store-context";
import { products } from "@/lib/products";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Staycey Glow" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <PageHeader eyebrow="Saved" title="Your Wishlist." />
      <section className="mx-auto max-w-7xl px-6 pb-32">
        {items.length === 0 ? (
          <div className="border-t border-border py-24 text-center">
            <p className="font-display text-2xl italic">Nothing saved yet.</p>
            <Link
              to="/shop"
              className="mt-8 inline-flex bg-foreground px-10 py-4 hairline text-background hover:bg-primary"
            >
              Discover products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
