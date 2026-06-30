"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageSquareText } from "lucide-react";
import { markEnquiryContacted } from "@/lib/admin/enquiries";
import type { ContactSubmission } from "@/types/database";

export default function EnquiriesList({ enquiries }: { enquiries: ContactSubmission[] }) {
  const [processingId, setProcessingId] = useState<string | null>(null);

  if (enquiries.length === 0) return null;

  async function handleMarkContacted(id: string) {
    setProcessingId(id);
    try {
      await markEnquiryContacted(id);
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <MessageSquareText size={18} className="text-santorini-500" />
        <h2 className="font-serif text-lg font-bold text-ink">New Website Enquiries</h2>
        <span className="rounded-full bg-santorini-500 px-2 py-0.5 text-[11px] font-bold text-white">
          {enquiries.length}
        </span>
      </div>
      <div className="flex flex-col gap-2.5">
        {enquiries.map((e) => (
          <div
            key={e.id}
            className="flex flex-col gap-3 rounded-xl border border-santorini-500/10 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-ink">{e.full_name}</span>
                {e.service && (
                  <span className="rounded-full bg-santorini-50 px-2 py-0.5 text-[11px] font-semibold text-santorini-700">
                    {e.service}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-ink-muted">{e.email}{e.phone ? ` · ${e.phone}` : ""}</p>
              <p className="mt-1.5 line-clamp-2 text-sm text-ink-soft">{e.message}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2 self-start sm:self-center">
              <Link
                href={`/admin/reservations/new?name=${encodeURIComponent(e.full_name)}&email=${encodeURIComponent(e.email)}&phone=${encodeURIComponent(e.phone ?? "")}&service=${encodeURIComponent(e.service ?? "")}`}
                className="rounded-full bg-santorini-500 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-santorini-700 transition-colors"
              >
                Convert to Booking
              </Link>
              <button
                onClick={() => handleMarkContacted(e.id)}
                disabled={processingId === e.id}
                className="rounded-full border border-santorini-500/15 px-3.5 py-1.5 text-xs font-semibold text-ink-soft hover:bg-off-white transition-colors disabled:opacity-50"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
