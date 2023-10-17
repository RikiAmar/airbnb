import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";


interface IParams {
    listingId: string;
  }

export async function DELETE(req: Request, { params }: { params: IParams } ) {
  const currentUser = await getCurrentUser(); //בודקים שזה הדרך הרגילה שבה היוזר שלנו נכנס במידה וכן קיבלנו את היוזר
  if (!currentUser) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.error();
  }

  const listing = await prisma.listing.deleteMany({
    where: {
        id: listingId,
        userId: currentUser.id // רק אם זה אנחנו 
    }
  })

  return NextResponse.json(listing);//res
}
