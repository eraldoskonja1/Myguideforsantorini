import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { getReservations } from "@/lib/admin/reservations";
import ReservationsTable from "@/components/admin/reservations-table";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ReservationsListPage() {
  const reservations = await getReservations();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">All Reservations</h1>
          <p className="text-sm text-ink-muted">{reservations.length} total bookings</p>
        </div>
        <Link
          href="/admin/reservations/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-santorini-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-santorini-700"
        >
          <PlusCircle size={16} /> New Reservation
        </Link>
      </div>

      <ReservationsTable reservations={reservations} />
    </div>
  );
}
