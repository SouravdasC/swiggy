import { createSlice } from '@reduxjs/toolkit'


const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        filterValue: null
    },
    reducers: {
        setFilterValue: (state, action) => {
            state.filterValue = action.payload
        }
    }
})

export const { setFilterValue } = filterSlice.actions;
export default filterSlice.reducer;
