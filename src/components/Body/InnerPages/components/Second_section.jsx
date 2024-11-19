import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { Link } from "react-router-dom";
import TopPicks from "./TopPicks";



function Second_section({ data}) {
  // console.log(data);
  // console.log(topPicksData);
  

  const [value, setValue] = useState(0)
  // console.log(value);

  return (
    <>
      <div className="mb-10">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-[1.5rem] capitalize">deals for you</h1>
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
            data?.map(({ info: { header, offerLogo, description } }, index) => (
              <div key={index} style={{ translate: `-${value}%` }} className="border-gray-300 border rounded-3xl hover:scale-95 duration-300 cursor-pointer ">
                <div className="flex pt-4 pb-4 pl-4 w-[328px]">
                  <div>
                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/v1648635511/${offerLogo}`} className="w-[48px]" />
                  </div>
                  <div>
                    <h1 className="font-extrabold text-[1.2rem]">{header}</h1>
                    <p className="font-medium text-gray-400 text-sm">{description}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      
      <div className="">
        <h1 className="flex justify-center tracking-widest">MENU</h1>
        <div className="bg-gray-300 rounded-xl flex justify-center ">
          <div className="w-[70%]"></div>
          <Link to={""} className="flex items-center py-3 justify-between w-[90%]">
            <h4 className="capitalize text-lg font-semibold ">search for dishes</h4>
            <span className="flex justify-end">
              <CiSearch  className="text-[1.5rem]"/>
            </span>
          </Link>
        </div>
      </div>
      <div className="border-b-[0.2px] border-black my-5"></div>
      
      <div>
        {/* <TopPicks data={ topPicksData} /> */}
        
      </div>
    </>
  )
}
export default Second_section