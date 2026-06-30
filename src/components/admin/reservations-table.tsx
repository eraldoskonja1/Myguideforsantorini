"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Trash2, Search } from "lucide-react";
import { deleteReservation, updateReservationStatus } from "@/lib/admin/reservations";
import type { Reservation, ReservationStatus } from "@/types/database";

const statusOptions: ReservationStatus[] = ["pending", "confirmed", "completed", "cancelled"];

export default function ReservationsTable({ reservations }: { reservations: Reservation[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      const matchesQuery =
        query.trim() === "" ||
        r.full_name.toLowerCase().includes(query.toLowerCase()) ||
        r.email.toLowerCase().includes(query.toLowerCase()) ||
        r.service.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || r.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [reservations, query, statusFilter]);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete reservation for ${name}? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await deleteReservation(id);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleStatusChange(id: string, status: ReservationStatus) {
    await updateReservationStatus(id, status);
  }

  return (
    <div className="rounded-2xl border border-santorini-500/10 bg-white overflow-hidden">
      {/* Filters */}
      <div className="flex flex-col gap-3 border-b border-santorini-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-[280px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, service..."
            className="w-full rounded-full border border-santorini-500/15 bg-off-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-santorini-500"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["all", ...statusOptions].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors ${
                statusFilter === s
                  ? "bg-santorini-500 text-white"
                  : "bg-off-white text-ink-soft hover:bg-santorini-50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-santorini-500/10 bg-off-white/60">
              <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-ink-muted">Guest</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-ink-muted">Service</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-ink-muted">Date / Time</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-ink-muted">Guests</th>
              <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide text-ink-muted">Status</th>
              <th className="px-4 py-3 text-right text-[11px] font-bold uppercase tracking-wide text-ink-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-ink-muted">
                  No reservations found.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-b border-santorini-500/05 hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-3.5">
                    <Link href={`/admin/reservations/${r.id}`} className="font-semibold text-ink hover:text-santorini-500">
                      {r.full_name}
                    </Link>
                    <div className="text-xs text-ink-muted">{r.email}</div>
                  </td>
                  <td className="px-4 py-3.5 text-ink-soft">{r.service}</td>
                  <td className="px-4 py-3.5 text-ink-soft">
                    {new Date(r.booking_date + "T12:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    {r.booking_time && <span className="ml-1.5 text-ink-muted">{r.booking_time.slice(0, 5)}</span>}
                  </td>
                  <td className="px-4 py-3.5 text-ink-soft">{r.num_guests}</td>
                  <td className="px-4 py-3.5">
                    <select
                      defaultValue={r.status}
                      onChange={(e) => handleStatusChange(r.id, e.target.value as ReservationStatus)}
                      className="cursor-pointer rounded-full border-0 bg-transparent text-xs font-bold"
                    >
                      {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/reservations/${r.id}`} className="text-xs font-semibold text-santorini-500 hover:underline">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(r.id, r.full_name)}
                        disabled={deletingId === r.id}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                        aria-label="Delete reservation"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
