import { GoStarFill } from "react-icons/go";
import { Link } from 'react-router-dom'



function First_section({ data }) {
    // console.log(data);
    
    return (
        <>
            <div className="relative z-40">
                <div className="capitalize">home / {data.city} / {data.name}</div>
                <div className="mt-7 ">
                    <h1 className="font-bold capitalize text-[1.6rem]">{data.name}</h1>
                    <div className=" rounded-3xl bg-gradient-to-t from-gray-300 p-4">
                        <div className=" rounded-3xl h-full p-4 bg-white flex flex-col gap-3">
                            <div className="flex gap-3 items-center font-bold text-[1.2rem]">
                                <div className="flex items-center gap-1">
                                    <span className="flex items-center">
                                        <GoStarFill className="text-green-400" />{data.avgRating}
                                    </span>
                                    <span>({data.totalRatingsString})</span>
                                </div>
                                <span className="bg-black rounded-full text-black h-1 w-1"></span>
                                <div>
                                    <span>{data.costForTwoMessage}</span>
                                </div>
                            </div>

                            <div>
                                <Link to={''} className="underline text-orange-500 font-bold">
                                    {data?.cuisines?.join(', ')}
                                </Link>
                            </div>

                            <div className="flex gap-2 items-center">
                                <div className="flex flex-col items-center">
                                    <div className="bg-gray-400 rounded-full text-black h-2 w-2"></div>
                                    <div className="h-[2.2rem] w-1 bg-gray-400"></div>
                                    <div className="bg-gray-400 rounded-full text-black h-2 w-2"></div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-3">
                                        <span className="font-semibold capitalize ">outlet</span>
                                        <span className="font-semibold text-gray-500">{data?.locality?.slice(0, 20)}</span>
                                    </div>
                                    <div className="font-semibold lowercase">{data?.sla?.slaString}</div>
                                </div>
                            </div>
                            <div>
                                <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/v1648635511/Delivery_fee_new_cjxumu`} className="w-6" />
                                <div>{data?.feeDetails?.message?.replace(/<[^>]*>/g,"")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default First_section