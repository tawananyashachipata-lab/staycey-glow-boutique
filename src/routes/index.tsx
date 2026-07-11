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

      {/* Pricing */}
      <section id="pricing" className="border-t border-border bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <span className="eyebrow">Pricing</span>
            <h2 className="mt-2 font-display text-4xl italic md:text-5xl">
              Affordable Luxury, Honest Prices
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Simple, transparent pricing across every ritual — from everyday
              essentials to signature gift sets.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {[
              {
                name: "Perfumes",
                from: 35,
                blurb: "Signature 30–50ml eaux",
                items: ["Rollerball 10ml — $15", "Eau 30ml — $35", "Parfum 50ml — $60"],
              },
              {
                name: "Body Lotions",
                from: 18,
                blurb: "Silky daily hydration",
                items: ["Travel 100ml — $12", "Classic 250ml — $18", "Duo Pack — $32"],
              },
              {
                name: "Body Oils",
                from: 22,
                blurb: "Luminous glow oils",
                items: ["Mini 50ml — $14", "Standard 100ml — $22", "Ritual 200ml — $38"],
              },
              {
                name: "Body Scrubs",
                from: 20,
                blurb: "Polishing sugar scrubs",
                items: ["Jar 200g — $20", "Jar 400g — $34", "Bundle of 2 — $55"],
              },
              {
                name: "Gift Sets",
                from: 45,
                blurb: "Curated ritual boxes",
                items: ["Petite Set — $45", "Signature Box — $75", "Atelier Edit — $120"],
              },
            ].map((tier) => (
              <article
                key={tier.name}
                className="group flex flex-col rounded-2xl border border-foreground/10 bg-background p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
              >
                <p className="hairline text-muted-foreground">{tier.name}</p>
                <p className="mt-4 font-display text-3xl italic">
                  From <span className="not-italic font-bold">${tier.from}</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{tier.blurb}</p>
                <ul className="mt-6 flex-1 space-y-2 text-xs">
                  {tier.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/shop"
                  className="mt-6 rounded-full border border-foreground/15 py-2.5 text-center hairline transition-colors hover:bg-foreground hover:text-background"
                >
                  Shop {tier.name}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Social */}
      <section id="contact" className="bg-accent/25 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div>
            <span className="eyebrow">Say Hello</span>
            <h2 className="mt-2 font-display text-4xl italic md:text-5xl">
              Let's stay in touch.
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Follow Staycey Glow for new arrivals, special offers, and beauty
              tips — or reach us directly, we love a good chat.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <a
                href={social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-background transition-transform hover:scale-110 hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-background transition-transform hover:scale-110 hover:text-[#25D366]"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href={social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-background transition-transform hover:scale-110 hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="space-y-4 rounded-2xl bg-background p-8 shadow-sm"
          >
            <div>
              <label className="hairline text-muted-foreground" htmlFor="home-name">
                Name
              </label>
              <input
                id="home-name"
                required
                className="mt-2 w-full rounded-md border border-foreground/15 bg-transparent px-3 py-2 text-sm focus:border-foreground focus:outline-none"
              />
            </div>
            <div>
              <label className="hairline text-muted-foreground" htmlFor="home-email">
                Email
              </label>
              <input
                id="home-email"
                type="email"
                required
                className="mt-2 w-full rounded-md border border-foreground/15 bg-transparent px-3 py-2 text-sm focus:border-foreground focus:outline-none"
              />
            </div>
            <div>
              <label className="hairline text-muted-foreground" htmlFor="home-msg">
                Message
              </label>
              <textarea
                id="home-msg"
                rows={4}
                required
                className="mt-2 w-full rounded-md border border-foreground/15 bg-transparent px-3 py-2 text-sm focus:border-foreground focus:outline-none"
              />
            </div>
            <button className="w-full rounded-full bg-foreground py-3 hairline text-background transition-colors hover:bg-primary">
              Send Message
            </button>
          </form>
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
