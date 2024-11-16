"use server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "../../../../../../../utils/supabase/server";

export const POST = async () => {
  const supabase = createClient();

  try {
    await (await supabase).auth.signOut();
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка при выходе:", error);
    return NextResponse.json({ success: false, error: "Ошибка при выходе" });
  }
};
