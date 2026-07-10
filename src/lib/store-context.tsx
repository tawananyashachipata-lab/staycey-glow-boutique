import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./products";

export interface CartItem {
  id: string;
  quantity: number;
}

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (id: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  cartProducts: Array<{ product: Product; quantity: number }>;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const isBrowser = typeof window !== "undefined";

function readStorage<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(readStorage<CartItem[]>("sg_cart", []));
    setWishlist(readStorage<string[]>("sg_wishlist", []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("sg_cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem("sg_wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value = useMemo<StoreContextValue>(() => {
    const cartProducts = cart
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        return product ? { product, quantity: item.quantity } : null;
      })
      .filter((v): v is { product: Product; quantity: number } => v !== null);

    return {
      cart,
      wishlist,
      addToCart: (id, quantity = 1) =>
        setCart((prev) => {
          const existing = prev.find((i) => i.id === id);
          if (existing) {
            return prev.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + quantity } : i,
            );
          }
          return [...prev, { id, quantity }];
        }),
      removeFromCart: (id) => setCart((prev) => prev.filter((i) => i.id !== id)),
      setQuantity: (id, quantity) =>
        setCart((prev) =>
          quantity <= 0
            ? prev.filter((i) => i.id !== id)
            : prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
        ),
      toggleWishlist: (id) =>
        setWishlist((prev) =>
          prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
        ),
      isInWishlist: (id) => wishlist.includes(id),
      clearCart: () => setCart([]),
      cartCount: cart.reduce((sum, i) => sum + i.quantity, 0),
      cartTotal: cartProducts.reduce(
        (sum, { product, quantity }) => sum + product.price * quantity,
        0,
      ),
      cartProducts,
    };
  }, [cart, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
