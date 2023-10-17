import getCurrentUser from "@/app/actions/getCurrentUser";

import EmptyState from "@/app/components/shared/EmptyState";

import getListingById from "@/app/actions/getListingById";
import ListingClient from "../components/ListingClient";
import GetReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

//THIS IS A SERVER COMPONENT. we are not using any react hooks, so we change things up a bit.
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await GetReservations(params);

  return (
    <div>
      {!listing ? (
        <EmptyState />
      ) : (
        <div>
          <ListingClient
            listing={listing}
            currentUser={currentUser}
            reservations={reservations}
          />
        </div>
      )}
    </div>
  );
};
export default ListingPage;
