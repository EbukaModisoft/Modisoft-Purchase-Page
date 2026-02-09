type Props = {
  from: string;
  to: string;
  search: string;
  onChange: (next: { from?: string; to?: string; search?: string }) => void;
  onViewFilters?: () => void;
};

export function FilterBar({ from, to, search, onChange, onViewFilters }: Props) {
  return (
    <div
      className="ui-card"
      style={{
        padding: "var(--space-4)",
        display: "flex",
        gap: "var(--space-4)",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
        <div className="ui-field">
          <label className="ui-label" htmlFor="purchase-search">
            Search
          </label>
          <input
            id="purchase-search"
            className="ui-input"
            value={search}
            placeholder="Search by payee, invoice, status"
            onChange={(e) => onChange({ search: e.target.value })}
          />
        </div>

        <div className="ui-field">
          <label className="ui-label" htmlFor="purchase-from">
            From
          </label>
          <input id="purchase-from" type="date" className="ui-input" value={from} onChange={(e) => onChange({ from: e.target.value })} />
        </div>

        <div className="ui-field">
          <label className="ui-label" htmlFor="purchase-to">
            To
          </label>
          <input id="purchase-to" type="date" className="ui-input" value={to} onChange={(e) => onChange({ to: e.target.value })} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "var(--space-2)" }}>
        <button type="button" className="ui-btn ui-btn--secondary" onClick={onViewFilters}>
          View filter
        </button>
      </div>
    </div>
  );
}
