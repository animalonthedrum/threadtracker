
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Home from "./TrackerClient";

// Allow this page to load live Supabase data on each request.
export const instant = false;

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("2026PremierTracker")
    .select("*")
    .order("primary", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
  }

  return (
    <Home
      initialCards={(data ?? []) as any}
      initialError={error?.message ?? null}
    />
  );
}
