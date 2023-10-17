import { Listing, Reservation, User } from "@prisma/client"

//Datetime is considered dangerous for some reason... so we modify it!
export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string | undefined;
    updatedAt: string;
    emailVerified: string | null;
}

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string | undefined;
}

export type SafeReservation = Omit<Reservation, "createdAt" | "startDate" | "endDate" | "listing"> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
}