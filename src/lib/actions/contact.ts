"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ServiceType } from "@/types/database";

export interface ContactFormState {
  success: boolean;
  error?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const fullName = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!fullName || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (!isValidEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    const supabase = await createClient();

    // 1. Save the enquiry as before
    const { error: enquiryError } = await supabase.from("contact_submissions").insert({
      full_name: fullName,
      email,
      phone: phone || null,
      service: (service || null) as ServiceType | null,
      message,
    });

    if (enquiryError) {
      console.error("Supabase enquiry insert error:", enquiryError.message);
      return {
        success: false,
        error: "Something went wrong sending your enquiry. Please try WhatsApp instead.",
      };
    }

    // 2. Also create a reservation so it appears in the admin panel immediately.
    //    We use today's date as a placeholder — admin can update the booking date later.
    const todayDate = new Date().toISOString().split("T")[0];
    const { error: reservationError } = await supabase.from("reservations").insert({
      full_name: fullName,
      email,
      phone: phone || null,
      service: (service || "Other") as ServiceType,
      booking_date: todayDate,
      booking_time: null,
      num_guests: 1,
      pickup_location: null,
      dropoff_location: null,
      notes: message, // Store their message in the notes field
      source: "contact_form",
      status: "pending",
    });

    if (reservationError) {
      // Non-fatal: the enquiry was saved, just log the reservation failure
      console.error("Supabase reservation insert error:", reservationError.message);
    }

    revalidatePath("/admin");
    revalidatePath("/admin/reservations");

    return { success: true };
  } catch (err) {
    console.error("Contact form unexpected error:", err);
    return {
      success: false,
      error: "Something went wrong. Please try again or contact us on WhatsApp.",
    };
  }
}