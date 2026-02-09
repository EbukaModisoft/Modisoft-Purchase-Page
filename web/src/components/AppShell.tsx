import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { NoticeCenter } from "./NoticeCenter";

type Props = {
  children: ReactNode;
};

function ShellLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "ui-btn ui-btn--ghost",
          isActive ? "ui-shell-nav-link--active" : "ui-shell-nav-link",
        ].join(" ")
      }
      aria-label={label}
      end
    >
      {label}
    </NavLink>
  );
}

export function AppShell({ children }: Props) {
  return (
    <div className="ui-shell" style={{ flexDirection: "row" }}>
      <aside
        className="ui-shell-nav"
        aria-label="Primary"
      >
        <div className="ui-shell-brand">Modisoft</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          <ShellLink to="/purchases/retail" label="Purchases" />
          <ShellLink to="/products/items" label="Products · Items" />
        </nav>
      </aside>

      <div style={{ flex: 1, minWidth: 0 }}>
        <header className="ui-shell-top" aria-label="Top bar">
          <div className="ui-shell-top-left">Convenience</div>
          <div className="ui-shell-top-right">
            <button type="button" className="ui-btn ui-btn--secondary">
              What’s new
            </button>
            <button type="button" className="ui-btn ui-btn--secondary">
              Clock In/Out
            </button>
            <div className="ui-shell-user" aria-label="Current user">
              Sunny
            </div>
          </div>
        </header>

        <NoticeCenter />

        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}
