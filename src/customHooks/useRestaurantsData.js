import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context/contextApi";

function useRestaurantsData() {
  
    const [topRestMenu, setTopRestMenu] = useState([]);
    const [resBodyMenu, setrestBodyMenu] = useState([]);
    const [title, setTitle] = useState([]);
    const [onlineFoodTitle, setOnlineFoodTitle] = useState([]);
    const [notServiceLocation, setNotServiceLocation] = useState({});
    const { locationSelect: { lat, lng } } = useContext(LocationContext);


    const fetchData = async () => {
        // const response = await fetch("https://instafood.onrender.com/api/restaurants?lat=22.51800&lng=88.38320");
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
        

        const result = await response.json();

        // restmenu
        // console.log(result?.data?.cards[0]?.card.card.imageGridCards?.info);
        const imagesGrid = result?.data?.cards?.find(data => data?.card?.card?.id == "whats_on_your_mind")?.card?.card?.imageGridCards?.info;
        setTopRestMenu(imagesGrid);

        // restBodyMenu
        // const resData = result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        const resData = result?.data?.cards?.find(data => data?.card?.card?.id == "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        // mobile device 
        const mobileResData = result?.data?.cards?.find(data => data?.card?.card?.id == "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setrestBodyMenu(resData || mobileResData);
        // console.log(resData, mobileResData);

        // topRes Title
        const titleData = result?.data?.cards?.find(data => data?.card?.card?.id == "top_brands_for_you")?.card?.card?.header?.title;
        setTitle(titleData)

        // onlineFood
        const onlineFoodTitle = result?.data?.cards?.find(data => data?.card?.card?.id == "popular_restaurants_title")?.card?.card?.title;
        setOnlineFoodTitle(onlineFoodTitle);

        // console.log(result);
        setNotServiceLocation(result.data)

    }

    useEffect(() => {
        fetchData()
    }, [lat, lng]);

    return { topRestMenu, resBodyMenu, title, onlineFoodTitle, notServiceLocation };
}
export default useRestaurantsData