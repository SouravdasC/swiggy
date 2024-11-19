import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { clearCart, removeCart } from "../../../redux/cartSlice";
import { toggleLogin } from "../../../redux/toggleSlice";

function Cart_2() {
    const resInfo = useSelector(state => state.cartSlice.resInfo);
    const cart = useSelector(state => state.cartSlice.cartItems);
    const dispatch = useDispatch();
    // console.log(resInfo);

    const veg = "https://5.imimg.com/data5/SELLER/Default/2024/3/395012150/SW/KD/DT/139346699/100-mm-x-50-mm-veg-logo-label.webp";

    const nonVeg = "https://cdn.vectorstock.com/i/1000v/00/43/non-vegetarian-sign-veg-logo-symbol-vector-50890043.jpg"

    function handleRemoveFun(index) {
        if (cart.length > 1) {
            const newCart = [...cart];
            newCart.splice(index, 1);
            dispatch(removeCart(newCart))
            toast.success('cart is remove')
        } else {
            handleClearCart()
        }
    }


    // reduce method
    let totalPrice = cart.reduce((acc, curVal) => (acc + curVal.price / 100 || acc + curVal.defaultPrice / 100), 0);

    const handleClearCart = () => {
        dispatch(clearCart())
        toast.success('cart is cleared')
        // setCart([]);
    }

    const userData = useSelector(state => state.authSlice.userData);
    const navigate = useNavigate();

    function HandlePlaceOrder() {
        if (cart.length >= 1) {
            if (!userData) {
                toast.error('Please Login Fast');
                dispatch(toggleLogin())
            } else {
                toast.success('Order Place')
            }
        } else {
            toast.error('Plaese Add Some Food');
            navigate("/")
        }
    }


    return (
        <>
            {
                cart.length >= 1 ?
                    <div className="bg-gray-200 h-screen">
                        <div className="container mx-auto max-w-screen-xl pt-8 flex gap-8">
                            <div className=" flex flex-col gap-10 ">
                                <div className="flex bg-white px-12 py-8">
                                    <div className="flex flex-col gap-8">
                                        <div className="">
                                            <h1 className="font-bold text-[1.5rem]">Account</h1>
                                            <p className="font-bold text-gray-400 capitalize ">To place your order now, log in to your existing account or sign up.</p>
                                        </div>
                                        <div className="flex gap-10">
                                            <button onClick={HandlePlaceOrder} className="border-2 border-green-500 uppercase px-9 py-3 font-bold text-green-400">login</button>
                                            <button onClick={HandlePlaceOrder} className="bg-green-500 px-9 py-3 uppercase text-white font-bold">logout</button>
                                        </div>
                                    </div>
                                    <div>
                                        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r" alt="" />
                                    </div>
                                </div>
                                <div className="bg-white text-gray-400 font-bold capitalize px-12 py-8 text-[1.2rem]">Delivery address</div>
                                <div className="bg-white text-gray-400 font-bold capitalize px-12 py-8 text-[1.2rem]">payment</div>
                                <div></div>
                            </div>

                            {/* resturent details  */}
                            <div className="bg-white py-8 px-6">
                                <div className="flex gap-3">
                                    <div>
                                        <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/${resInfo.cloudinaryImageId}`} alt="" className="w-[5.5rem]" />
                                    </div>
                                    <div>
                                        <h1 className="font-bold">{resInfo.name}</h1>
                                        <span className="text-sm text-gray-400 font-semibold">{resInfo.areaName}</span>
                                    </div>
                                </div>
                                <div>
                                    {
                                        cart.map((data, index) => (
                                            <div key={index} className=" flex items-center justify-around gap-8">
                                                <div className="flex items-center gap-5 ">
                                                    <h1 className="font-bold flex gap-2 items-center capitalize text-lg text-gray-700">
                                                        <span>
                                                            <img src={(data.vegClassifier === "VEG" ? veg : nonVeg)} className="w-[1rem]" />
                                                        </span>
                                                        <span className="text-[1rem]">{data.name}</span>

                                                    </h1>
                                                    <div className="flex items-center gap-4">
                                                        <div className="border-2 border-gray-200 px-3 flex gap-3 items-center h-[1.6rem] font-semibold">
                                                            <button className="">-</button>
                                                            <spn className="text-green-500">1</spn>
                                                            <button className="text-green-500">+</button>
                                                        </div>
                                                        <span className="font-semibold">
                                                            ₹{data.price / 100 || data.defaultPrice / 100}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center relative">
                                                    <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/v1648635511/${data.imageId}`} className="rounded-2xl w-[5rem]" />
                                                    <button onClick={() => handleRemoveFun(index)} className=" -translate-y-5 text-green-600 px-2 py-1  uppercase font-bold rounded-lg shadow-xl bg-white border-black border text-sm">remove</button>
                                                    <hr className="bg-black h-[0.1rem]" />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h1 className="capitalize font-extrabold border-b-2">bill details :</h1>
                                    <div className="capitalize flex gap-20 text-gray-500 font-semibold">
                                        item total<span>₹{totalPrice}</span>
                                    </div>
                                </div>
                                <div className=" h-[0.1rem] bg-black text-black"></div>
                                <div className="uppercase font-extrabold flex gap-24">
                                    to pay<span>₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-around  mt-10">
                                    <button onClick={handleClearCart} className="bg-green-400 text-white rounded-lg p-3 font-bold hover:bg-orange-400">Clear Cart</button>
                                    <button onClick={HandlePlaceOrder} className="border-2 border-green-600 text-green-500 font-bold rounded-lg p-3 hover:bg-orange-500 hover:text-white">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="container mx-auto flex flex-col gap-4 items-center mt-11">
                        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" className="w-[25rem]" />
                        <h1 className="font-bold text-[1.8rem] text-gray-500">Your cart is empty</h1>
                        <p className="text-sm text-gray-400 font-semibold">You can go to home page to view more restaurants</p>
                        <button onClick={() => navigate('/')} className="bg-yellow-800 text-white font-bold px-10 py-4 uppercase">See restaurants near you</button>
                    </div>
            }
        </>
    )
}
export default Cart_2