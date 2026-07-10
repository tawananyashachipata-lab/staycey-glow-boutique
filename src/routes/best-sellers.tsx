import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({
    meta: [
      { title: "Best Sellers — Staycey Glow" },
      {
        name: "description",
        content:
          "Explore the Staycey Glow best sellers — the pieces our community reaches for again and again.",
      },
      { property: "og:title", content: "Best Sellers — Staycey Glow" },
      { property: "og:url", content: "/best-sellers" },
    ],
    links: [{ rel: "canonical", href: "/best-sellers" }],
  }),
  component: BestSellersPage,
});

function BestSellersPage() {
  const list = products.filter((p) => p.bestSeller);
  return (
    <>
      <PageHeader eyebrow="Essentials" title="The Best Sellers">
        The Staycey Glow icons — loved, restocked, and worth every reorder.
      </PageHeader>
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
