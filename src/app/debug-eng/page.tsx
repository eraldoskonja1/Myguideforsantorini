export default function DebugEnvPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const adminPw = process.env.ADMIN_PASSWORD;

  return (
    <div style={{ padding: 40, fontFamily: "monospace", fontSize: 14 }}>
      <h1>Environment Variable Check</h1>
      <p>NEXT_PUBLIC_SUPABASE_URL: {url ? `✅ SET (${url.slice(0, 25)}...)` : "❌ MISSING"}</p>
      <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {key ? `✅ SET (${key.slice(0, 15)}...)` : "❌ MISSING"}</p>
      <p>ADMIN_PASSWORD: {adminPw ? "✅ SET (custom password)" : "⚠️ NOT SET (using default: admin1234)"}</p>
      <p style={{ marginTop: 20, color: "red" }}>
        ⚠️ Delete this page after debugging — it should not stay in production.
      </p>
    </div>
  );
}