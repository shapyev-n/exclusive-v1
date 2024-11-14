import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (request: NextRequest) => {
  const body = await request.json();
  try {
    await prisma.product.delete({
      where: {
        id: body.id,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(error);
  }
};
