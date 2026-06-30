/**
 * Database types for the MyGuide for Santorini Supabase project.
 */

export type ServiceType =
  | "Airport Transfer"
  | "Private Taxi"
  | "Island Tour"
  | "Cruise Port Transfer"
  | "Wedding Transportation"
  | "Personal Tour Guide"
  | "Other";

export type ReservationStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type ReservationSource = "manual" | "contact_form" | "whatsapp" | "phone";

// ── Contact submissions (public enquiry form) ──────────────────────
export interface ContactSubmission {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  service: ServiceType | null;
  message: string;
  status: "new" | "contacted" | "closed";
}

export type ContactSubmissionInsert = Omit<ContactSubmission, "id" | "created_at" | "status">;

// ── Reservations (admin-managed bookings) ─────────────────────────
export interface Reservation {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  service: ServiceType;
  booking_date: string;   // ISO date: "2025-07-15"
  booking_time: string | null; // "14:30"
  num_guests: number;
  pickup_location: string | null;
  dropoff_location: string | null;
  notes: string | null;
  source: ReservationSource;
  status: ReservationStatus;
}

export type ReservationInsert = Omit<Reservation, "id" | "created_at">;
export type ReservationUpdate = Partial<ReservationInsert>;
