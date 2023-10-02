import { createSlice } from "@reduxjs/toolkit";
export default createSlice({
    name: 'checkOut',
    initialState: {},
    reducers: {
        checkOutChange: (state, action) => {
          console.log(action.payload)
             return action.payload;
        },
    }
})