import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ActionMenu } from "../components/ActionMenu";
import { DataTable, type ColumnDef } from "../components/DataTable";
import { EmptyState } from "../components/EmptyState";
import { FilterBar } from "../components/FilterBar";
import { PageHeader } from "../components/PageHeader";
import { Pagination } from "../components/Pagination";
import { StatusBadge, type StatusKind } from "../components/StatusBadge";
import { Tabs } from "../components/Tabs";
import { useNotice } from "../components/NoticeCenter";
import { useLocalStorageState } from "../lib/useLocalStorageState";

type PurchaseRow = {
  id: string;
  date: string;
  payeeName: string;
  invoiceNumber: string;
  type: string;
  cost: number;
  retail: number;
  status: StatusKind;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(amount);
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

const seedRows: PurchaseRow[] = Array.from({ length: 16 }).map((_, idx) => {
  const i = idx + 1;
  return {
    id: `row-${i}`,
    date: "2026-02-02",
    payeeName: "Yumi Ice Cream",
    invoiceNumber: `1236547${(80 + i).toString().padStart(2, "0")}`,
    type: "1",
    cost: 450,
    retail: 450,
    status: i % 5 === 0 ? "unverified" : "verified",
  };
});

export function PurchasesRetailPage() {
  const { push } = useNotice();
  const [searchParams, setSearchParams] = useSearchParams();
  const [rows, setRows] = useLocalStorageState<PurchaseRow[]>("purchases-rows", seedRows);

  const primaryTab = searchParams.get("tab") || "purchase-entries";
  const paymentTab = searchParams.get("pay") || "cash-daily";
  const search = searchParams.get("q") || "";
  const from = searchParams.get("from") || "2026-02-01";
  const to = searchParams.get("to") || "2026-02-06";
  const page = Number(searchParams.get("page") || "1");
  const pageSize = 10;

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return rows.filter((r) => {
      if (!query) return true;
      return (
        r.payeeName.toLowerCase().includes(query) ||
        r.invoiceNumber.toLowerCase().includes(query) ||
        r.status.toLowerCase().includes(query)
      );
    });
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const clampedPage = Math.min(Math.max(page, 1), totalPages);
  const paged = useMemo(() => {
    const start = (clampedPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [clampedPage, filtered]);

  const columns: ColumnDef<PurchaseRow>[] = useMemo(
    () => [
      {
        key: "date",
        header: "Date",
        width: 120,
        render: (r) => <span className="ui-truncate">{r.date}</span>,
      },
      {
        key: "payee",
        header: "Payee name",
        width: 200,
        render: (r) => <span className="ui-truncate" title={r.payeeName}>{r.payeeName}</span>,
      },
      {
        key: "invoice",
        header: "Invoice #",
        width: 140,
        render: (r) => <span className="ui-truncate">{r.invoiceNumber}</span>,
      },
      {
        key: "type",
        header: "Type",
        width: 80,
        render: (r) => <span className="ui-truncate">{r.type}</span>,
      },
      {
        key: "cost",
        header: "Cost",
        width: 120,
        align: "right",
        render: (r) => <span className="ui-truncate">{formatCurrency(r.cost)}</span>,
      },
      {
        key: "retail",
        header: "Retail",
        width: 120,
        align: "right",
        render: (r) => <span className="ui-truncate">{formatCurrency(r.retail)}</span>,
      },
      {
        key: "margin",
        header: "Margin",
        width: 120,
        align: "right",
        render: (r) => {
          const margin = r.retail === 0 ? 0 : (r.retail - r.cost) / r.retail;
          return <span className="ui-truncate">{formatPercent(margin)}</span>;
        },
      },
      {
        key: "purchase",
        header: "Purchase",
        width: 140,
        render: (r) => (
          <button
            type="button"
            className="ui-btn ui-btn--ghost"
            onClick={() => push({ tone: "info", title: "Details", message: `Open details for ${r.invoiceNumber}` })}
            aria-label={`View purchase details for invoice ${r.invoiceNumber}`}
          >
            View details
          </button>
        ),
      },
      {
        key: "status",
        header: "Status",
        width: 150,
        render: (r) => <StatusBadge status={r.status} />,
      },
      {
        key: "actions",
        header: "Actions",
        width: 90,
        stickyRight: true,
        align: "center",
        render: (r) => (
          <ActionMenu
            label={`Row actions for invoice ${r.invoiceNumber}`}
            items={[
              {
                id: "upload",
                label: "Upload receipt",
                onSelect: () => push({ tone: "success", title: "Upload", message: `Receipt queued for ${r.invoiceNumber}` }),
              },
              {
                id: "toggle-status",
                label: r.status === "verified" ? "Mark unverified" : "Mark verified",
                onSelect: () => {
                  setRows((prev) =>
                    prev.map((row) =>
                      row.id === r.id ? { ...row, status: row.status === "verified" ? "unverified" : "verified" } : row
                    )
                  );
                  push({ tone: "info", title: "Status updated", message: `${r.invoiceNumber} is now ${r.status === "verified" ? "Unverified" : "Verified"}` });
                },
              },
              {
                id: "edit",
                label: "Edit",
                onSelect: () => push({ tone: "info", title: "Edit", message: `Launch edit for ${r.invoiceNumber} (hook to modal/form).` }),
              },
              {
                id: "delete",
                label: "Delete",
                tone: "danger",
                onSelect: () => {
                  setRows((prev) => prev.filter((row) => row.id !== r.id));
                  push({ tone: "danger", title: "Deleted", message: `${r.invoiceNumber} removed` });
                },
              },
            ]}
          />
        ),
      },
    ],
    [push, setRows]
  );

  function updateParams(next: Record<string, string | number | undefined>) {
    const merged = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([k, v]) => {
      if (v === undefined || v === "" || v === null) merged.delete(k);
      else merged.set(k, String(v));
    });
    setSearchParams(merged, { replace: true });
  }

  function addRow() {
    const nextNumber = rows.length + 1000;
    const newRow: PurchaseRow = {
      id: `row-${crypto.randomUUID()}`,
      date: new Date().toISOString().slice(0, 10),
      payeeName: "New Vendor",
      invoiceNumber: `${nextNumber}`,
      type: "1",
      cost: 500,
      retail: 650,
      status: "pending",
    };
    setRows((prev) => [newRow, ...prev]);
    updateParams({ page: 1 });
    push({ tone: "success", title: "Purchase uploaded", message: `Invoice ${newRow.invoiceNumber} added.` });
  }

  return (
    <div className="ui-shell">
      <main className="ui-page" aria-label="Purchases">
        <div className="ui-sticky-stack">
          <PageHeader
            title="Purchases · Retail Purchases"
            subtitle="A consistent, token-based enterprise table with accessible actions and predictable hierarchy."
            actions={<button type="button" className="ui-btn ui-btn--primary" onClick={addRow}>Upload purchase</button>}
          />

          <div style={{ marginTop: "var(--space-4)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <Tabs
              label="Purchases sections"
              activeId={primaryTab}
              onChange={(id) => updateParams({ tab: id, page: 1 })}
              items={[
                { id: "purchase-entries", label: "Purchase entries" },
                { id: "un-retail", label: "Un Retail Purchases" },
                { id: "verify", label: "Verify Purchases" },
                { id: "edi", label: "EDI" },
                { id: "rebate", label: "Rebate" },
              ]}
            />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap" }}>
              <Tabs
                label="Payment tabs"
                activeId={paymentTab}
                onChange={(id) => updateParams({ pay: id, page: 1 })}
                items={[
                  { id: "cash-daily", label: "Cash - Daily" },
                  { id: "cash-deli", label: "Cash - Deli" },
                  { id: "check", label: "Check" },
                  { id: "credit", label: "Credit" },
                  { id: "all", label: "All" },
                ]}
              />

              <div style={{ color: "var(--color-text-muted)", fontSize: "var(--text-xs)" }}>
                Showing {filtered.length} purchases
              </div>
            </div>

            <FilterBar
              from={from}
              to={to}
              search={search}
              onChange={(next) => {
                updateParams({
                  from: next.from ?? from,
                  to: next.to ?? to,
                  q: next.search ?? search,
                  page: 1,
                });
              }}
              onViewFilters={() => push({ tone: "info", title: "Filters", message: "Open advanced filters (wire to drawer/modal)." })}
            />
          </div>
        </div>

        <div style={{ marginTop: "var(--space-4)" }} className="ui-card">
          <div style={{ padding: "var(--space-2)" }}>
            <DataTable
              ariaLabel="Retail purchases table"
              columns={columns}
              rows={paged}
              rowKey={(r) => r.id}
              empty={<EmptyState title="No purchases" description="Try adjusting filters or date range." />}
            />
          </div>

          <Pagination
            page={clampedPage}
            pageSize={pageSize}
            total={filtered.length}
            onPageChange={(p) => updateParams({ page: p })}
          />
        </div>
      </main>
    </div>
  );
}
