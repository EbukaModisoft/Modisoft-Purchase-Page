import { useId, useRef } from "react";
import type { KeyboardEvent } from "react";

export type TabItem = {
  id: string;
  label: string;
};

type Props = {
  label: string;
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
};

export function Tabs({ label, items, activeId, onChange }: Props) {
  const groupId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);

  function focusTab(id: string) {
    const root = rootRef.current;
    if (!root) return;
    const el = root.querySelector<HTMLButtonElement>(`[role="tab"][data-tab-id="${CSS.escape(id)}"]`);
    el?.focus();
  }

  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>, currentId: string) {
    const currentIndex = items.findIndex((t) => t.id === currentId);
    if (currentIndex < 0) return;

    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") nextIndex = Math.min(items.length - 1, currentIndex + 1);
    if (e.key === "ArrowLeft") nextIndex = Math.max(0, currentIndex - 1);
    if (e.key === "Home") nextIndex = 0;
    if (e.key === "End") nextIndex = items.length - 1;

    if (nextIndex === null) return;
    e.preventDefault();

    const nextId = items[nextIndex]?.id;
    if (!nextId) return;
    onChange(nextId);
    requestAnimationFrame(() => focusTab(nextId));
  }

  return (
    <div ref={rootRef} data-tabs-group={groupId}>
      <div className="visually-hidden" id={`${label}-label`}>
        {label}
      </div>
      <div className="ui-tabs" role="tablist" aria-labelledby={`${label}-label`}>
        {items.map((t) => (
          <button
            key={t.id}
            type="button"
            className="ui-tab"
            role="tab"
            data-tab-id={t.id}
            aria-selected={t.id === activeId}
            tabIndex={t.id === activeId ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={(e) => onTabKeyDown(e, t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
