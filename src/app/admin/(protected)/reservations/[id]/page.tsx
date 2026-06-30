import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getReservation, updateReservation } from "@/lib/admin/reservations";
import ReservationForm from "@/components/admin/reservation-form";
import StatusBadge from "@/components/admin/status-badge";

export default async function EditReservationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let reservation;
  try {
    reservation = await getReservation(id);
  } catch {
    notFound();
  }

  if (!reservation) notFound();

  const action = updateReservation.bind(null, id);

  return (
    <div className="mx-auto max-w-[760px]">
      <Link href="/admin" className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-santorini-500">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>

      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="mb-1 font-serif text-2xl font-bold text-ink sm:text-3xl">Edit Reservation</h1>
          <p className="text-sm text-ink-muted">
            Created {new Date(reservation.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            {" · "}Source: {reservation.source.replace("_", " ")}
          </p>
        </div>
        <StatusBadge status={reservation.status} />
      </div>

      <div className="rounded-2xl border border-santorini-500/10 bg-white p-6 sm:p-8">
        <ReservationForm action={action} defaultValues={reservation} isEdit />
      </div>
    </div>
  );
}
