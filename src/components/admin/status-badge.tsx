import type { ReservationStatus } from "@/types/database";

const config: Record<ReservationStatus, { label: string; className: string }> = {
  pending:   { label: "Pending",   className: "bg-amber-50 text-amber-700 border-amber-200" },
  confirmed: { label: "Confirmed", className: "bg-blue-50 text-blue-700 border-blue-200" },
  completed: { label: "Completed", className: "bg-green-50 text-green-700 border-green-200" },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-600 border-red-200" },
};

export default function StatusBadge({ status }: { status: ReservationStatus }) {
  const { label, className } = config[status] ?? config.pending;
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${className}`}>
      {label}
    </span>
  );
}
