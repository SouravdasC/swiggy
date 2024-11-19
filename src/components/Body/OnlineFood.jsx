import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import ResCard from "./ResturentCard/ResCard";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setFilterValue } from "../../redux/filterSlice";


function OnlineFood({ data, title }) {
  // console.log(title);

  const filterOptions = [
      'Offers',
    
       'Rs. 300-Rs. 600',
    
       'Less than Rs. 300',
    
       'Ratings 4.0+',
   

  ]

  const [active, setActive] = useState(null);
  // redux filter 
  const dispatch = useDispatch();

  function filterHandleBtn(filterName) {
    setActive(active === filterName ? null : filterName);
    // dispatch(setFilterValue(active))
  }
  
    dispatch(setFilterValue(active))
    // console.log(active); 
  
  

  return (
    <>
      <div className="mt-6 ">
        <h1 className="font-bold sm:text-[1.5rem] capitalize">{ title} </h1>
        <div className="flex gap-4 mt-3 mb-6">
          {
            filterOptions.map((option, index) => (
              <div key={index} className="">
                <button onClick={() => filterHandleBtn(option)} className={`flex items-center gap-2 border-2 sm:py-2 text-[0.9rem] sm:px-2 shadow-[10px_10px_gray] ${active === option ? 'bg-green-400' : ''}`}>
                  {option}
                  <FaXmark className={`text-[1.4rem] bg-gray-200 ${active === option ? 'block' : 'hidden'}`}/>
                </button>
              </div>
            ))
          }
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-4 mt-4">
          {
            data?.map((item, index) => (
              <div className=" hover:scale-95 duration-300 cursor-pointer sm:w-[200px] lg:w-[280px] " key={index}
              //   style={{ translate: `-${value}%` }}
              >
                {/* <ResCard {...item} /> */}
                
                <ResCard item={item} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
export default OnlineFood