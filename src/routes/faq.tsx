import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Staycey Glow" },
      {
        name: "description",
        content:
          "Answers to common questions about Staycey Glow orders, shipping, ingredients, and returns.",
      },
      { property: "og:title", content: "FAQ — Staycey Glow" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
});

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Domestic orders arrive in 3–5 business days. Complimentary shipping on orders over $75.",
  },
  {
    q: "Are your products cruelty-free?",
    a: "Yes — every Staycey Glow formula is cruelty-free and never tested on animals.",
  },
  {
    q: "Can I return an opened product?",
    a: "We accept returns on unopened items within 30 days. Contact care@stayceyglow.com to begin a return.",
  },
  {
    q: "Do you ship internationally?",
    a: "We ship to over 40 countries. Duties are calculated at checkout.",
  },
  {
    q: "Are your fragrances long-lasting?",
    a: "Our eau de parfums are formulated at 18–22% concentration for 6–8 hours of wear.",
  },
  {
    q: "Do you offer gift wrapping?",
    a: "Complimentary signature wrapping is available on every order — select at checkout.",
  },
];

function FAQPage() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageHeader eyebrow="Help" title="Frequently Asked.">
        Everything you might wonder about ordering, ingredients, and rituals.
      </PageHeader>
      <section className="mx-auto max-w-3xl px-6 pb-32">
        <ul className="divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <li key={i}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between py-6 text-left"
              >
                <span className="font-display text-lg italic">{f.q}</span>
                {open === i ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </button>
              {open === i && (
                <p className="pb-6 text-sm text-muted-foreground">{f.a}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
