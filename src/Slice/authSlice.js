import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLogged: false,
    currentUser: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: { // tạo action
        signin: (state, action)=> {
            state.isLogged = true;
            state.currentUser = action.payload;
            console.log(action.payload)
            if (action.payload) {
                localStorage.setItem("user", JSON.stringify(state.currentUser));
            }
        },

        signout: (state) => {
            state.isLogged = false;
            state.currentUser = null;
            localStorage.removeItem("user");
        },
    },
});
export const { signin, signout } = authSlice.actions;
export default authSlice;