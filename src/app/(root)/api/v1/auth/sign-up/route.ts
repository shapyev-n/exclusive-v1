import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createClient } from "../../../../../../../utils/supabase/server";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body = await request.json();
  const supabase = createClient();

  try {
    // Регистрация пользователя в Supabase
    const { data: signUpData, error: signUpError } = await (
      await supabase
    ).auth.signUp({
      email: body.email,
      password: body.password,
    });

    if (signUpError) {
      console.error(
        "Ошибка при регистрации пользователя в Supabase:",
        signUpError
      );
      return NextResponse.json(
        { error: signUpError.message },
        { status: signUpError.status || 400 }
      );
    }

    const userData = signUpData?.user;

    if (!userData) {
      return NextResponse.json(
        { error: "Не удалось получить данные пользователя из Supabase" },
        { status: 500 }
      );
    }

    // Создание пользователя в базе данных Prisma
    const newUser = await prisma.user.create({
      data: {
        image: body.image || null,
        email: body.email,
        name: body.name,
      },
    });

    return NextResponse.json({
      user: newUser,
      supabaseUser: userData,
    });
  } catch (error) {
    console.error("Ошибка создания пользователя:", error);
    return NextResponse.json(
      { error: "Ошибка при создании пользователя" },
      { status: 500 }
    );
  }
};
