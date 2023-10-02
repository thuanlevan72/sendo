import { createSlice } from "@reduxjs/toolkit";

const cartSlice= createSlice({
    name: 'carter',
    initialState: {
        count: 0,
    },
    reducers: {
        setInitialCount: (state, action) => {
            state.count = action.payload;
        },
        countCartMinus: (state) =>{
            state.count -=1;
        },
        countCartPlus: (state) =>{
            state.count +=1;
        }
    }
})

export default cartSlice;