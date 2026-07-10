import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Staycey Glow" },
      {
        name: "description",
        content:
          "Staycey Glow is a modern beauty house founded on the belief that confidence begins with ritual.",
      },
      { property: "og:title", content: "Our Story — Staycey Glow" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const pillars = [
  {
    title: "Clean Formulas",
    body: "Dermatologist-tested, cruelty-free, and free from parabens, sulfates, and phthalates.",
  },
  {
    title: "Slow Craft",
    body: "Small-batch fragrances aged and blended by our in-house perfumer in Grasse, France.",
  },
  {
    title: "Considered Design",
    body: "Refillable glass architecture and recyclable cartons that live beautifully on your vanity.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="Our House" title="A ritual worth returning to.">
        Staycey Glow was founded on a simple belief — that confidence is a
        practice, and beauty is its most tender language.
      </PageHeader>
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <p className="font-display text-2xl italic leading-snug text-balance">
          We build fragrances and formulas the way old ateliers do — slowly, with
          intention, and always in service of how you feel when nobody is looking.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="border-t border-foreground pt-6">
              <span className="eyebrow">Our Pillars</span>
              <h3 className="mt-4 font-display text-2xl italic">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
