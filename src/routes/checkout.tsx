import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { useStore } from "@/lib/store-context";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — Staycey Glow" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cartProducts, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const shipping = cartTotal > 75 || cartTotal === 0 ? 0 : 8;
  const total = cartTotal + shipping;

  return (
    <>
      <PageHeader eyebrow="Checkout" title="Secure Checkout" />
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="grid gap-16 md:grid-cols-[1fr_400px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setProcessing(true);
              setTimeout(() => {
                toast.success("Order placed. Confirmation sent to your inbox.");
                clearCart();
                navigate({ to: "/" });
              }, 900);
            }}
            className="space-y-10"
          >
            <fieldset className="space-y-6">
              <legend className="eyebrow mb-4">Contact</legend>
              <Field name="email" label="Email" type="email" />
            </fieldset>
            <fieldset className="space-y-6">
              <legend className="eyebrow mb-4">Shipping</legend>
              <div className="grid gap-6 md:grid-cols-2">
                <Field name="firstName" label="First name" />
                <Field name="lastName" label="Last name" />
              </div>
              <Field name="address" label="Address" />
              <div className="grid gap-6 md:grid-cols-3">
                <Field name="city" label="City" />
                <Field name="postal" label="Postal code" />
                <Field name="country" label="Country" />
              </div>
            </fieldset>
            <fieldset className="space-y-6">
              <legend className="eyebrow mb-4">Payment</legend>
              <Field name="card" label="Card number" placeholder="•••• •••• •••• ••••" />
              <div className="grid gap-6 md:grid-cols-2">
                <Field name="exp" label="Expiry" placeholder="MM / YY" />
                <Field name="cvc" label="CVC" placeholder="•••" />
              </div>
            </fieldset>
            <button
              type="submit"
              disabled={processing || cartProducts.length === 0}
              className="flex w-full items-center justify-center gap-2 bg-foreground py-5 hairline text-background transition-colors hover:bg-primary disabled:opacity-60"
            >
              <Lock className="h-3.5 w-3.5" />
              {processing ? "Processing…" : `Pay $${total.toFixed(2)}`}
            </button>
            <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              256-bit SSL • PCI-compliant • Never stored
            </p>
          </form>

          <aside className="h-fit space-y-6 border border-border bg-white p-8">
            <h2 className="font-display text-2xl italic">Order</h2>
            <ul className="divide-y divide-border">
              {cartProducts.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 py-4">
                  <div className="h-16 w-14 overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Qty {quantity}
                    </p>
                  </div>
                  <span className="font-mono text-sm">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t border-border pt-4 text-sm">
              <Row label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
            </div>
            <div className="flex justify-between border-t border-border pt-4 text-lg">
              <span className="font-display italic">Total</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="hairline text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="mt-2 w-full border-b border-foreground/20 bg-transparent py-2 text-sm focus:border-foreground focus:outline-none"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}
