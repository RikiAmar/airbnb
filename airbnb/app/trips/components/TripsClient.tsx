"use client";

import ListingCard from "@/app/components/listings/ListingCard";
import Container from "@/app/components/shared/Container";
import Heading from "@/app/components/shared/Heading";
import { SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ITripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<ITripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(""); //database

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled!");
        router.refresh(); //מרנדרים כדי לראות את הרשימה המעודכנת
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId("");
      });
  }, []);

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going..."
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((res) => (
          <ListingCard
            key={res.id}
            data={res.listing}
            reservation={res}
            actionId={res.id}
            onAction={onCancel}
            disabled={deletingId === res.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
