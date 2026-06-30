"use client";

import { useActionState } from "react";
import Link from "next/link";
import { serviceOptions } from "@/lib/content";
import type { Reservation } from "@/types/database";

interface Props {
  action: (prevState: { error?: string }, formData: FormData) => Promise<{ error?: string }>;
  defaultValues?: Partial<Reservation>;
  isEdit?: boolean;
}

const sourceOptions = [
  { value: "manual", label: "Manual entry" },
  { value: "contact_form", label: "Contact form" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Phone call" },
];

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const inputCls = "rounded-[10px] border-[1.5px] border-santorini-500/15 bg-white px-4 py-3 text-sm text-ink outline-none transition-all focus:border-santorini-500 focus:shadow-[0_0_0_4px_rgba(0,119,204,0.08)] w-full";
const labelCls = "text-[13px] font-semibold text-ink-soft mb-1 block";

export default function ReservationForm({ action, defaultValues = {}, isEdit = false }: Props) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-8">
      {/* Guest Info */}
      <section>
        <h2 className="mb-5 text-xs font-bold uppercase tracking-[2px] text-santorini-500">Guest Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Full Name *</label>
            <input name="full_name" required defaultValue={defaultValues.full_name ?? ""} placeholder="John Smith" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Email *</label>
            <input name="email" type="email" required defaultValue={defaultValues.email ?? ""} placeholder="john@example.com" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Phone / WhatsApp</label>
            <input name="phone" type="tel" defaultValue={defaultValues.phone ?? ""} placeholder="+30 000 000 0000" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Number of Guests *</label>
            <input name="num_guests" type="number" min={1} max={50} required defaultValue={defaultValues.num_guests ?? 1} className={inputCls} />
          </div>
        </div>
      </section>

      {/* Booking Details */}
      <section>
        <h2 className="mb-5 text-xs font-bold uppercase tracking-[2px] text-santorini-500">Booking Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Service *</label>
            <select name="service" required defaultValue={defaultValues.service ?? ""} className={inputCls}>
              <option value="">Select a service...</option>
              {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Date *</label>
            <input name="booking_date" type="date" required defaultValue={defaultValues.booking_date ?? ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Time</label>
            <input name="booking_time" type="time" defaultValue={defaultValues.booking_time ?? ""} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Source</label>
            <select name="source" defaultValue={defaultValues.source ?? "manual"} className={inputCls}>
              {sourceOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          {isEdit && (
            <div>
              <label className={labelCls}>Status</label>
              <select name="status" defaultValue={defaultValues.status ?? "pending"} className={inputCls}>
                {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          )}
        </div>
      </section>

      {/* Locations */}
      <section>
        <h2 className="mb-5 text-xs font-bold uppercase tracking-[2px] text-santorini-500">Locations</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Pickup Location</label>
            <input name="pickup_location" defaultValue={defaultValues.pickup_location ?? ""} placeholder="e.g. Santorini Airport" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Dropoff Location</label>
            <input name="dropoff_location" defaultValue={defaultValues.dropoff_location ?? ""} placeholder="e.g. Grace Hotel, Imerovigli" className={inputCls} />
          </div>
        </div>
      </section>

      {/* Notes */}
      <section>
        <h2 className="mb-5 text-xs font-bold uppercase tracking-[2px] text-santorini-500">Notes</h2>
        <textarea
          name="notes"
          defaultValue={defaultValues.notes ?? ""}
          placeholder="Flight number, special requests, extra luggage..."
          className={`${inputCls} h-28 resize-y`}
        />
      </section>

      {state?.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-santorini-500 px-8 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-santorini-700 disabled:opacity-60"
        >
          {isPending ? "Saving..." : isEdit ? "Save Changes" : "Create Reservation"}
        </button>
        <Link href="/admin" className="rounded-full border border-santorini-500/20 px-8 py-3 text-sm font-semibold text-ink-soft transition-colors hover:bg-off-white">
          Cancel
        </Link>
      </div>
    </form>
  );
}
