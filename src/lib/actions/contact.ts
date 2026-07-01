"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
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

    // 1. Save enquiry
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

    // 2. Create reservation in admin panel
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
      notes: message,
      source: "contact_form",
      status: "pending",
    });

    if (reservationError) {
      console.error("Supabase reservation insert error:", reservationError.message);
    }

    // 3. Send email notification to owner
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "MyGuide Santorini <onboarding@resend.dev>",
        to: "myguideforsantorini@gmail.com",
        subject: `🆕 New Reservation – ${fullName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
            <div style="background: #0077CC; border-radius: 10px; padding: 20px 24px; margin-bottom: 24px;">
              <h1 style="color: white; margin: 0; font-size: 20px;">🏝️ New Reservation – MyGuide for Santorini</h1>
            </div>

            <div style="background: white; border-radius: 10px; padding: 24px; margin-bottom: 16px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 14px; width: 140px;">👤 Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; font-size: 14px;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 14px;">📧 Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px;"><a href="mailto:${email}" style="color: #0077CC;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 14px;">📱 WhatsApp</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px;">
                    ${phone
                      ? `<a href="https://wa.me/${phone.replace(/\D/g, "")}" style="color: #25D366; font-weight: bold;">${phone}</a>`
                      : "<span style='color: #999;'>Not provided</span>"
                    }
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 14px;">🚗 Service</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px;">${service || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">💬 Message</td>
                  <td style="padding: 10px 0; font-size: 14px;">${message}</td>
                </tr>
              </table>
            </div>

            ${phone ? `
            <div style="text-align: center; margin-top: 8px;">
              <a href="https://wa.me/${phone.replace(/\D/g, "")}"
                style="display: inline-block; background: #25D366; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 15px;">
                💬 Reply on WhatsApp
              </a>
            </div>` : ""}

            <p style="text-align: center; color: #999; font-size: 12px; margin-top: 24px;">
              View all reservations → <a href="https://myguideforsantorini.vercel.app/admin/reservations" style="color: #0077CC;">Admin Panel</a>
            </p>
          </div>
        `,
      });
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