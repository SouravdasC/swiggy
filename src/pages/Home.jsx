import { useState, useEffect, useContext, useMemo } from "react"
import Menu from "../components/Body/Menu"
import TopResMenu from "../components/Body/TopResMenu"
import OnlineFood from "../components/Body/OnlineFood";
import { LocationContext } from "../context/contextApi";
import { useSelector } from "react-redux";
import ShimmerEffect from "../components/ShimmerEffect/ShimmerEffect";
import useRestaurantsData from "../customHooks/useRestaurantsData";

function Home() {

  // custom hooks 
  const { topRestMenu, resBodyMenu, title, onlineFoodTitle, notServiceLocation } = useRestaurantsData();

  // redux filter 
  const filterValue = useSelector(state => state.filterSlice.filterValue);
  // console.log(resBodyMenu);
  
  const filterData = resBodyMenu?.filter(item => {
    if (!filterValue) return true;
// console.log(item);

    switch (filterValue) {
      case 'Offers': return item?.info?.aggregatedDiscountInfoV3?.header + item?.info?.aggregatedDiscountInfoV3?.subHeader
      case 'Rs. 300-Rs. 600': return item?.info?.costForTwo?.slice(1, 4) >= '300' && item?.info?.costForTwo?.slice(1, 4) <= '600'
      case 'Less than Rs. 300' : return item?.info?.costForTwo?.slice(1,4) >= '300'
      case 'Ratings 4.0+': return item?.info?.avgRating >= 4
    }
   
  })

  if (notServiceLocation.communication) {
    return (
      <div className="m-auto h-auto">
        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" />
        <h1 className="font-extrabold text-lg"> Location Unserviceable</h1>
        <p>We don’t have any services here till now. Try changing location.</p>
      </div>
    )
  } else {
    return (
      <>
        {
          topRestMenu?.length ? (
            <div className="w-full container mx-auto max-w-screen-xl mt-4 overflow-hidden p-4">
              {
                topRestMenu ? <>
                  <Menu data={topRestMenu} />
                  <TopResMenu data={resBodyMenu} title={title} />
                </> : null
              }
              <OnlineFood data={filterValue ? filterData : resBodyMenu} title={onlineFoodTitle} />
            </div>) : <ShimmerEffect />
        }
      </>
    )
  }
}
export default Home