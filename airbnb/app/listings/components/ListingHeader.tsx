"use client";

import Heading from "@/app/components/shared/Heading";
import HeartButton from "@/app/components/shared/HeartButton";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Image from "next/image";

interface IListingHeaderProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHeader: React.FC<IListingHeaderProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getOneByVal } = useCountries();
  const location = getOneByVal(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region} , ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton  listingId = {id} currentUser = {currentUser}/>
        </div>
      </div>
    </>
  );
};

export default ListingHeader;
