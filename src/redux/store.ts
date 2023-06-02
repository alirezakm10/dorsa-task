import { configureStore } from "@reduxjs/toolkit"
import counterReducer from './features/counterSlice'
import animationsReducer from './features/animationsSlice'
import { animationsApi } from './services/animationsApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
  reducer: {
    counterReducer,
    animations: animationsReducer,
    [animationsApi.reducerPath]:animationsApi.reducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([animationsApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
