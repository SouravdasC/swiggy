import { useEffect, useState } from "react"
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";



function Menu({ data }) {

    // const [data, setData] = useState([]);
    const [value, setValue] = useState(0)

    // const fetchData = async () => {
    //     const response = await fetch("https://instafood.onrender.com/api/restaurants?lat=12.9351929&lng=77.62448069999999");
    //     const result = await response.json();
    //     // console.log(result?.data?.cards[0]?.card.card.imageGridCards?.info);
    //     const imagesGrid = result?.data?.cards[0]?.card.card.imageGridCards?.info;
    //     setData(imagesGrid);

    // }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    // console.log(value);


    return (
        <>
            <div className="mb-10">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-[1.1rem] sm:text-[1.5rem] capitalize">what's your mind?</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => value > 0 ? setValue((prev) => prev - 100) : '' }
                            className={`bg-gray-200 rounded-full p-1  flex justify-center items-center ${value <= 0 ? '' : 'bg-gray-400'}`}>
                            <FaArrowLeft className="text-[1rem] text-gray-500" />
                        </button>
                        <button
                            onClick={() => value > 1100 ? '' : setValue(prev => prev + 100)}
                            className={`bg-gray-200 rounded-full p-1 flex justify-center items-center ${value >= 1200 ? '' : 'bg-gray-400'}`}>
                            <FaArrowRight className="text-[1rem] text-gray-500" />
                        </button>
                    </div>
                </div>
                <div
                    // style={{ translate: `-${value}%`, }}
                    className={`flex  overflow-hidden  sm:mt-7 sm:mb-16`}>
                    {
                        data?.map((item, index) => (
                            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`} alt="" key={index} className={`w-[6rem] sm:w-[8rem] duration-[700ms] ease-in-out`} 
                                style={{ translate: `-${value}%`}}
                            />
                        ))
                    }
                </div>
                <div className="border-b-[0.2px] border-black"></div>
            </div>
        </>
    )
}

export default Menu;