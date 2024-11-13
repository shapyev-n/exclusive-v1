"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../../../../utils/supabase/server"; 

export async function signup(data: {
  email: string;
  password: string;
  image: string;
  name: string;
}) {
  const supabase = createClient();

  const { data: signUpData, error } = await (
    await supabase
  ).auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    console.error("Error signing up:", error);
  }

  const userId = signUpData.user?.id;
  if (userId) {
    const { error: profileError } = await (await supabase)
      .from("UserExclusive")
      .insert({
        userId: userId,
        image: data.image,
        email: data.email,
        name: data.name,
    password: data.password,
        
      });

    if (profileError) {
      console.error("Error creating profile:", profileError);
      return;
    }
  }
  revalidatePath("/"); // обновляем кэш для главной страницы
  redirect("/"); // перенаправление на главную страницу после успешной регистрации
}
