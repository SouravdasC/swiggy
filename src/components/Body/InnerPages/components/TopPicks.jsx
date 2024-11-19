import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";


function TopPicks({ topPicksData }) {
    // console.log(topPicksData);

    const [value, setValue] = useState(0)
    
  return (
    <>
      <div>
        {
          topPicksData &&
          <div className="mb-10">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-[1.5rem] capitalize">{topPicksData?.card?.card?.title}</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => value > 0 ? setValue((prev) => prev - 82) : ''}
                  className={`bg-gray-200 rounded-full p-1  flex justify-center items-center ${value <= 0 ? '' : 'bg-gray-400'}`}>
                  <FaArrowLeft className="text-[1rem] text-gray-500" />
                </button>
                <button
                  onClick={() => value > 246 ? '' : setValue(prev => prev + 82)}
                  className={`bg-gray-200 rounded-full p-1 flex justify-center items-center ${value >= 246 ? '' : 'bg-gray-400'}`}>
                  <FaArrowRight className="text-[1rem] text-gray-500" />
                </button>
              </div>
            </div>
            <div
              // style={{ translate: `-${value}%`, }}
              className={`flex gap-4 overflow-hidden  mt-7 mb-16 `}>
              {
                topPicksData?.card?.card?.carousel.map(({ creativeId, dish: { info: { id, defaultPrice, price, imageId } } }) => (
                  <div key={id} className="relative transition-all duration-300" style={{ translate: `-${value}%` }}>
                    <div className="w-[20rem]">
                      <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/v1648635511/${creativeId}`} className="w-full" />
                    </div>
                    <div className="flex justify-between absolute bottom-0 left-0 right-0 px-3 pb-2">
                      <span className="text-white font-bold"> ₹{defaultPrice / 100 || price / 100}</span>
                      <button className="text-green-600 px-10 py-2 uppercase font-extrabold rounded-lg shadow-xl bg-white border-black border text-lg">add</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        }
      </div>
    </>
  )
}
export default TopPicks