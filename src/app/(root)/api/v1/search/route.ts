import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Ошибка поиска:", error);
    return NextResponse.json(
      { error: "Ошибка при поиске продуктов" },
      { status: 500 }
    );
  }
};
