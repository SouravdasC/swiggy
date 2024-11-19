import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context/contextApi";
import { useParams } from "react-router-dom";

function useTopRestaurantsData() {
    const [resDetails, setResDetails] = useState([])
    const [menuDetails, setMenuDetails] = useState([]);
    const [dealDetails, setDealDetails] = useState([]);
    const [menuItems, setMenuitems] = useState([]);
    const [topPicksData, settopPicksdata] = useState({})
    const { locationSelect: { lat, lng } } = useContext(LocationContext);
    // console.log(menuDetails);

    const { id } = useParams();
    // console.log(id);

    const menuId = id.split('-').at(-1);
    // console.log(menuId);

    // console.log(id.split('-').at(-1));

    const menuData = async () => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${menuId}&catalog_qa=undefined&submitAction=ENTER`);


        // console.log(res);
        const result = await res.json()

        const menuName = result?.data?.cards[0]?.card?.card?.text;
        setResDetails(menuName)

        // console.log(result?.data?.cards?.find(data => data?.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"));
        const menuDetails = result?.data?.cards?.find(data => data?.card?.card?.["@type"]?.includes("food.v2.Restaurant"))?.card?.card?.info;
        setMenuDetails(menuDetails);
        // setMenuDetails(result?.data?.cards[2]?.card?.card?.info);

        // discount deals
        const dealDetails = result?.data?.cards?.find(data => data?.card?.card?.["@type"]?.includes("widgets.v2.GridWidget"))?.card?.card?.gridElements?.infoWithStyle?.offers;
        setDealDetails(dealDetails);

        const actualMenu = (result?.data?.cards?.find(data => data?.groupedCard));
        setMenuitems(actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(data => data?.card?.card?.itemCards || data?.card?.card?.categories))


        settopPicksdata(actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(data => data.card.card.title == 'Top Picks')[0])
        // console.log(topPicksData);


    }

    useEffect(() => {
        menuData()
    }, [])
    return { resDetails, menuDetails, dealDetails, menuItems, topPicksData };
}
export default useTopRestaurantsData