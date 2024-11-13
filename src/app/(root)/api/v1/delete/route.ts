import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (id: number) => {
  try {
    const data = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
};
