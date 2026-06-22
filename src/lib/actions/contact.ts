"use server";

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

    const { error } = await supabase.from("contact_submissions").insert({
      full_name: fullName,
      email,
      phone: phone || null,
      service: (service || null) as ServiceType | null,
      message,
    });

    if (error) {
      console.error("Supabase insert error:", error.message);
      return {
        success: false,
        error: "Something went wrong sending your enquiry. Please try WhatsApp instead.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Contact form unexpected error:", err);
    return {
      success: false,
      error: "Something went wrong. Please try again or contact us on WhatsApp.",
    };
  }
}
