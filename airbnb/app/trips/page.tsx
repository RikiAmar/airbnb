import getCurrentUser from "../actions/getCurrentUser";
import GetReservations from "../actions/getReservations";
import EmptyState from "../components/shared/EmptyState";
import TripsClient from "./components/TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized!" subtitle="Please login" />;
  }

  const reservations = await GetReservations({ userId: currentUser.id });
  if (reservations.length === 0) {
    return <EmptyState
      title="No trips found"
      subtitle="Looks like you havent reserved any trips."
    />;
  }

  return <div>
    <TripsClient currentUser = {currentUser} reservations = {reservations}/>
  </div>
};

export default TripsPage;