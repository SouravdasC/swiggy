import { useContext } from "react"
import { CartContext } from "../../../context/contextApi"
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeCart } from "../../../redux/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart() {
    // const { cart, setCart } = useContext(CartContext);
    // console.log(cart);
    const cart = useSelector(state => state.cartSlice.cartItems);
    const dispatch = useDispatch();

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

        // const newCart = [...cart];
        // newCart.splice(index, 1);
        // setCart(newCart);
        // localStorage.setItem('cart', JSON.stringify(newCart))
    }

    // cart totalPrice
    // let totalPrice = 0;
    // for (let i = 0; i < cart.length; i++){
    //     totalPrice = totalPrice + cart[i].price / 100 || totalPrice + cart[i].defaultPrice /100
    // }

    // reduce method
    let totalPrice = cart.reduce((acc, curVal) => (acc + curVal.price / 100 || acc + curVal.defaultPrice / 100), 0)

    // cart clear all
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
                navigate("/signin")
            } else {
                toast.success('Order Place')
            }
        } else {
            toast.error('Plaese Add Some Food');
            navigate("/")
        }
        
    }
    return (
        <div className="p-7">
            {
                cart.map((data, index) => (
                    <div key={index} className=" flex items-center justify-around w-[70%] ">
                        <div className="flex flex-col gap-2 w-[80%]">
                            <h1 className="font-bold flex flex-col capitalize text-lg text-gray-700">
                                <span>
                                    <img src={(data.vegClassifier === "VEG" ? veg : nonVeg)} className="w-5" />
                                </span>
                                <span>{data.name}</span>
                                <span>
                                    ₹{data.price / 100 || data.defaultPrice / 100}
                                </span>
                                <p>{data.description}</p>
                            </h1>

                            <div>
                                <span>{data.rating}</span>
                                <span>({data.ratingCountV2})</span>
                            </div>

                        </div>
                        <div className="flex flex-col items-center relative">
                            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/v1648635511/${data.imageId}`} className="rounded-2xl w-[156px] h-[144px]" />
                            <button onClick={() => handleRemoveFun(index)} className=" -translate-y-5 text-green-600 px-10 py-2 uppercase font-extrabold rounded-lg shadow-xl bg-white border-black border text-lg">remove</button>
                            <hr className="bg-black h-[0.1rem]" />
                        </div>
                    </div>
                ))
            }

            <h1>Total - {totalPrice}</h1>
            <button onClick={handleClearCart} className="bg-green-400 text-white rounded-lg p-3">Clear Cart</button>
            <button onClick={HandlePlaceOrder} className="bg-green-400 text-white rounded-lg p-3">Place Order</button>
        </div>
    )
}
export default Cart