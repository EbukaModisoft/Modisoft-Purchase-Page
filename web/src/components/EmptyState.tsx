type Props = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="ui-table-empty" role="status" aria-live="polite">
      <div style={{ fontWeight: 800, color: "var(--color-text)" }}>{title}</div>
      {description ? <div style={{ marginTop: "var(--space-2)" }}>{description}</div> : null}
      {action ? <div style={{ marginTop: "var(--space-4)" }}>{action}</div> : null}
    </div>
  );
}
