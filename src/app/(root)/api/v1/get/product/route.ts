import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const data = await prisma.product.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
};
