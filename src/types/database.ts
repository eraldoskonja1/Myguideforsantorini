/**
 * Database types for the MyGuide for Santorini Supabase project.
 *
 * Mirrors the `contact_submissions` table. Run the SQL in
 * supabase/schema.sql against your project to create it.
 */
export type ServiceType =
  | "Airport Transfer"
  | "Private Taxi"
  | "Island Tour"
  | "Cruise Port Transfer"
  | "Wedding Transportation"
  | "Personal Tour Guide"
  | "Other";

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

export type ContactSubmissionInsert = Omit<
  ContactSubmission,
  "id" | "created_at" | "status"
>;

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: ContactSubmission;
        Insert: ContactSubmissionInsert;
        Update: Partial<ContactSubmissionInsert>;
      };
    };
  };
}
