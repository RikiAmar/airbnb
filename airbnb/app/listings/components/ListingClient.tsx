"use client";

import Container from "@/app/components/shared/Container";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import ListingHeader from "./ListingHeader";
import ListingInfo from "./ListingInfo";
import { useCallback, useEffect, useMemo, useState } from "react";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Range } from "react-date-range";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { useRouter } from "next/navigation";

const initialDateRange = {
  // תחילה וסוף של תאריכי ההזמנות, הקי קשור לספריה עצמה
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface IListingClientProps {
  listing: SafeListing & {
    user: SafeUser; // בעל הדירה
  };
  currentUser: SafeUser | null; // המזמין
  reservations: SafeReservation[]; // מערך ההזמנות שיש לאותה הדירה
}

const ListingClient: React.FC<IListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const [isLoading, setIsLoading] = useState(false); //כדי לא לאפשר ללחוץ בדברים אחרים בזמן שזה טוען
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange); // מה התווך שאני רוצה להזמין
  const loginModal = useLoginModal(); //אם רוצה להזמין ואני לא רשומה
  const router = useRouter();

  useEffect(() => {
    if(dateRange.startDate && dateRange.endDate) {
        const dayCount = differenceInCalendarDays(
            dateRange.endDate,
            dateRange.startDate
        );

        if(dayCount && listing.price) {
            setTotalPrice(dayCount * listing.price);
        } else {
            setTotalPrice(listing.price);
        }
    }
},[dateRange.endDate, dateRange.startDate, listing.price])

  const category = useMemo(() => {
    return categories.find((x) => x.label === listing.category); //מחזיר לי את כל האובייקט לפי שם האובייקט שנמצא לי בדירה
  }, [listing.category]);



  //אחראי להחזיר לי את כל התאריכים שהוזמנו זה יעזור לי בהמשך כשאצטרך לבטל אפשרות ללחוץ להזמנה
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        // פונקציה מיוחדת שמחזירה כל תווך של ימים שאתן לו
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range]; //עדיין בפוראיצ'
    });
    return dates;
  }, [reservations]);

  //להוסיף הזמנה
  const onCreateReservation = useCallback(() => {
    //קוראים לAPI כדי להוסיף
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        // במידה וזה הצליח
        toast.success("Listing reserved!");
        setDateRange(initialDateRange); // מאפסים
        //לא לשכח להעביר את היוזר לדף טיולים/ ההזמנות !!!!!!!!!!!!!!!!!!!!!
        router.push("/trips")
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false); // לא משנה מה, בסוף נשחרר
      });
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing.id,
    loginModal,
    totalPrice,
  ]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHeader
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              guestCount={listing.guestCount}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange} // מה שאני בחרתי
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}//הפונקציה שמחזירה לנו את כל התאריכים
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
