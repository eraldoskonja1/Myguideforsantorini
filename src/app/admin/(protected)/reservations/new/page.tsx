import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createReservation } from "@/lib/admin/reservations";
import ReservationForm from "@/components/admin/reservation-form";
import type { Reservation } from "@/types/database";

export default async function NewReservationPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; name?: string; email?: string; phone?: string; service?: string }>;
}) {
  const { date, name, email, phone, service } = await searchParams;

  const defaultValues: Partial<Reservation> = {
    booking_date: date,
    full_name: name,
    email,
    phone,
    service: (service as Reservation["service"]) || undefined,
  };

  return (
    <div className="mx-auto max-w-[760px]">
      <Link href="/admin" className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-santorini-500">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>

      <h1 className="mb-1 font-serif text-2xl font-bold text-ink sm:text-3xl">New Reservation</h1>
      <p className="mb-7 text-sm text-ink-muted">Manually add a booking to the calendar.</p>

      <div className="rounded-2xl border border-santorini-500/10 bg-white p-6 sm:p-8">
        <ReservationForm
          action={createReservation}
          defaultValues={defaultValues}
        />
      </div>
    </div>
  );
}
