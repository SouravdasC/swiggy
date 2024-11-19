import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchToggle: false,
    toggleLogin: false,
    menuBtn: false,
    isDiffRes: false,
    similarResDish: {
        isSimilarDishesRes: false,
        city: '',
        resLocation: '',
        resId: '',
        itemId: '',
    }
}

const toggleSlice = createSlice({
    name: "toggleSlice",
    initialState,
    reducers: {
        toggleSearchBar: (state, action) => {
            state.searchToggle = !state.searchToggle
        },
        toggleLogin: (state) => {
            state.toggleLogin = !state.toggleLogin
        },
        toggleMenuBtn: (state) => {
            state.menuBtn = !state.menuBtn
        },
        toggleDiffRes: (state) => {
            state.isDiffRes = !state.isDiffRes
        },
        setSimilarResdish: (state, action) => {
            state.similarResDish  = action.payload
        },
        resetSimilarResdish: (state) => {
            state.similarResDish = {
                isSimilarDishesRes: false,
                city: '',
                resLocation: '',
                resId: '',
                itemId: '',
            }
        },
    }
});

export const { toggleSearchBar, toggleLogin, toggleMenuBtn, toggleDiffRes, toggleSimilarDishesRes, setSimilarResdish, resetSimilarResdish } = toggleSlice.actions;
export default toggleSlice.reducer