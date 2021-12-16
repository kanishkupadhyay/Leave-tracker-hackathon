import { createSlice, } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
  mode: 'rgb(29, 29, 48)',
  isLoggedIn: localStorage.getItem('userInfo') ? true : false,
  userName: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))[0].firstName : '',
  userRole: localStorage.getItem('role'),
  employeeData: []
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMode(state,) {
      if (state.mode === "rgb(29, 29, 48)") {
        state.mode = "#1f1387c7";
      } else {
        state.mode = "rgb(29, 29, 48)";
      }
    },
    logOut(state) {
      state.isLoggedIn = false
    },
    loggedIn(state) {
      state.isLoggedIn = true
    },
    setUserName(state) {
      state.userName = JSON.parse(localStorage.getItem('userInfo'))[0].firstName
    },
    setRole(state) {
      state.userRole = localStorage.getItem('role')
    },
    updateData(state) {
      let userData = []
      axios.get("https://leave-tracker-backend.herokuapp.com/employee?role=employee").then((data) => {
         userData = data.data
      }).catch((e) => console.log(e))
      state.employeeData = userData
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMode, logOut, loggedIn, setUserName, userRole, setRole, updateData } = uiSlice.actions

export default uiSlice.reducer