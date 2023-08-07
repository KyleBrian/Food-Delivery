import RestaurantCard from "./RestaurantCard";
import RestaurantsPageShimmer from "./shimmerUI/RestaurantsPageShimmer";
import { Link } from "react-router-dom";
import useAllRestaurants from "../utils/useAllRestaurants";
import OffersCarousel from "./OffersCarousel";
import FilterSection from "./FilterSection";
import { useSelector } from "react-redux";

const Body = () => {
  useAllRestaurants([]);

  const restaurantItems = useSelector(
    (store) => store.restaurants.restaurantItems
  );

  // conditional rendering
  return restaurantItems.length === 0 ? (
    <RestaurantsPageShimmer />
  ) : (
    <div className="body mx-28">
      <OffersCarousel />
      {restaurantItems?.length === 0 ? (
        <h2>No restaurant found</h2>
      ) : (
        <div>
          <hr className="mt-5" />
          <div className="text-3xl font-bold mt-8 ml-5">
            Restaurants with online food delivery
          </div>
          <FilterSection />
          <div className="flex flex-wrap mt-5" data-testid="restaurant-list">
            {restaurantItems.map((resData) => {
              return (
                <Link
                  style={{ textDecoration: "none" }}
                  key={resData.info.id}
                  to={"/restaurant/" + resData.info.id}
                >
                  <RestaurantCard resData={resData} />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
