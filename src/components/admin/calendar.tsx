"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Reservation } from "@/types/database";

const STATUS_COLOR: Record<string, string> = {
  pending:   "bg-amber-400",
  confirmed: "bg-santorini-500",
  completed: "bg-green-500",
  cancelled: "bg-red-400",
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  // Make Monday = 0
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

export default function AdminCalendar({ reservations }: { reservations: Reservation[] }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Group reservations by date string "YYYY-MM-DD"
  const byDate: Record<string, Reservation[]> = {};
  for (const r of reservations) {
    if (!byDate[r.booking_date]) byDate[r.booking_date] = [];
    byDate[r.booking_date].push(r);
  }

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelected(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelected(null);
  };

  const todayStr = today.toISOString().split("T")[0];
  const selectedReservations = selected ? (byDate[selected] ?? []) : [];

  // Build grid cells: nulls for empty leading days, then 1..daysInMonth
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="rounded-2xl border border-santorini-500/10 bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-santorini-500/10 px-6 py-4">
        <h2 className="font-serif text-xl font-bold text-ink">
          {MONTHS[month]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="rounded-full p-2 hover:bg-off-white transition-colors">
            <ChevronLeft size={18} className="text-ink-soft" />
          </button>
          <button
            onClick={() => { setYear(today.getFullYear()); setMonth(today.getMonth()); setSelected(null); }}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-santorini-500 hover:bg-santorini-50 transition-colors"
          >
            Today
          </button>
          <button onClick={nextMonth} className="rounded-full p-2 hover:bg-off-white transition-colors">
            <ChevronRight size={18} className="text-ink-soft" />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 border-b border-santorini-500/10">
        {DAYS.map(d => (
          <div key={d} className="py-2 text-center text-[11px] font-bold uppercase tracking-wide text-ink-muted">
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className="min-h-[90px] border-b border-r border-santorini-500/05 bg-gray-50/50" />;

          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayReservations = byDate[dateStr] ?? [];
          const isToday = dateStr === todayStr;
          const isSelected = dateStr === selected;
          const isWeekend = (i % 7) >= 5;

          return (
            <button
              key={dateStr}
              onClick={() => setSelected(isSelected ? null : dateStr)}
              className={`min-h-[90px] border-b border-r border-santorini-500/05 p-2 text-left transition-colors
                ${isSelected ? "bg-santorini-50 ring-2 ring-inset ring-santorini-500" : "hover:bg-blue-50/40"}
                ${isWeekend ? "bg-gray-50/30" : ""}
              `}
            >
              <span className={`mb-1.5 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold
                ${isToday ? "bg-santorini-500 text-white" : "text-ink-soft"}`}
              >
                {day}
              </span>
              <div className="flex flex-col gap-1">
                {dayReservations.slice(0, 3).map(r => (
                  <div key={r.id} className="flex items-center gap-1 overflow-hidden">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${STATUS_COLOR[r.status]}`} />
                    <span className="truncate text-[10px] font-medium text-ink-soft">{r.full_name}</span>
                  </div>
                ))}
                {dayReservations.length > 3 && (
                  <span className="text-[10px] font-semibold text-santorini-500">+{dayReservations.length - 3} more</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected day panel */}
      {selected && (
        <div className="border-t border-santorini-500/10 bg-off-white px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-ink">
              {new Date(selected + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
              <span className="ml-2 text-sm font-normal text-ink-muted">
                {selectedReservations.length === 0 ? "No reservations" : `${selectedReservations.length} reservation${selectedReservations.length > 1 ? "s" : ""}`}
              </span>
            </h3>
            <Link
              href={`/admin/reservations/new?date=${selected}`}
              className="rounded-full bg-santorini-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-santorini-700 transition-colors"
            >
              + Add
            </Link>
          </div>

          {selectedReservations.length === 0 ? (
            <p className="text-sm text-ink-muted">No bookings for this day. Click + Add to create one.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {selectedReservations.map(r => (
                <Link
                  key={r.id}
                  href={`/admin/reservations/${r.id}`}
                  className="flex items-start gap-3 rounded-xl bg-white border border-santorini-500/10 px-4 py-3 hover:border-santorini-500/30 transition-colors"
                >
                  <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${STATUS_COLOR[r.status]}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-ink truncate">{r.full_name}</span>
                      {r.booking_time && (
                        <span className="shrink-0 text-[11px] font-medium text-ink-muted">{r.booking_time.slice(0, 5)}</span>
                      )}
                    </div>
                    <div className="text-xs text-ink-muted">{r.service} · {r.num_guests} guest{r.num_guests > 1 ? "s" : ""}</div>
                    {r.pickup_location && <div className="text-xs text-ink-muted truncate">↑ {r.pickup_location}</div>}
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase
                    ${r.status === "confirmed" ? "bg-blue-50 text-blue-700" :
                      r.status === "completed" ? "bg-green-50 text-green-700" :
                      r.status === "cancelled" ? "bg-red-50 text-red-600" :
                      "bg-amber-50 text-amber-700"}`}
                  >
                    {r.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-5 border-t border-santorini-500/10 px-6 py-3">
        {[
          { status: "pending", label: "Pending" },
          { status: "confirmed", label: "Confirmed" },
          { status: "completed", label: "Completed" },
          { status: "cancelled", label: "Cancelled" },
        ].map(({ status, label }) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${STATUS_COLOR[status]}`} />
            <span className="text-[11px] text-ink-muted">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
