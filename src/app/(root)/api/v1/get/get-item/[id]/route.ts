import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: Request, context: { params }) => {
  try {
    const { id: idParams } = await context.params;


    const id = parseInt(idParams);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });
    console.log("❌user❌", product);


    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }


    return NextResponse.json(product);
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
