import Link from "next/link";
import { PlusCircle, Clock, CheckCircle2, XCircle, CalendarCheck } from "lucide-react";
import { getReservations } from "@/lib/admin/reservations";
import { getNewEnquiries } from "@/lib/admin/enquiries";
import AdminCalendar from "@/components/admin/calendar";
import EnquiriesList from "@/components/admin/enquiries-list";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [reservations, enquiries] = await Promise.all([
    getReservations(),
    getNewEnquiries(),
  ]);

  const todayStr = new Date().toISOString().split("T")[0];
  const stats = {
    total: reservations.length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    today: reservations.filter((r) => r.booking_date === todayStr).length,
  };

  const upcoming = reservations
    .filter((r) => r.booking_date >= todayStr && r.status !== "cancelled")
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-7">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Dashboard</h1>
          <p className="text-sm text-ink-muted">Overview of all your Santorini bookings.</p>
        </div>
        <Link
          href="/admin/reservations/new"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-santorini-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-santorini-700"
        >
          <PlusCircle size={16} /> New Reservation
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={CalendarCheck} label="Total Reservations" value={stats.total} color="text-santorini-500 bg-santorini-50" />
        <StatCard icon={Clock} label="Pending" value={stats.pending} color="text-amber-600 bg-amber-50" />
        <StatCard icon={CheckCircle2} label="Confirmed" value={stats.confirmed} color="text-blue-600 bg-blue-50" />
        <StatCard icon={XCircle} label="Today" value={stats.today} color="text-green-600 bg-green-50" />
      </div>

      {/* New enquiries */}
      <EnquiriesList enquiries={enquiries} />

      {/* Calendar */}
      <div id="calendar">
        <h2 className="mb-3 font-serif text-lg font-bold text-ink">Booking Calendar</h2>
        <AdminCalendar reservations={reservations} />
      </div>

      {/* Upcoming list */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-ink">Upcoming Reservations</h2>
          <Link href="/admin/reservations" className="text-sm font-semibold text-santorini-500 hover:underline">
            View all →
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-santorini-500/20 bg-white px-6 py-10 text-center text-sm text-ink-muted">
            No upcoming reservations yet.
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {upcoming.map((r) => (
              <Link
                key={r.id}
                href={`/admin/reservations/${r.id}`}
                className="flex flex-col gap-1 rounded-xl border border-santorini-500/10 bg-white px-5 py-4 transition-colors hover:border-santorini-500/30 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="font-semibold text-ink">{r.full_name}</span>
                  <span className="ml-2 text-sm text-ink-muted">{r.service}</span>
                </div>
                <div className="text-sm text-ink-muted">
                  {new Date(r.booking_date + "T12:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                  {r.booking_time && ` · ${r.booking_time.slice(0, 5)}`}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-santorini-500/10 bg-white p-5">
      <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
        <Icon size={18} />
      </div>
      <div className="font-serif text-2xl font-bold text-ink">{value}</div>
      <div className="text-xs font-medium text-ink-muted">{label}</div>
    </div>
  );
}
