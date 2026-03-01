import { cn } from "@/lib/utils";

type Status = "online" | "offline" | "pending" | "approved" | "rejected" | "processing";

const statusConfig: Record<Status, { label: string; className: string }> = {
  online: { label: "Online", className: "status-online" },
  offline: { label: "Offline", className: "status-offline" },
  pending: { label: "Pending", className: "status-pending" },
  approved: { label: "Approved", className: "status-online" },
  rejected: { label: "Rejected", className: "status-offline" },
  processing: { label: "Processing", className: "bg-primary/10 text-primary border border-primary/20" },
};

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold",
        config.className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-glow" />
      {config.label}
    </span>
  );
}
