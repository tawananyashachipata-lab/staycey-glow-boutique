import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { social, whatsappLink } from "@/lib/social";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Staycey Glow" },
      {
        name: "description",
        content:
          "Get in touch with the Staycey Glow atelier — customer care, press, and wholesale.",
      },
      { property: "og:title", content: "Contact — Staycey Glow" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);

  return (
    <>
      <PageHeader eyebrow="Say Hello" title="We'd love to hear from you.">
        Questions about a ritual, an order, or a partnership — the atelier is
        listening.
      </PageHeader>
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="grid gap-16 md:grid-cols-2">
          <div className="space-y-8">
            <div>
              <p className="eyebrow">Care</p>
              <a
                href="mailto:hello@stayceyglow.com"
                className="mt-2 block font-display text-2xl italic"
              >
                hello@stayceyglow.com
              </a>
            </div>
            <div>
              <p className="eyebrow">Press</p>
              <a
                href="mailto:press@stayceyglow.com"
                className="mt-2 block font-display text-2xl italic"
              >
                press@stayceyglow.com
              </a>
            </div>
            <div>
              <p className="eyebrow">Atelier</p>
              <p className="mt-2 font-display text-2xl italic">
                12 Rue de la Paix
                <br />
                75002 Paris, France
              </p>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSending(true);
              setTimeout(() => {
                toast.success("Message received — we'll reply within 24h.");
                (e.target as HTMLFormElement).reset();
                setSending(false);
              }, 600);
            }}
            className="space-y-6"
          >
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "subject", label: "Subject", type: "text" },
            ].map((f) => (
              <div key={f.name}>
                <label className="hairline text-muted-foreground" htmlFor={f.name}>
                  {f.label}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  required
                  className="mt-2 w-full border-b border-foreground/20 bg-transparent py-2 text-sm focus:border-foreground focus:outline-none"
                />
              </div>
            ))}
            <div>
              <label className="hairline text-muted-foreground" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-2 w-full border-b border-foreground/20 bg-transparent py-2 text-sm focus:border-foreground focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="bg-foreground px-10 py-4 hairline text-background transition-colors hover:bg-primary disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
