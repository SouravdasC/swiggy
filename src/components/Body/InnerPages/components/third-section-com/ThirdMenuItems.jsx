import { useContext, useState } from "react";
import { CartContext } from "../../../../../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../../../../../redux/cartSlice";
import toast from 'react-hot-toast';
import { IoIosStar } from "react-icons/io";
import { veg, nonVeg } from '../../../../../config/links';
import AddToCartBtn from '../../../../../components/HOC/AddToCartBtn';
import { toggleDiffRes } from "../../../../../redux/toggleSlice";



function ThirdMenuItems({ info, id, menuDetails }) {
    // console.log(menuDetails);


    const { name, price, defaultPrice, description, imageId, itemAttribute: { vegClassifier }, ratings: { aggregatedRating: { rating, ratingCountV2 } }, offerTags } = info;

    const trimDesc = description?.substring(0, 60) + '......'
    const [isMore, setIsMore] = useState(false);
    // const [isDiffRes, setDiffRes] = useState(false);

    // cart function
    // const { cart, setCart } = useContext(CartContext);

    // redux
    // const cart = useSelector(state => state.cartSlice.cartItems);
    // const menuFromLocalStorage = useSelector(state => state.cartSlice.resInfo);
    const dispatch = useDispatch();
    const isDiffRes = useSelector(state => state.toggleSlice.isDiffRes);


    function handleDiffRes() {
        dispatch(toggleDiffRes());
    }

    const handleClearCart = () => {
        dispatch(clearCart());
        // handleCartFun();
        handleDiffRes();
        toast.success('cart is cleared');
    }

    return (
        <>
            <div key={id} className="mt-6 mb-6 flex gap-3 items-center">
                {/* {console.log(info)} */}
                <div className="flex flex-col gap-2 w-[80%]">
                    <h1 className="font-bold flex flex-col capitalize text-lg text-gray-700">
                        <span>
                            <img src={(vegClassifier === "VEG" ? veg: nonVeg)} className="w-5" />
                        </span>
                        <span>{name}</span>
                        <span>
                            ₹{price / 100 || defaultPrice / 100}
                        </span>
                    </h1>

                    <div className="flex">
                        <span className={`text-green-700 font-bold ${rating > 3 ? 'text-green-800' : 'text-yellow-700'} flex items-center gap-1`}>
                            <IoIosStar className={`font-bold ${rating >= 1 ? 'block' : 'hidden'}`} /> {rating}
                        </span>
                        <span className={`font-bold ${ratingCountV2 >= 1 ? 'block' : 'hidden'}`}> ({ ratingCountV2 }) </span>
                    </div>
                    {
                        description?.length > 120 ?
                            <div className="flex">
                                <p className=" w-[95%] ">{isMore ? description : trimDesc}
                                    <button className="font-bold" onClick={() => setIsMore(!isMore)}>{isMore ? 'less' : 'more'}</button>
                                </p>
                            </div> : <p>{description}</p>
                    }

                </div>
                <div className="flex flex-col items-center relative">
                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/v1648635511/${imageId}`} className="rounded-2xl w-[156px] h-[144px]" />
                    {/* <button onClick={handleCartFun} className=" -translate-y-5 text-green-600 px-10 py-2 uppercase font-extrabold rounded-lg shadow-xl bg-white border-black border text-lg">add</button> */}
                    <AddToCartBtn info={info} menuDetails={menuDetails} handleDiffRes={handleDiffRes} />
                </div>
            </div>
            <hr />
            {
                isDiffRes && (
                    <div className="capitalize shadow-2xl p-8 w-[54%] flex flex-col gap-4 z-50 bg-white fixed bottom-4">
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
        </>
    )
}
export default ThirdMenuItems