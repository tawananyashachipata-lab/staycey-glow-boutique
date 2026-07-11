import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle, Check } from "lucide-react";
import heroImg from "@/assets/hero-perfume.jpg";
import { ProductCard } from "@/components/product-card";
import { categories, categoryImages, products } from "@/lib/products";
import { social, whatsappLink } from "@/lib/social";

export const Route = createFileRoute("/")({
  component: Home,
});

const testimonials = [
  {
    quote:
      "The Midnight Bloom parfum is intoxicating — layered, warm, and lingers exactly the way a signature scent should.",
    author: "Amara O.",
    role: "Verified Buyer",
  },
  {
    quote:
      "Liquid Gold Serum transformed my skin in two weeks. It feels like the ritual I never knew I needed.",
    author: "Priya S.",
    role: "Skincare Editor",
  },
  {
    quote:
      "The gift edit arrived wrapped like an heirloom. My sister actually cried opening it.",
    author: "Danielle R.",
    role: "Verified Buyer",
  },
];

function Home() {
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-32 md:pt-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex flex-col items-center">
            <span className="animate-fade eyebrow mb-5 opacity-70">
              The Summer Collection
            </span>
            <h1 className="animate-reveal mb-8 text-balance text-center font-display text-6xl leading-[0.9] md:text-8xl lg:text-9xl">
              Glow with <br />
              <em className="font-bold">Confidence.</em>
            </h1>
            <div className="animate-reveal relative w-full max-w-4xl [animation-delay:200ms]">
              <div className="aspect-[21/9] w-full overflow-hidden rounded-sm bg-accent/30">
                <img
                  src={heroImg}
                  alt="Signature Staycey Glow perfume on marble"
                  width={1600}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                <Link
                  to="/shop"
                  className="inline-flex bg-foreground px-12 py-5 hairline text-background shadow-xl transition-colors duration-500 hover:bg-primary"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="eyebrow mb-2 block">Explore</span>
              <h2 className="font-display text-4xl italic">By Category</h2>
            </div>
            <Link
              to="/categories"
              className="border-b border-foreground pb-1 hairline"
            >
              All Categories
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((c, i) => (
              <Link
                key={c}
                to="/shop"
                search={{ category: c }}
                className={`group space-y-4 ${i % 2 === 1 ? "md:pt-12" : ""}`}
              >
                <div className="aspect-[4/5] overflow-hidden bg-accent/20">
                  <img
                    src={categoryImages[c]}
                    alt={c}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="font-display text-lg italic">{c}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <span className="eyebrow">Essentials</span>
              <h2 className="font-display text-4xl italic">The Best Sellers</h2>
            </div>
            <Link
              to="/best-sellers"
              className="border-b border-foreground pb-1 hairline"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-accent/25 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="eyebrow">Loved By</span>
            <h2 className="mt-2 font-display text-4xl italic">
              The Inner Circle
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="flex flex-col justify-between bg-background p-8"
              >
                <blockquote className="font-display text-xl italic leading-snug text-balance">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-8">
                  <p className="hairline">{t.author}</p>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-6 font-display text-4xl italic">
            Join the Inner Circle
          </h2>
          <p className="mb-10 text-pretty text-sm text-muted-foreground">
            Exclusive previews, beauty rituals, and special events delivered to
            your inbox.
          </p>
          <form
            className="flex border-b border-foreground/20 pb-2"
            onSubmit={(e) => {
              e.preventDefault();
              e.currentTarget.reset();
            }}
          >
            <input
              type="email"
              required
              aria-label="Email address"
              placeholder="EMAIL ADDRESS"
              className="w-full bg-transparent px-2 text-sm placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest placeholder:text-foreground/30 focus:outline-none"
            />
            <button className="px-4 hairline font-bold">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
