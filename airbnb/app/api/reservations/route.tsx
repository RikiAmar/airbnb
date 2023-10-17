import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser(); //בודקים שזה הדרך הרגילה שבה היוזר שלנו נכנס במידה וכן קיבלנו את היוזר
  if (!currentUser) {
    return NextResponse.error(); // בזכות זה מופעל הטוסט
  }

  const body = await req.json();
  const { listingId, startDate, endDate, totalPrice } = body;
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId, // הדירה הספציפית
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,//אנחנו מי שהזמין את הדירה
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });
  return NextResponse.json(listingAndReservation);// זה יגיע ל
//   then 
//אם זה יעבור את הריטרן
}
