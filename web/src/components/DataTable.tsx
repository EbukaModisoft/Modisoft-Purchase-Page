import type { ReactNode } from "react";

export type ColumnDef<T> = {
  key: string;
  header: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  stickyRight?: boolean;
  render: (row: T) => ReactNode;
};

type Props<T> = {
  ariaLabel: string;
  columns: ColumnDef<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  empty: ReactNode;
};

export function DataTable<T>({ ariaLabel, columns, rows, rowKey, empty }: Props<T>) {
  return (
    <div className="ui-table-shell" role="region" aria-label={ariaLabel}>
      <table className="ui-table" aria-label={ariaLabel}>
        <colgroup>
          {columns.map((c) => (
            <col key={c.key} style={c.width ? { width: c.width } : undefined} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={c.stickyRight ? "ui-sticky-right" : undefined}
                style={{ textAlign: c.align ?? "left" }}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: 0 }}>
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <tr key={rowKey(r)}>
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={c.stickyRight ? "ui-sticky-right" : undefined}
                    style={{ textAlign: c.align ?? "left" }}
                  >
                    {c.render(r)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
