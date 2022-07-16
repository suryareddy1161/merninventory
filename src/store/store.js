import { configureStore } from '@reduxjs/toolkit'
import Dataslice from '../reducers/Dataslice'

export const store = configureStore({
  reducer: {
    Data: Dataslice,
  },
})