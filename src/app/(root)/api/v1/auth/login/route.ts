import { NextResponse } from "next/server";
import { createClient } from "../../../../../../../utils/supabase/server";
import { revalidatePath } from "next/cache";


export const POST = async (request: Request) => {
  const body = await request.json();
  const supabase = createClient();

  try {
    const newData = {
      email: body.email,
      password: body.password,
    };

    const { data, error } = await (
      await supabase
    ).auth.signInWithPassword(newData);




    if (error) {
      console.error("error", error);
    }
    revalidatePath("/");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Ошибка создания пользователя:", error);
    return NextResponse.json(
      { error: "Ошибка при создании пользователя" },
      { status: 500 }
    );
  }
};
