"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ReservationInsert, ReservationUpdate, ReservationStatus } from "@/types/database";

// ── Fetch all reservations ─────────────────────────────────────────
export async function getReservations() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("booking_date", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

// ── Fetch single reservation ───────────────────────────────────────
export async function getReservation(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// ── Create reservation ─────────────────────────────────────────────
export async function createReservation(
  _prevState: { error?: string },
  formData: FormData
) {
  const payload: ReservationInsert = {
    full_name: String(formData.get("full_name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || null,
    service: String(formData.get("service") ?? "") as ReservationInsert["service"],
    booking_date: String(formData.get("booking_date") ?? ""),
    booking_time: String(formData.get("booking_time") ?? "").trim() || null,
    num_guests: Number(formData.get("num_guests") ?? 1),
    pickup_location: String(formData.get("pickup_location") ?? "").trim() || null,
    dropoff_location: String(formData.get("dropoff_location") ?? "").trim() || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
    source: String(formData.get("source") ?? "manual") as ReservationInsert["source"],
    status: "pending",
  };

  if (!payload.full_name || !payload.email || !payload.service || !payload.booking_date) {
    return { error: "Please fill in all required fields." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("reservations").insert(payload);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
  redirect("/admin");
}

// ── Update reservation ─────────────────────────────────────────────
export async function updateReservation(
  id: string,
  _prevState: { error?: string },
  formData: FormData
) {
  const payload: ReservationUpdate = {
    full_name: String(formData.get("full_name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim() || null,
    service: String(formData.get("service") ?? "") as ReservationInsert["service"],
    booking_date: String(formData.get("booking_date") ?? ""),
    booking_time: String(formData.get("booking_time") ?? "").trim() || null,
    num_guests: Number(formData.get("num_guests") ?? 1),
    pickup_location: String(formData.get("pickup_location") ?? "").trim() || null,
    dropoff_location: String(formData.get("dropoff_location") ?? "").trim() || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
    source: String(formData.get("source") ?? "manual") as ReservationInsert["source"],
    status: String(formData.get("status") ?? "pending") as ReservationStatus,
  };

  const supabase = await createClient();
  const { error } = await supabase.from("reservations").update(payload).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath(`/admin/reservations/${id}`);
  redirect("/admin");
}

// ── Delete reservation ─────────────────────────────────────────────
export async function deleteReservation(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("reservations").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/reservations");
}

// ── Quick status update ────────────────────────────────────────────
export async function updateReservationStatus(id: string, status: ReservationStatus) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("reservations")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
}
