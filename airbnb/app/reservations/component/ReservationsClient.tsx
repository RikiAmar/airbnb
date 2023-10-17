'use client'
import ListingCard from "@/app/components/listings/ListingCard";
import Container from "@/app/components/shared/Container";
import Heading from "@/app/components/shared/Heading";
import { SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";


interface ReservationsClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh();
            })
            .catch((err) => {
                toast.error('Something went wrong');
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router])

    return (
        <Container>
            <Heading title='Reservations' subtitle='Bookings on your properties'/>
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl: grid-cols-6 gap-8'>
                {reservations.map((res) => (
                    <ListingCard key={res.id} data={res.listing} reservation={res} actionId={res.id} onAction={onCancel} disabled={deletingId === res.id} actionLabel='Cancel guest reservation' currentUser={currentUser}/>
                ))}
            </div>
        </Container>
    );
};

export default ReservationsClient;