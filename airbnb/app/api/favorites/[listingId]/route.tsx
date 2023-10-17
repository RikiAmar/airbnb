import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId: string;
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return NextResponse.error();
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds.push(listingId);
    
    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoriteIds: favoriteIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
   const currentUser = await getCurrentUser();
   if (!currentUser) {
     return NextResponse.error();
   }
 
   const { listingId } = params;
   if (!listingId || typeof listingId !== "string") {
     return NextResponse.error();
   }
 
   let favoriteIds = [...(currentUser.favoriteIds || [])];
 
   favoriteIds = favoriteIds.filter((id) => id !== listingId);//מחזיר מערך שלם ללא התז המסויימת
     
     const user = await prisma.user.update({
         where: {
             id: currentUser.id
         },
         data: {
             favoriteIds: favoriteIds
         }
     });
 
     return NextResponse.json(user);
 }