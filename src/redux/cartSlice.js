import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    resInfo: JSON.parse(localStorage.getItem('menuDetails')) || []
}

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart: (state, action) => { 
            // console.log(action.payload);
            const { info, menuDetails } = action.payload;
            state.cartItems = [...state.cartItems, info];
            state.resInfo = menuDetails;
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
            localStorage.setItem('menuDetails', JSON.stringify(menuDetails));
            
        },
        removeCart: (state, action) => {
            state.cartItems = action.payload;
            // localStorage.setItem('cart', JSON.stringify(state.cartItems))
            localStorage.setItem('cart', JSON.stringify(action.payload))
         },
        clearCart: (state) => {
            state.cartItems = []
            state.resInfo = []
            localStorage.removeItem('cart');
            localStorage.removeItem('menuDetails');
        }
    }
});



export const {addToCart, removeCart, clearCart} = cartSlice.actions
export default cartSlice.reducer