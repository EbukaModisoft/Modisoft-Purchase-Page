import { useEffect, useId, useMemo, useRef, useState } from "react";
import { IconDotsVertical } from "./icons";

export type ActionItem = {
  id: string;
  label: string;
  tone?: "default" | "danger";
  onSelect: () => void;
};

type Props = {
  label: string;
  items: ActionItem[];
};

export function ActionMenu({ label, items }: Props) {
  const buttonId = useId();
  const menuId = useMemo(() => `${buttonId}-menu`, [buttonId]);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onDocumentMouseDown(e: MouseEvent) {
      if (!open) return;
      const root = rootRef.current;
      if (!root) return;
      if (e.target instanceof Node && !root.contains(e.target)) setOpen(false);
    }

    function onDocumentKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocumentMouseDown);
    document.addEventListener("keydown", onDocumentKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocumentMouseDown);
      document.removeEventListener("keydown", onDocumentKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      // Defer to ensure it exists.
      setTimeout(() => firstItemRef.current?.focus(), 0);
    }
  }, [open]);

  return (
    <div ref={rootRef} style={{ position: "relative", display: "inline-flex" }}>
      <button
        id={buttonId}
        type="button"
        className="ui-btn ui-btn--ghost ui-icon-btn"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <IconDotsVertical width={18} height={18} />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-labelledby={buttonId}
          className="ui-menu"
          style={{ right: 0, top: "calc(100% + var(--space-2))" }}
        >
          {items.map((it, idx) => (
            <button
              key={it.id}
              type="button"
              role="menuitem"
              ref={idx === 0 ? firstItemRef : undefined}
              className={`ui-menu-item ${it.tone === "danger" ? "ui-menu-item--danger" : ""}`}
              onClick={() => {
                setOpen(false);
                it.onSelect();
              }}
            >
              <span>{it.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
