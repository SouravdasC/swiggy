import { useContext, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Dishesdata from "./Dishesdata";
import RestaurantData, { withHOC } from "./RestaurantData";
import { useDispatch, useSelector } from "react-redux";
import { resetSimilarResdish } from "../../../redux/toggleSlice";
import { LocationContext } from "../../../context/contextApi";



function SearchFun() {

  const [query, setQuery] = useState();
  const filterNames = ["Restaurants", "Dishes"];
  const [active, setActive] = useState("Dishes");
  const [dishesData, setDishesData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [selectedRes, setSelectedRes] = useState(null);
  const [similarDishesRes, setSimilarDishesRes] = useState([]);
  // console.log(dishesData);
  const { locationSelect: { lat, lng } } = useContext(LocationContext) ;

  // enhance component 
  const PromotedRes = withHOC(RestaurantData);

  function handleFilterBtn(option) {
    setActive(active === option ? active : option)
  }

  // Dishes api 
  async function fetchDishes() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${query}&trackingId=undefined&submitAction=ENTER&queryUniqueId=04ea86b6-2ff3-c631-a18a-4f9c54d45b14`);
      const data = await response.json();
      // console.log((data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards)?.filter(data => data?.card?.card?.info));
      const finalData = (data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards)?.filter(data => data?.card?.card?.info);
      setDishesData(finalData);

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
    }
  }

  // Restaurants Api 
  const fetchRestaurants = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${query}&trackingId=undefined&submitAction=ENTER&queryUniqueId=04ea86b6-2ff3-c631-a18a-4f9c54d45b14&selectedPLTab=RESTAURANT`);
      const data = await response.json();
      // console.log((data?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)?.filter(data => data?.card?.card?.info));
      const resFinalData = (data?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards)?.filter(data => data?.card?.card?.info);
      setRestaurantsData(resFinalData);

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
    }
  }

  // Similar RestaurantDishes Api 
  const { city, resLocation, resId, itemId, isSimilarDishesRes } = useSelector(state => state.toggleSlice.similarResDish);
  const dispatch = useDispatch();

  const pathName = `/city/${city}/${resLocation}`;
  const encodePath = encodeURIComponent(pathName);
  // console.log(encodePath)
  const fetchSimilarDishes = async () => {
    const resp = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${query}&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodePath}-rest${resId}%3Fquery%3D${query}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`)
    const data = await resp.json();
    // console.log(data?.data?.cards[1]?.card?.card);
    // console.log(data?.data?.cards[2]?.card?.card?.cards);

    setSelectedRes(data?.data?.cards[1]);
    setSimilarDishesRes(data?.data?.cards[2]?.card?.card?.cards);

    dispatch(resetSimilarResdish());

  }
  // console.log(isSimilarDishesRes);
  useEffect(() => {
    if (isSimilarDishesRes) {
      fetchSimilarDishes();
    }
  }, [isSimilarDishesRes])



  useEffect(() => {
    if (query === '') {
      return
    }
    fetchDishes();
    fetchRestaurants();
  }, [query])
  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <div className=" w-[50%] border-2 border-gray-300 flex justify-between items-center px-4 py-2">
          <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search for restaurants and food" className="outline-none w-[95%] text-black font-semibold" />
          <IoSearchOutline className="text-[1.8rem]" />
        </div>
        <div className="flex gap-4">
          {
            !selectedRes &&
            filterNames.map((option, i) => (
              <div key={i}>
                <button onClick={() => handleFilterBtn(option)} className={`flex items-center gap-2 border-2 py-2 px-2 mt-4 font-medium rounded-lg ${active === option ? 'bg-green-400 text-white' : ''}`}>{option}</button>
              </div>
            ))
          }
        </div>
        <div className="bg-white w-[50%] px-2 py-4">
          {
            selectedRes ?
              <>
                <p>item added to cart</p>
                <Dishesdata data={selectedRes?.card?.card} />
                <p>More dishes from this restaurant</p>
                {
                  similarDishesRes?.map(data => <Dishesdata data={{ ...data.card, restaurant: selectedRes?.card?.card }} />)
                }
              </>
              :
              active === "Dishes" ? (
                <div className="grid grid-cols-2 gap-2">
                  {
                    dishesData?.map((data, i) => (
                      <Dishesdata data={data?.card?.card} />
                    ))

                  }
                </div>
              ) : (<div className="grid grid-cols-2 gap-2">
                  {
                    restaurantsData?.map((data, i) => (
                      <div key={i}>
                        {
                          data?.card?.card?.info?.promoted ?
                            <PromotedRes data={data} /> : <RestaurantData data={data} />
                        }
                      </div>
                    ))
                  }
              </div>) 
          }
        </div>
      </div>
    </>
  )
}
export default SearchFun