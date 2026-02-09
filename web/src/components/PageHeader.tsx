import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function PageHeader({ title, subtitle, actions }: Props) {
  return (
    <header style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)" }}>
      <div>
        <h1 className="ui-h1">{title}</h1>
        {subtitle ? <p className="ui-subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div style={{ display: "flex", gap: "var(--space-2)" }}>{actions}</div> : null}
    </header>
  );
}
