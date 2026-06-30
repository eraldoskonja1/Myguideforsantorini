"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function getNewEnquiries() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("status", "new")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function markEnquiryContacted(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ status: "contacted" })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}
