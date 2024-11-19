import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"
import First_section from "./components/First_section";
import Second_section from "./components/Second_section"
import Third_section from "./components/Third_section";
import TopPicks from "./components/TopPicks";
import { LocationContext } from "../../../context/contextApi";
import ShimmerEffect from "../../ShimmerEffect/ShimmerEffect";
import useTopRestaurantsData from "../../../customHooks/useTopRestaurantsData";


function InnerTopResMenu() {

  

  const [value, setValue] = useState(0)

  const { resDetails, menuDetails, dealDetails, menuItems, topPicksData } = useTopRestaurantsData();

  return (
    <div className="container mx-auto max-w-screen-lg mt-4">
      {
        resDetails.length ? (<>
          <First_section data={menuDetails} />
          <Second_section data={dealDetails} />
          <TopPicks topPicksData={topPicksData} />
          <Third_section data={menuItems} menuDetails={menuDetails} />
        </>) : <ShimmerEffect />
      }

      {/* {
        dealDetails.map((data, index) => (
          <Second_section item={data} key={index}/>
        ))
      } */}
    </div>
  )
}
export default InnerTopResMenu