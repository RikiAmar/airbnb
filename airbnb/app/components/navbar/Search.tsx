"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getOneByVal } = useCountries();
  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getOneByVal(locationValue as string)?.label;
    }
    return "Anywhere";
  }, [getOneByVal, locationValue]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} guests`;
    }
    return "Add Guests"
  }, [guestCount]);

  const dateLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);//הופכים מסטרינג לדייט
      const end = new Date(endDate as string);
      let diff = differenceInDays(end,start);//ההפרש בין הימים 

      if (diff === 0) {
          diff = 1
      }
      
      return `${diff} Days`;
  }
  return 'Any Week';
  }, [endDate, startDate])

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] text-center">
        {dateLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
