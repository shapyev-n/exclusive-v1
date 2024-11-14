// Создайте API-роут, например, /api/auth/signInOAuth.ts
import { NextResponse } from "next/server";
import { createClient } from "../../../../../../../utils/supabase/server";

export async function POST() {
  const supabase = createClient();
  const { data, error } = await (await supabase).auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: process.env.NEXTAUTH_URL },
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ url: data.url });
}
