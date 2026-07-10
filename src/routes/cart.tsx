import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { useStore } from "@/lib/store-context";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Staycey Glow" },
      { name: "description", content: "Review the items in your Staycey Glow bag." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cartProducts, cartTotal, setQuantity, removeFromCart } = useStore();
  const shipping = cartTotal > 75 || cartTotal === 0 ? 0 : 8;
  const total = cartTotal + shipping;

  return (
    <>
      <PageHeader eyebrow="Bag" title="Your Bag." />
      <section className="mx-auto max-w-6xl px-6 pb-32">
        {cartProducts.length === 0 ? (
          <div className="border-t border-border py-24 text-center">
            <p className="font-display text-2xl italic">Your bag is empty.</p>
            <Link
              to="/shop"
              className="mt-8 inline-flex bg-foreground px-10 py-4 hairline text-background hover:bg-primary"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-16 border-t border-border pt-10 md:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-border">
              {cartProducts.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-6 py-8">
                  <div className="h-32 w-24 flex-shrink-0 overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="hairline text-muted-foreground">
                          {product.category}
                        </p>
                        <h3 className="mt-1 font-medium">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {product.subtitle}
                        </p>
                      </div>
                      <span className="font-mono text-sm">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border border-foreground/15">
                        <button
                          onClick={() => setQuantity(product.id, quantity - 1)}
                          className="p-2"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-mono text-xs">{quantity}</span>
                        <button
                          onClick={() => setQuantity(product.id, quantity + 1)}
                          className="p-2"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="flex items-center gap-1 hairline text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit space-y-6 border border-border bg-white p-8">
              <h2 className="font-display text-2xl italic">Order Summary</h2>
              <div className="space-y-3 border-y border-border py-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-mono">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-display italic">Total</span>
                <span className="font-mono">${total.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-foreground py-4 text-center hairline text-background hover:bg-primary"
              >
                Secure Checkout
              </Link>
              <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Free shipping on orders over $75
              </p>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
