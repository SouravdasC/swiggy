import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { nonVeg, veg } from "../../../config/links";
import AddToCartBtn from "../../HOC/AddToCartBtn";
import { useDispatch, useSelector } from "react-redux";
import { resetSimilarResdish, setSimilarResdish, toggleDiffRes, toggleSimilarDishesRes } from "../../../redux/toggleSlice";
import { clearCart } from "../../../redux/cartSlice";
import toast from "react-hot-toast";

function Dishesdata({ data: { info, restaurant: { info: restaurantInfo }, hideRestaurantDetails = false } }) {
    // console.log(data);
    const { imageId, name, price, isVeg, id: itemId } = info;
    const { name: resName, avgRating, id, sla, slugs } = restaurantInfo;
    // console.log(restaurantInfo)

    // redux 
    const dispatch = useDispatch();
    const isDiffRes = useSelector(state => state.toggleSlice.isDiffRes);

    const handleDiffRes = () => {
        dispatch(toggleDiffRes());
    }
    const handleClearCart = () => {
        dispatch(clearCart());
        handleDiffRes();
        toast.success('cart is cleared');
    }
    // addToCartBtn 
    const { id: cartId } = useSelector(state => state.cartSlice.resInfo);
    function handleSimilarRes() {
        if (cartId === id) {
            dispatch(resetSimilarResdish());
            dispatch(setSimilarResdish({
                isSimilarDishesRes: true,
                city: slugs?.city,
                resLocation: slugs?.restaurant,
                resId: id,
                itemId,
            }))
        }
        // console.log('hello0')
    }
    return (
        <>

            {
                isDiffRes && (
                    <div className="capitalize shadow-md p-8 w-[54%] flex flex-col gap-4 z-50 bg-white fixed bottom-4">
                        {/* <div className="flex flex-col gap-4 z-30 fixed bottom-0 shadow-2xl"> */}
                        <h1 className="font-semibold text-[1.6rem]">Items already in cart</h1>
                        <p className="text-gray-400 text-sm">Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                        <div className="uppercase flex justify-evenly">
                            <button onClick={handleDiffRes} className="border-2 border-green-600 w-[40%] py-2 text-green-500 font-semibold">NO</button>
                            <button onClick={handleClearCart} className="w-[40%] uppercase bg-green-500 text-white py-2 font-semibold">yes, start afresh</button>
                        </div>
                        {/* </div > */}
                    </div >
                )
            }

            <Link to={`/topRes/${slugs?.restaurant}-${id}`}>
                <div className="">
                    <div className="bg-slate-400 p-4 rounded-3xl flex flex-col gap-5">
                        {
                            !hideRestaurantDetails && (
                                <div className="flex flex-col gap-1 text-sm">
                                    <h1 className="font-bold text-gray-600 text-sm">{resName}</h1>
                                    {/* {console.log(resName)} */}
                                    <div className="flex gap-5 items-center  text-gray-500">
                                        <span className="flex gap-1 items-center">
                                            <span><IoMdStar className="text-gray-500" /></span>
                                            {avgRating} .
                                        </span>
                                        <span>{sla?.slaString}</span>
                                    </div>
                                    <div className="border-b-2"></div>
                                </div>
                            )
                        }

                        <div className="flex gap-[2rem]">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <span>
                                        <img src={isVeg === 1 ? veg : nonVeg} alt="" className="w-[1.5rem] rounded-lg" />
                                    </span>
                                    <h1 className="font-extrabold text-gray-700 text-[1.1rem]">{name}</h1>
                                </div>
                                <span className="font-bold text-green-200 text-[1.1rem]">₹{price / 100}</span>
                            </div>
                            <div>
                                <span className="flex flex-col items-center">

                                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/v1648635511/${imageId ? imageId : null} `} alt="" className="w-[12vw] h-[8rem] rounded-lg" />
                                    <div onClick={handleSimilarRes}>
                                        <AddToCartBtn
                                            info={info}
                                            menuDetails={restaurantInfo}
                                            handleDiffRes={handleDiffRes}
                                        />
                                    </div>
                                </span>
                            </div>
                        </div>

                    </div>

                </div>
            </Link>

        </>
    )
}
export default Dishesdata