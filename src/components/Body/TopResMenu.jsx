import { useEffect, useState } from "react"
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import ResCard from "./ResturentCard/ResCard";


function TopResMenu({ data, title }) {

    const [value, setValue] = useState(0)
    // console.log(value);
    // console.log(title);
    
    
    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <h1 className="font-medium sm:font-bold text-[1.1rem] sm:text-[1.5rem] capitalize">{title}</h1>
                <div className="flex gap-2">
                    <button
                        className={`bg-gray-200 rounded-full p-1  flex justify-center items-center
                        ${value <= 0 ? '' : 'bg-gray-400'}`}
                        onClick={() => value > 0 ? setValue(prev => prev - 100) : ''}
                    >
                        <FaArrowLeft className="text-[1rem] text-gray-500" />
                    </button>
                    <button
                        className={`bg-gray-200 rounded-full p-1  flex justify-center items-center
                        ${value >= 1800 ? '' : 'bg-gray-400'}`}
                        onClick={()=>value > 1700 ? '' : setValue(prev => prev + 100)}
                    >
                        <FaArrowRight className="text-[1rem] text-gray-500" />
                    </button>
                </div>
            </div>

            <div
                className="flex gap-2 sm:gap-6 overflow-hidden duration-200">

                {
                    data?.map((item, index) => (
                        <div className=" hover:scale-95 duration-300 cursor-pointer w-[280px] h-[287px] sm:h-auto " key={index}
                            style={{ translate: `-${value}%` }}
                        >
                            {/* <ResCard {...item} /> */}
                            <ResCard item={item} />
                        </div>
                    ))
                }
                {/* {
                    data.map(({info, cta: {link}}) => (
                        <div key={info.id}>
                            <p>{console.log(info)}</p>
                            <div className="relative">
                                <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${info.cloudinaryImageId}`} alt="" className=" rounded-lg w-[287px] h-[182px] max-w-[282px]" />
                                <h1 className="absolute bottom-2 text-white font-extrabold text-[1.4rem] uppercase z-50"> {info.aggregatedDiscountInfoV3?.header + info.aggregatedDiscountInfoV3?.subHeader} </h1>
                            </div>
                        </div>
                    ))
                } */}

            </div>

            <div className="border-b-[0.2px] border-black"></div>
        </>
    )
}
export default TopResMenu