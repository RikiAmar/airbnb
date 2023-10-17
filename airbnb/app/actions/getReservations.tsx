import prisma from "../libs/prismadb";

//להשיג את כל ההזמנות של דירה מסויימת

interface IParams {
  listingId?: string;//כדי לעדכן בלוח שנה מה הוזמן
  userId?: string; //current user כדי לעדכן את הטיולים האישיים
  authorId?: string; //בעל הדירה// כדי לבדוק את ההזמנות שעשו אצלי
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      query.listing = { userId: authorId };
    }
    const reservationsAndListing = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservationsAndListing.map((res) => ({
      ...res,
      createdAt: res.createdAt.toISOString(),
      startDate: res.startDate.toISOString(),
      endDate: res.endDate.toISOString(),
      listing: {
        ...res.listing,
        createdAt: res.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (err: any) {
    throw new Error(err);
  }
}
