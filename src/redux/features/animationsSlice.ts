import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AnimationsState = {
  incrementalData: string[] | any,
  sortedArray: string[] | any,
  showSort: boolean,
  sortQuery:string,
}

const initialState = {
  incrementalData: [],
  sortedArray:[],
  showSort: false,
  sortQuery:'all'
} as AnimationsState

export const counter = createSlice({
  name:'animations',
  initialState,
  reducers: {
    setIncrementalData: (state, action:PayloadAction<string[]>) => {
      state.incrementalData = [...state.incrementalData,...action.payload]
    },
    setSorted : (state, action:PayloadAction<string[]>) => {
      state.sortedArray = action.payload
    },
    setSortQuery: (state, action:PayloadAction<string>) => {
      state.sortQuery = action.payload
    },
    setShowSort: (state) => {
      state.showSort = !state.showSort
    }
  }
})

export const {
  setIncrementalData,
  setSorted,
  setSortQuery,
  setShowSort
} = counter.actions
export default counter.reducer