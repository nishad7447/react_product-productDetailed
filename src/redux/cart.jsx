import { createSlice } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    products:[],
    category:[]
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        setProducts:(state,action)=>{
            state.products = [...action.payload];
        },
        setCategory:(state,action)=>{
            state.category = [...action.payload];
        }
    }
})

export const { setProducts,setCategory } = cartSlice.actions

export default cartSlice.reducer