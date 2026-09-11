import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-polar text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold sm:text-4xl">{title}</h1>
        {description && <p className="mt-4 max-w-3xl text-sm opacity-85 sm:text-base">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
