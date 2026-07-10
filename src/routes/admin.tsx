import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { categories, products, type Category } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Staycey Glow" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const mockOrders = [
  { id: "SG-10248", customer: "Amara O.", total: 210, status: "Fulfilled", date: "Jul 08" },
  { id: "SG-10247", customer: "Priya S.", total: 82, status: "Processing", date: "Jul 08" },
  { id: "SG-10246", customer: "Danielle R.", total: 145, status: "Shipped", date: "Jul 07" },
  { id: "SG-10245", customer: "Nina L.", total: 128, status: "Fulfilled", date: "Jul 06" },
  { id: "SG-10244", customer: "Rita M.", total: 68, status: "Refunded", date: "Jul 05" },
];

const mockCustomers = [
  { name: "Amara O.", email: "amara@example.com", orders: 6, spent: 1240 },
  { name: "Priya S.", email: "priya@example.com", orders: 4, spent: 620 },
  { name: "Danielle R.", email: "d.r@example.com", orders: 3, spent: 480 },
  { name: "Nina L.", email: "nina.l@example.com", orders: 2, spent: 214 },
];

type Tab = "overview" | "products" | "inventory" | "orders" | "customers";

function AdminPage() {
  const [tab, setTab] = useState<Tab>("overview");
  const [filter, setFilter] = useState<Category | "All">("All");

  const filtered = useMemo(
    () => (filter === "All" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  const stats = {
    revenue: mockOrders.reduce((s, o) => s + o.total, 0),
    orders: mockOrders.length,
    products: products.length,
    lowStock: products.filter((p) => p.inventory < 20).length,
  };

  return (
    <>
      <PageHeader eyebrow="Console" title="Atelier Admin">
        Manage products, inventory, orders, and customers. This preview uses
        mock data — connect a backend to persist changes.
      </PageHeader>
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <nav className="mb-10 flex flex-wrap gap-2 border-y border-border py-4">
          {(["overview", "products", "inventory", "orders", "customers"] as Tab[]).map(
            (t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`hairline border px-4 py-2 capitalize transition-colors ${
                  tab === t
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/15 hover:bg-accent/40"
                }`}
              >
                {t}
              </button>
            ),
          )}
        </nav>

        {tab === "overview" && (
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Revenue", value: `$${stats.revenue.toLocaleString()}` },
              { label: "Orders", value: stats.orders },
              { label: "Products", value: stats.products },
              { label: "Low stock", value: stats.lowStock },
            ].map((s) => (
              <div key={s.label} className="border border-border bg-white p-6">
                <p className="eyebrow">{s.label}</p>
                <p className="mt-4 font-display text-4xl italic">{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {(tab === "products" || tab === "inventory") && (
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {(["All", ...categories] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`hairline border px-3 py-1.5 transition-colors ${
                    filter === c
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/15 hover:bg-accent/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto border border-border bg-white">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-muted/60">
                  <tr className="text-left">
                    <Th>Product</Th>
                    <Th>Category</Th>
                    <Th className="text-right">Price</Th>
                    <Th className="text-right">Stock</Th>
                    <Th className="text-right">Status</Th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-b border-border last:border-0">
                      <Td>
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt=""
                            className="h-12 w-10 object-cover"
                          />
                          <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {p.subtitle}
                            </p>
                          </div>
                        </div>
                      </Td>
                      <Td>{p.category}</Td>
                      <Td className="text-right font-mono">
                        ${p.price.toFixed(2)}
                      </Td>
                      <Td className="text-right font-mono">{p.inventory}</Td>
                      <Td className="text-right">
                        <span
                          className={`hairline ${
                            p.inventory < 20 ? "text-destructive" : "text-primary"
                          }`}
                        >
                          {p.inventory < 20 ? "Low" : "In stock"}
                        </span>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="overflow-x-auto border border-border bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/60">
                <tr className="text-left">
                  <Th>Order</Th>
                  <Th>Customer</Th>
                  <Th>Date</Th>
                  <Th className="text-right">Total</Th>
                  <Th className="text-right">Status</Th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0">
                    <Td className="font-mono">{o.id}</Td>
                    <Td>{o.customer}</Td>
                    <Td className="text-muted-foreground">{o.date}</Td>
                    <Td className="text-right font-mono">
                      ${o.total.toFixed(2)}
                    </Td>
                    <Td className="text-right">
                      <span className="hairline">{o.status}</span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "customers" && (
          <div className="overflow-x-auto border border-border bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/60">
                <tr className="text-left">
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th className="text-right">Orders</Th>
                  <Th className="text-right">Lifetime</Th>
                </tr>
              </thead>
              <tbody>
                {mockCustomers.map((c) => (
                  <tr key={c.email} className="border-b border-border last:border-0">
                    <Td>{c.name}</Td>
                    <Td className="text-muted-foreground">{c.email}</Td>
                    <Td className="text-right font-mono">{c.orders}</Td>
                    <Td className="text-right font-mono">
                      ${c.spent.toFixed(2)}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-4 py-3 hairline text-muted-foreground ${className}`}>
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-4 align-middle ${className}`}>{children}</td>;
}
