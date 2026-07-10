import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — Staycey Glow" },
      {
        name: "description",
        content: "The latest Staycey Glow launches — fresh formulas and limited editions.",
      },
      { property: "og:title", content: "New Arrivals — Staycey Glow" },
      { property: "og:url", content: "/new-arrivals" },
    ],
    links: [{ rel: "canonical", href: "/new-arrivals" }],
  }),
  component: NewArrivalsPage,
});

function NewArrivalsPage() {
  const list = products.filter((p) => p.newArrival);
  return (
    <>
      <PageHeader eyebrow="Just In" title="New Arrivals">
        This season's newest rituals — from limited perfume batches to the debut
        of our Rose Shimmer Lotion.
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
