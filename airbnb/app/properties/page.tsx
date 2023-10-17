import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import EmptyState from "../components/shared/EmptyState";
import PropertiesClient from "./component/PropertiesClient";

const PropertiesPage = async () => {
 const currentUser = await getCurrentUser()
  if (!currentUser) {
    return <EmptyState title="Unauthorized!" subtitle="Please login" />;
  }

  const myListings = await getListings({userId: currentUser.id});

  if (myListings.length <= 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties"
      />
    );
  }

  return (
    <div>
      <PropertiesClient currentUser= {currentUser} listings={myListings} />
    </div>
  );
};

export default PropertiesPage;
