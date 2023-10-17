import Image from "next/image";
import getCurrentUser from "./actions/getCurrentUser";
import Container from "./components/shared/Container";
import EmptyState from "./components/shared/EmptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";

interface IHomeProps {
  searchParams: IListingsParams;
}
export default async function Home({ searchParams }: IHomeProps) {
  // const isEmpty = true;
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);
  // throw new Error("Invalid"); // לעשות שגיאה יזומה
  return (
    <div>
      {listings.length < 1 ? (
        <EmptyState showReset />
      ) : (
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing: any) => (
              <ListingCard
                key={listing._id}
                data={listing}
                currentUser={currentUser}
              />
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}
