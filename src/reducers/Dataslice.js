import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  price:"",
  token:{},
  new:"",
  pay:"",
}

export const DataSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state,action) => {
      state.value += 1
    },
    decrement: (state,action) => {
      state.token = action.payload
    },
    incrementByAmount: (state, action) => {
      state.price = action.payload
    },
    change:(state,action)=>{
state.new=action.payload
    },
    ptm:(state,action)=>{
state.pay=action.payload
    }
   
  },
})

// Action creators are generated for each case reducer function
export const { ptm,increment, decrement, incrementByAmount,change } = DataSlice.actions

export default DataSlice.reducer