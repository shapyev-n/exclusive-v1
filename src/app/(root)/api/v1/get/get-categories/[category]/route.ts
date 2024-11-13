import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  request: Request,
  { params }: { params: { category: string } }
) => {
  try {
    const category = params.category;

    const products = await prisma.product.findMany({
      where: {
        category: category, 
      },
    });

    if (products.length === 0) {
      return NextResponse.json(
        { error: "No products found for this category" },
        { status: 404 }
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};
