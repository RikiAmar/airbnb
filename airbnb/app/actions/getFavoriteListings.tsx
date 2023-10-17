import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])], // דואגת שיחזיר לי כמה אובייקטים לפי כמה תז של הנבחרים
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorites;
    
  } catch (error: any) {
    throw new Error(error);
  }
};
