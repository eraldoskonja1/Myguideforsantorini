"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import { serviceOptions } from "@/lib/content";

const initialState: ContactFormState = { success: false };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  if (state.success) {
    return (
      <div className="flex flex-col items-center py-10 text-center">
        <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-green-100">
          <CheckCircle2 className="text-green-600" size={32} strokeWidth={2.5} />
        </div>
        <h3 className="mb-2 font-serif text-[22px] font-bold text-ink">
          Enquiry Sent!
        </h3>
        <p className="text-[15px] text-ink-muted">
          We&apos;ll be in touch within 2 hours. Check your inbox.
        </p>
      </div>
    );
  }

  // Build today's date string for min attribute (prevent past dates)
  const today = new Date().toISOString().split("T")[0];

  return (
    <form ref={formRef} action={formAction} noValidate>
      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="name" className="text-[13px] font-semibold text-ink-soft">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Smith"
            required
            className="rounded-[10px] border-[1.5px] border-santorini-500/15 bg-white px-[18px] py-3.5 text-sm text-ink outline-none transition-all focus:border-santorini-500 focus:shadow-[0_0_0_4px_rgba(0,119,204,0.1)]"
          />
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="email" className="text-[13px] font-semibold text-ink-soft">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            className="rounded-[10px] border-[1.5px] border-santorini-500/15 bg-white px-[18px] py-3.5 text-sm text-ink outline-none transition-all focus:border-santorini-500 focus:shadow-[0_0_0_4px_rgba(0,119,204,0.1)]"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="mb-5 flex flex-col gap-2">
        <label htmlFor="phone" className="text-[13px] font-semibold text-ink-soft">
          Phone / WhatsApp
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 555 000 0000"
          className="rounded-[10px] border-[1.5px] border-santorini-500/15 bg-white px-[18px] py-3.5 text-sm text-ink outline-none transition-all focus:border-santorini-500 focus:shadow-[0_0_0_4px_rgba(0,119,204,0.1)]"
        />
      </div>

      {/* Service */}
      <div className="mb-5 flex flex-col gap-2">
        <label htmlFor="service" className="text-[13px] font-semibold text-ink-soft">
          Service Required
        </label>
        <select
          id="service"
          name="service"
          defaultValue=""
          className="rounded-[10px] border-[1.5px] border-santorini-500/15 bg-white px-[18px] py-3.5 text-sm text-ink outline-none transition-all focus:border-santorini-500 focus:shadow-[0_0_0_4px_rgba(0,119,204,0.1)]"
        >
          <option value="">Select a service...</option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Date + Time side by side */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="booking_date" className="text-[13px] font-semibold text-ink-soft">
            Preferred Date *
          </label>
          <input
            id="booking_date"
            name="booking_date"
            type="date"
            min={today}
            required
            className="rounded-[10px] border-[1.5px] border-santorini-500/15 bg-white px-[18px] py-3.5 text-sm text-ink outline-none transition-all focus:border-santorini-500 focus:shadow-[0_0_0_4px_rgba(0,119,204,0.1)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="booking_time" className="text-[13px] font-semibold text-ink-soft">
            Preferred Time *
          </label>
          <input
            id="booking_time"
            name="booking_time"
            type="time"
            required
            className="rounded-[10px] border-[1.5px] border-santorini-500/15 bg-white px-[18px] py-3.5 text-sm text-ink outline-none transition-all focus:border-santorini-500 focus:shadow-[0_0_0_4px_rgba(0,119,204,0.1)]"
          />
        </div>
      </div>

      {/* Message */}
      <div className="mb-5 flex flex-col gap-2">
        <label htmlFor="message" className="text-[13px] font-semibold text-ink-soft">
          Your Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Tell us your group size and any special requests..."
          className="h-[120px] resize-y rounded-[10px] border-[1.5px] border-santorini-500/15 bg-white px-[18px] py-3.5 text-sm text-ink outline-none transition-all focus:border-santorini-500 focus:shadow-[0_0_0_4px_rgba(0,119,204,0.1)]"
        />
      </div>

      {state.error && (
        <div className="mb-5 flex items-start gap-2 rounded-xl bg-red-50 p-3.5 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-santorini-500 py-4 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(0,119,204,0.3)] transition-all hover:-translate-y-0.5 hover:bg-santorini-700 hover:shadow-[0_8px_28px_rgba(0,119,204,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Sending..." : "Send Enquiry →"}
      </button>
    </form>
  );
}