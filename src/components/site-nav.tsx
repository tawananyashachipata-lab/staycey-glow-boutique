import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store-context";
import { products } from "@/lib/products";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/best-sellers", label: "Best Sellers" },
  { to: "/new-arrivals", label: "New" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const { cartCount, wishlist } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const results = query
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 5)
    : [];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="hidden gap-7 md:flex">
              {links.slice(0, 4).map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="hairline text-foreground transition-colors hover:text-primary"
                  activeProps={{ className: "hairline text-primary" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/"
            className="font-display text-2xl font-bold italic tracking-tight"
          >
            Staycey Glow
          </Link>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              className="hairline hidden text-foreground transition-colors hover:text-primary md:inline-flex"
            >
              <Search className="h-4 w-4" />
            </button>
            <Link
              to="/wishlist"
              className="relative hairline text-foreground transition-colors hover:text-primary"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-mono text-[9px] text-primary-foreground">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative hairline text-foreground transition-colors hover:text-primary"
              aria-label="Cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-mono text-[9px] text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-background px-6 py-4">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center gap-3 border-b border-foreground/20 pb-2">
                <Search className="h-4 w-4 text-foreground/50" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search perfumes, skincare, body care…"
                  className="w-full bg-transparent text-sm focus:outline-none"
                />
                <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                  <X className="h-4 w-4" />
                </button>
              </div>
              {results.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        to="/shop"
                        search={{ q: p.name }}
                        className="flex items-center justify-between rounded-sm px-2 py-2 text-sm hover:bg-accent/40"
                      >
                        <span>{p.name}</span>
                        <span className="hairline text-muted-foreground">
                          {p.category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-background md:hidden">
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <span className="font-display text-xl italic">Menu</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-6 px-6 py-10">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-display text-3xl italic"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
