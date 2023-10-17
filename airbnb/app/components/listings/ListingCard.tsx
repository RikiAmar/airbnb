"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Button from "../shared/Button";
import HeartButton from "../shared/HeartButton";

interface IListingCardProps {
  data: SafeListing;
  reservation? : SafeReservation;
  disabled?: boolean;
  actionLabel? : string;
  actionId? : string;
  currentUser? : SafeUser | null;
  onAction? : (id : string) => void;
}

const ListingCard: React.FC<IListingCardProps> = ({data , reservation, disabled, actionLabel, actionId = "", currentUser, onAction }) => {
  const router = useRouter();
  const { getOneByVal } = useCountries();
  const location = getOneByVal(data.locationValue);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
        return;
    }

    //could be undefined
    onAction?.(actionId);
    
},[actionId, disabled, onAction]);//?

const price = useMemo(() => {
    if (reservation) {
        return reservation.totalPrice;
    }

    return data.price;
},[data.price, reservation]);

const reservationDate = useMemo(() => {
    if (!reservation) {
        return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    //INSTALL PACKAGE FIRST npm i date-fns
    return `${format(start,'PP')} - ${format(end,'PP')}`;
},[reservation])

    return <div className="col-span-1 cursor-pointer group" onClick={() => router.push(`/listings/${data.id}`)}>
    <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <Image fill alt="Listing" src={data.imageSrc} className="object-cover h-full w-full group-hover:scale-110 transition"/>
            <div className="absolute top-3 right-3">
                <HeartButton listingId={data.id} currentUser={currentUser}/>
            </div>
        </div>
        <div className="font-semibold text-lg">
            {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
            {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">
                $ {price}
            </div>
            {!reservation && (
                <div className="font-light">For a night</div>
            )} 
        </div>
        {onAction && actionLabel && (
            <Button disabled={disabled} small label={actionLabel} onClick={handleCancel}/>
        )}
    </div>
</div>
};

export default ListingCard;
