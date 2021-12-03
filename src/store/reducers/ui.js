import { createSlice, } from '@reduxjs/toolkit'


const initialState = {
    mode: 'rgb(29, 29, 48)',
    isLoggedIn:localStorage.getItem('userInfo')?true:false,
    userName:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo'))[0].firstName:''
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
   },
   logOut(state){
    state.isLoggedIn = false
  },
  loggedIn(state){
    state.isLoggedIn = true
  },
  setUserName(state){
    state.userName = JSON.parse(localStorage.getItem('userInfo'))[0].firstName
  }
  },
})

// Action creators are generated for each case reducer function
export const {setMode, logOut,loggedIn,setUserName } = uiSlice.actions

export default uiSlice.reducer