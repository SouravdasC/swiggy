import { configureStore } from '@reduxjs/toolkit'
import toggleSearch from './toggleSlice'
import cartSlice from './cartSlice';
import filterSlice from './filterSlice';
import authSlice from './authSlice';

export const store = configureStore({
    reducer: {
        toggleSlice: toggleSearch,
        cartSlice: cartSlice,
        filterSlice: filterSlice,
        authSlice: authSlice
    }
});