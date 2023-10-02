import { createSelector } from '@reduxjs/toolkit'

export const countCartSelector = (state) => state.cart.count;


// export const todosRemainingSelector = createSelector(countCartSelector,idProductSelector,
//     (count,id) => {
//         return count+id
//     })
