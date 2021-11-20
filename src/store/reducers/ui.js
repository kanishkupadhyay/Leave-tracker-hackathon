import { createSlice, } from '@reduxjs/toolkit'


const initialState = {
    mode: '#dc0adcc7',
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
   setMode(state,){
    if (state.mode === "#dc0adcc7") {
        state.mode ="#1f1387c7";
      } else {
        state.mode ="#dc0adcc7";
      }
   }
  },
})

// Action creators are generated for each case reducer function
export const {setMode } = uiSlice.actions

export default uiSlice.reducer