import{configureStore} from '@reduxjs/toolkit'

import authSlice from '../Slice/authSlice';
import cartSlice from '../Slice/cartSlice';
import checkOutSlice from '../Slice/checkOutSlice';


const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        auth: authSlice.reducer,
        checkOut: checkOutSlice.reducer
    },
    
});

export default store;