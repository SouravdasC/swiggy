import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";



function RestaurantData({ data: { card: { card: { info: { name, id, aggregatedDiscountInfoV3 = {}, avgRating, costForTwoMessage, cuisines, cloudinaryImageId, promoted = false, sla: { slaString } } } } } }) {
  // console.log(data);

  return (
    <>
      <Link to={''}>
        <div className="grid grid-cols-2 gap-2 shadow-xl rounded-lg">
          <div className="shadow-2xl p-4">
            <div className="flex gap-4">
              {/* restaurantImage */}
              <div>
                <div className="w-[7rem]">
                  <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/v1648635511/${cloudinaryImageId}`} alt="" className="rounded-lg" />
                </div>
                {
                  aggregatedDiscountInfoV3 ? <div className="flex flex-col items-center -translate-y-2 text-green-600  rounded-lg shadow-xl bg-white border-black border">
                    <span className="text-[0.9rem] font-extrabold">{aggregatedDiscountInfoV3.header}</span>
                    <span className="text-[0.6rem] font-semibold">{aggregatedDiscountInfoV3.subHeader}</span>
                  </div> : ''
                }

              </div>

              {/* rastaurantDeatils */}
              <div className="flex flex-col">
                <h1>{name}</h1>
                <div className="flex gap-3">
                  <span className="flex items-center">
                    <IoMdStar />{avgRating}
                  </span>
                  <span>{costForTwoMessage}</span>
                  <span>{slaString}</span>
                </div>
                <p>{cuisines}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
export default RestaurantData;

// HOC component 
export function withHOC(wrappedComponent) {
  return (prop) => {
    return <div>
      <p>Ad</p>
      <RestaurantData {...prop} />
    </div>
  }
}