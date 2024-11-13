import { NextResponse } from "next/server";
import { createClient } from "../../../../../../utils/supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const body = await request.json();
  const supabase = createClient();

  try {
    const { data: userData, error: userError } = await (
      await supabase
    ).auth.getUser();

    if (userError || !userData) {
      return NextResponse.json(
        { error: userError?.message || "User not authenticated" },
        { status: 401 }
      );
    }

    const userId = userData.user?.id;

    const data = await prisma.product.createMany({
      data: {
        userId: userId,
        image: body.image,
        title: body.title,
        description: body.description,
        price: body.price,
        salePrice: body.salePrice || null,
        category: body.category,
        count: body.count,
        BestSellingProducts: '0',
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating product:", error);
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
