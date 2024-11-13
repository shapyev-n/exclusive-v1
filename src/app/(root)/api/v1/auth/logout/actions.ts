"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../../../../../../utils/supabase/server";

export const logout = async () => {
  try {
    (await createClient()).auth.signOut();

    revalidatePath("/");

    redirect("/");
  } catch (error) {
    console.error("Ошибка при выходе:", error);
    return { error: "Ошибка при выходе" };
  }
};
