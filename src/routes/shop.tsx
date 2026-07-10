import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { categories, products, type Category } from "@/lib/products";

const searchSchema = z.object({
  category: fallback(z.string(), "").default(""),
  q: fallback(z.string(), "").default(""),
  sort: fallback(z.string(), "featured").default("featured"),
});

export const Route = createFileRoute("/shop")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Shop All — Staycey Glow" },
      {
        name: "description",
        content:
          "Browse the full Staycey Glow collection — perfumes, body care, skincare, and gift sets.",
      },
      { property: "og:title", content: "Shop All — Staycey Glow" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { category, q, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [search, setSearch] = useState(q);

  const activeCategory = categories.includes(category as Category)
    ? (category as Category)
    : null;

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) ||
          p.subtitle.toLowerCase().includes(needle),
      );
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, q, sort]);

  return (
    <>
      <PageHeader eyebrow="The Collection" title="Shop All">
        Every ritual, every ingredient, considered. Explore the full Staycey Glow
        catalogue.
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-8 flex flex-col gap-4 border-y border-border py-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/shop"
              search={{ category: "", q, sort }}
              className={`hairline border px-4 py-2 transition-colors ${
                !activeCategory
                  ? "border-foreground bg-foreground text-background"
                  : "border-foreground/15 hover:bg-accent/40"
              }`}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c}
                to="/shop"
                search={{ category: c, q, sort }}
                className={`hairline border px-4 py-2 transition-colors ${
                  activeCategory === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/15 hover:bg-accent/40"
                }`}
              >
                {c}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ search: (prev: typeof searchSchema._type) => ({ ...prev, q: search }) });
              }}
              className="flex items-center border-b border-foreground/20"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                aria-label="Search products"
                className="w-40 bg-transparent px-2 py-1 text-xs focus:outline-none"
              />
            </form>
            <select
              aria-label="Sort"
              value={sort}
              onChange={(e) =>
                navigate({ search: (prev: typeof searchSchema._type) => ({ ...prev, sort: e.target.value }) })
              }
              className="hairline border border-foreground/15 bg-background px-3 py-2"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-24 text-center text-sm text-muted-foreground">
            No products match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
