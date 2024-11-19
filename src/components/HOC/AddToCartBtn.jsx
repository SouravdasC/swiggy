import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {addToCart} from '../../redux/cartSlice'

function AddToCartBtn({ info, menuDetails, handleDiffRes }) {

    // redux
    const cart = useSelector(state => state.cartSlice.cartItems);
    const menuFromLocalStorage = useSelector(state => state.cartSlice.resInfo);
    const dispatch = useDispatch();

    function handleCartFun() {
        // console.log(menuDetails);
        // const menuFromLocalStorage = JSON.parse(localStorage.getItem('menuDetails')) || [];
        // console.log(menuFromLocalStorage);

        const isAdded = cart.find(data => data.id === info.id);

        if (!isAdded) {
            if (menuFromLocalStorage.name === menuDetails.name || menuFromLocalStorage.length === 0) {
                dispatch(addToCart({ info, menuDetails }))
                toast.success('item cart is added')
            } else {
                toast.error("differnt resturent item");
                // setDiffRes(true)
                handleDiffRes();
            }
            // setCart(prev => [...prev, info]);
            // localStorage.setItem('cart', JSON.stringify([...cart, info]));

        } else {
            // alert("Item already added to cart")
            toast.error('Item already added to cart')
        }
    }

  return (
      <>
          <button
              onClick={handleCartFun}
              className=" -translate-y-5 text-green-600 px-8 py-2 uppercase font-extrabold rounded-lg shadow-xl bg-white border-black border text-lg">add</button>
    </>
  )
}
export default AddToCartBtn