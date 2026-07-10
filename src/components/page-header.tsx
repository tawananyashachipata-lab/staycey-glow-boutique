import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:pt-24 md:pb-16">
      {eyebrow && <span className="eyebrow mb-4 block">{eyebrow}</span>}
      <h1 className="max-w-3xl text-balance font-display text-5xl italic leading-[0.95] md:text-7xl">
        {title}
      </h1>
      {children && (
        <div className="mt-6 max-w-xl text-sm text-muted-foreground md:text-base">
          {children}
        </div>
      )}
    </header>
  );
}
