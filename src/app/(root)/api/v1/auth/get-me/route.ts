import { revalidatePath } from "next/cache";
import { createClient } from "../../../../../../../utils/supabase/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    revalidatePath("/");

    if (!user) {
      return NextResponse.json(null);
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Ошибка получения пользователя:", error);
    return NextResponse.json(
      { error: "Ошибка получения пользователя" },
      { status: 500 }
    );
  }
};
