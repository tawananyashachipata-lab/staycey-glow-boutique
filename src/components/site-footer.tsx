import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-foreground pt-20 pb-10 text-background/80">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 grid grid-cols-2 gap-12 md:grid-cols-4">
          <div className="col-span-2">
            <h3 className="mb-6 font-display text-3xl italic text-background">
              Staycey Glow
            </h3>
            <p className="max-w-xs text-xs leading-relaxed">
              Elevated beauty essentials for the modern silhouette. Designed to
              illuminate from within.
            </p>
            <form
              className="mt-8 flex max-w-xs border-b border-background/20 pb-2"
              onSubmit={(e) => {
                e.preventDefault();
                (e.currentTarget.reset as () => void)();
              }}
            >
              <input
                type="email"
                required
                placeholder="Email"
                aria-label="Email address"
                className="w-full bg-transparent px-1 text-xs text-background focus:outline-none placeholder:text-background/40"
              />
              <button className="hairline text-background">Subscribe</button>
            </form>
          </div>
          <div>
            <h4 className="mb-6 hairline text-background">Shop</h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link to="/shop" className="transition-colors hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="transition-colors hover:text-primary">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/best-sellers" className="transition-colors hover:text-primary">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/categories" className="transition-colors hover:text-primary">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 hairline text-background">House</h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link to="/about" className="transition-colors hover:text-primary">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="transition-colors hover:text-primary">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition-colors hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-10 md:flex-row">
          <span className="font-mono text-[9px] uppercase tracking-widest">
            © {new Date().getFullYear()} Staycey Glow Rituals
          </span>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-primary"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <span className="font-mono text-[9px] uppercase tracking-widest">
              Free ship over $75
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
