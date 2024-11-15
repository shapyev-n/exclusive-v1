"use server";

import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { createClient } from "../../../../../../../utils/supabase/server";

export async function signInWithOAuth(provider: Provider) {
  const supabase = createClient();

  const {
    data: { url },
    error,
  } = await(await supabase).auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });

  if (url) {
    redirect(url);
  }
  console.log("❤️‍🔥url❤️‍🔥", url);

  if (error) {
    redirect("/sign-in?message=No provider selected");
  }
}
