"use server";
import { createClient } from "../../../../../../../utils/supabase/server";
import { revalidatePath } from "next/cache";

export const logout = async () => {
  const supabase = createClient();
  try {
    const { error } = await (await supabase).auth.signOut();
    if (error) {
      console.error("Ошибка при выходе:", error);
      return { error: "Ошибка при выходе" };
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Ошибка при выходе:", error);
    return { error: "Ошибка при выходе" };
  }
};
