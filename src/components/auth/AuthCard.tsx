import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthCard({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/20 bg-[#0f0f17] p-10 shadow-2xl">

      <div className="space-y-2 mb-8">

        <h1 className="text-5xl font-bold text-white">
          {title}
        </h1>

        <p className="text-muted-foreground">
          {subtitle}
        </p>

      </div>

      {children}

    </div>
  );
}