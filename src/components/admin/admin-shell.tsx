"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, ListChecks, PlusCircle, LogOut, ExternalLink } from "lucide-react";
import { adminLogout } from "@/lib/admin/auth";
import Logo from "@/components/ui/logo";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin#calendar", label: "Calendar", icon: CalendarDays, exact: false },
  { href: "/admin/reservations", label: "All Reservations", icon: ListChecks, exact: true },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-off-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-santorini-500/10 bg-white px-5 sm:px-8">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/admin/reservations/new"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-santorini-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-santorini-700"
          >
            <PlusCircle size={14} /> New Reservation
          </Link>
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-santorini-500"
          >
            View site <ExternalLink size={13} />
          </Link>
          <form action={adminLogout}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-full border border-santorini-500/15 px-3.5 py-2 text-xs font-semibold text-ink-soft hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
            >
              <LogOut size={14} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </form>
        </div>
      </header>

      {/* Mobile nav tabs */}
      <nav className="sm:hidden flex border-b border-santorini-500/10 bg-white px-2 overflow-x-auto">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href.split("#")[0]);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex shrink-0 items-center gap-1.5 px-4 py-3 text-xs font-semibold border-b-2 ${
                active ? "border-santorini-500 text-santorini-500" : "border-transparent text-ink-muted"
              }`}
            >
              <Icon size={14} /> {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mx-auto flex max-w-[1280px]">
        {/* Sidebar (desktop) */}
        <aside className="hidden sm:flex w-[220px] shrink-0 flex-col gap-1 border-r border-santorini-500/10 px-4 py-6">
          {navItems.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href.split("#")[0]);
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-santorini-500 text-white" : "text-ink-soft hover:bg-white hover:text-santorini-500"
                }`}
              >
                <Icon size={17} /> {item.label}
              </Link>
            );
          })}
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-5 py-7 sm:px-8 sm:py-9">{children}</main>
      </div>
    </div>
  );
}
