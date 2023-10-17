"use client";

import Avatar from "@/app/components/shared/Avatar";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";

//IMPORT DYNAMIC - לייזי לאודינג רק לאימפורט תטעין לי את המפה רק כאשר אני נכנס לתוך הדף
const Map = dynamic(() => import("../../components/shared/Map"), {
  ssr: false,
});

interface IListingInfoProps {
  user: SafeUser | null; //בעל הדירה
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: { label: string; icon: IconType; description: string } | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<IListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getOneByVal } = useCountries();
  const location = getOneByVal(locationValue)?.latlng;
  return (
<div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold flex flex-row items-center gap-2">
                <div>Hosted by {user?.name}</div>
                <Avatar src={user?.image}/>
            </div>
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                <div>{guestCount} Guests</div>
                <div>{roomCount} Rooms</div>
                <div>{bathroomCount} Bathrooms</div>
            </div>
        </div>
        <hr />
        {/* אם יש קטגוריה */}
        {category && (
            <ListingCategory icon={category.icon} label={category.label} description={category.description}/>
        )}
        <hr />
        <div className="text-lg font-light text-neutral-500">
            {description}
        </div>
        <hr />
        <Map center={location}/>
</div>
  );
};

export default ListingInfo;
