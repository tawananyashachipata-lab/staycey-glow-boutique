import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { categories, categoryImages, products } from "@/lib/products";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Staycey Glow" },
      {
        name: "description",
        content:
          "Discover Staycey Glow categories: Perfumes, Body Care, Skincare, and Gift Sets.",
      },
      { property: "og:title", content: "Categories — Staycey Glow" },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <>
      <PageHeader eyebrow="Rituals" title="Categories">
        Four distinct houses within Staycey Glow — curated so every routine has a
        signature.
      </PageHeader>
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid gap-16 md:grid-cols-2">
          {categories.map((c, i) => {
            const count = products.filter((p) => p.category === c).length;
            return (
              <Link
                key={c}
                to="/shop"
                search={{ category: c }}
                className={`group block ${i % 2 === 1 ? "md:mt-16" : ""}`}
              >
                <div className="aspect-[4/5] overflow-hidden bg-accent/20">
                  <img
                    src={categoryImages[c]}
                    alt={c}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <h2 className="font-display text-3xl italic">{c}</h2>
                  <span className="hairline text-muted-foreground">
                    {count} products →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
