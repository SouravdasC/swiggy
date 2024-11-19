import { GoStarFill } from "react-icons/go";
import { Link } from 'react-router-dom'

// function ResCard(item) {
function ResCard({ item }) {
    // console.log(item.info.id);
    // console.log(item.cta.link.split('/')[4]);
    // console.log(item);
    // console.log(item.cta.link.split('/').at(-1));



    return (
        // <Link to={`/topRes/${item.cta.link.split('/').at(-1)}`}>
        <Link to={`/topRes/${item.info.id}`}>
            <div className="rounded-2xl ">
                {/* <p>{console.log(item)}</p> */}
                <div className="relative">
                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/${item.info.cloudinaryImageId}`} alt="" className=" rounded-2xl w-[200px] sm:w-[287px] h-[182px] max-w-[280px] sm:max-w-[236px] xl:max-w-[282px]" />
                    <div className="absolute bottom-0 bg-gradient-to-t from-5% to-35% sm:bg-gradient-to-t from-black sm:from-5% to-37% h-[182px] w-[127px] sm:w-[239px] xl:w-[282px]"></div>
                    {
                        item?.info?.aggregatedDiscountInfoV3 &&
                        <h1 className="w-[6rem] sm:w-auto absolute bottom-2 left-2 text-white font-medium text-[0.9rem] sm:font-extrabold sm:text-[1.4rem] uppercase z-50"> {item?.info?.aggregatedDiscountInfoV3?.header + "  " + item?.info?.aggregatedDiscountInfoV3?.subHeader} </h1>

                    }
                    {/* {
                        item?.info?.aggregatedDiscountInfoV3 ?
                            <h1 className="absolute bottom-2 left-2 text-white font-extrabold text-[1.4rem] uppercase z-50"> {item?.info?.aggregatedDiscountInfoV3?.header + "  " + item?.info?.aggregatedDiscountInfoV3?.subHeader} </h1>
                            : null
                    } */}

                </div>
            </div>
            <div className="flex flex-col gap-1  sm:mt-3 ">
                <h2 className="capitalize font-medium w-[8rem] sm:w-auto text-[0.9rem] sm:font-bold sm:text-[1.1rem]">{item.info.name}</h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="flex flex-row gap-1 items-center">
                        <GoStarFill className="bg-green-400 rounded-full sm:p-1 sm:text-[1.5rem]" />
                        <span className="font-medium sm:text-[1rem] justify-start">{item.info.avgRating}</span>
                    </span>
                    <span className="text-[20px] font-extrabold hidden sm:visible ">.</span>
                    <span className="font-medium text-[0.9rem] sm:text-[1rem]">{item.info.sla.slaString}</span>
                </div>
                <p className="hidden sm:block capitalize font-medium text-gray-500 text-[0.8rem] sm:text-[1.1rem] overflow-hidden sm:line-clamp-1">{item?.info?.cuisines?.join(", ")}</p>
                <p className="capitalize font-medium text-gray-500 text-[0.9rem] sm:text-[1.1rem]"> {item?.info?.locality?.slice(0, 18)}</p>
            </div>
        </Link>
    )
}
export default ResCard