/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Notice } from "./noticeTypes";

type NoticeContextValue = {
  notice: Notice | null;
  push: (next: Omit<Notice, "id">) => void;
  dismiss: () => void;
};

const NoticeContext = createContext<NoticeContextValue | null>(null);

export function NoticeProvider({ children }: { children: React.ReactNode }) {
  const [notice, setNotice] = useState<Notice | null>(null);

  const dismiss = useCallback(() => setNotice(null), []);

  const push = useCallback((next: Omit<Notice, "id">) => {
    setNotice({ id: crypto.randomUUID(), ...next });
  }, []);

  useEffect(() => {
    if (!notice) return;
    if (notice.tone === "danger") return;
    const t = window.setTimeout(() => setNotice(null), 4500);
    return () => window.clearTimeout(t);
  }, [notice]);

  const value = useMemo(() => ({ notice, push, dismiss }), [dismiss, notice, push]);
  return <NoticeContext.Provider value={value}>{children}</NoticeContext.Provider>;
}

export function useNotice() {
  const ctx = useContext(NoticeContext);
  if (!ctx) throw new Error("useNotice must be used within NoticeProvider");
  return ctx;
}

export function NoticeCenter() {
  const { notice, dismiss } = useNotice();
  if (!notice) return null;

  const toneClass =
    notice.tone === "success"
      ? "ui-notice ui-notice--success"
      : notice.tone === "warning"
        ? "ui-notice ui-notice--warning"
        : notice.tone === "danger"
          ? "ui-notice ui-notice--danger"
          : "ui-notice ui-notice--info";

  return (
    <div className="ui-notice-wrap" aria-live={notice.tone === "danger" ? "assertive" : "polite"}>
      <div className={toneClass} role={notice.tone === "danger" ? "alert" : "status"}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 900 }}>{notice.title}</div>
          {notice.message ? <div style={{ marginTop: "var(--space-1)", color: "var(--color-text-muted)" }}>{notice.message}</div> : null}
        </div>
        <button type="button" className="ui-btn ui-btn--ghost ui-icon-btn" aria-label="Dismiss notice" onClick={dismiss}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
}
