import { IconCheckCircle, IconExclamationTriangle } from "./icons";

export type StatusKind = "verified" | "unverified" | "pending";

const statusConfig: Record<StatusKind, { label: string; variant: "success" | "warning" | "info"; Icon: typeof IconCheckCircle }>= {
  verified: { label: "Verified", variant: "success", Icon: IconCheckCircle },
  unverified: { label: "Unverified", variant: "warning", Icon: IconExclamationTriangle },
  pending: { label: "Pending", variant: "info", Icon: IconExclamationTriangle },
};

export function StatusBadge({ status }: { status: StatusKind }) {
  const cfg = statusConfig[status];
  const Icon = cfg.Icon;

  return (
    <span className={`ui-badge ui-badge--${cfg.variant}`}>
      <Icon width={16} height={16} />
      {cfg.label}
    </span>
  );
}
