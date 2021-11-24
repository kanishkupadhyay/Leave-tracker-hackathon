import { createSlice, } from '@reduxjs/toolkit'


const initialState = {
    mode: 'rgb(29, 29, 48)',
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
   setMode(state,){
    if (state.mode === "rgb(29, 29, 48)") {
        state.mode ="#1f1387c7";
      } else {
        state.mode ="rgb(29, 29, 48)";
      }
   }
  },
})

// Action creators are generated for each case reducer function
export const {setMode } = uiSlice.actions

export default uiSlice.reducer