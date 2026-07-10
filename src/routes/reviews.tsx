import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Staycey Glow" },
      {
        name: "description",
        content: "Real reviews from the Staycey Glow community.",
      },
      { property: "og:title", content: "Reviews — Staycey Glow" },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

const reviews = [
  {
    author: "Amara O.",
    product: "Midnight Bloom Eau",
    rating: 5,
    body: "Warm, powdery, deeply feminine. It has become my signature scent — I get compliments every single day.",
  },
  {
    author: "Priya S.",
    product: "Liquid Gold Serum",
    rating: 5,
    body: "Two weeks in and my skin looks lit-from-within. The texture melts like silk. Worth every penny.",
  },
  {
    author: "Danielle R.",
    product: "The Atelier Gift Edit",
    rating: 5,
    body: "The packaging alone is worth it. Everything felt considered, elevated, and personal.",
  },
  {
    author: "Nina L.",
    product: "Satin Body Oil",
    rating: 4,
    body: "Absorbs quickly without any greasy residue. The jasmine is subtle and lingers into the evening.",
  },
  {
    author: "Rita M.",
    product: "Peony Face Cream",
    rating: 5,
    body: "My winter skin savior. Restored my glow after months of dullness.",
  },
  {
    author: "Elena V.",
    product: "Rose Shimmer Lotion",
    rating: 5,
    body: "That golden-hour glow, bottled. I wear it on my legs and shoulders all summer.",
  },
];

function ReviewsPage() {
  return (
    <>
      <PageHeader eyebrow="Community" title="What our people say.">
        Real words from Staycey Glow devotees around the world.
      </PageHeader>
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="flex flex-col justify-between border border-border bg-background p-8"
            >
              <div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-4 w-4 ${
                        j < r.rating
                          ? "fill-primary text-primary"
                          : "text-foreground/15"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="mt-6 font-display text-xl italic leading-snug text-balance">
                  "{r.body}"
                </blockquote>
              </div>
              <figcaption className="mt-8">
                <p className="hairline">{r.author}</p>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                  {r.product}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
