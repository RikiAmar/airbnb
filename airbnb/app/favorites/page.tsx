import getCurrentUser from "../actions/getCurrentUser";
import { getFavoriteListings } from "../actions/getFavoriteListings";
import EmptyState from "../components/shared/EmptyState";
import FavoritesClient from "./component/FavoritesClient";

const ListingPage = async () => {

    const favoriteListings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (favoriteListings.length === 0) {
        return (
            <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings." />
        )
    }

    return (
        <FavoritesClient listings={favoriteListings} currentUser={currentUser}/>
    )
}

export default ListingPage;