import { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Leaves from "./components/Leaves";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Sign-up";
import Error from './components/Error'
import { useSelector, useDispatch } from "react-redux";
import { setMode } from "./store/reducers/ui";
function App() {
  const { mode } = useSelector((store) => store.ui);
  const dispatch = useDispatch();
  const toggleMode = () => {
    dispatch(setMode());
  };
  var session_token=localStorage.getItem('userInfo')
  return (
    <Router>
      <>
        <Navbar mode={{ background: mode }} toggleMode={toggleMode} />
        <Routes>
          <Route exact path="/" element={<Home mode={mode} />}></Route>
          <Route exact path="/home" element={<Home mode={mode} />}></Route>
          <Route
            exact
            path="/employees"
            element={session_token?<Leaves mode={mode} />:<Login mode={mode} />}
          ></Route>
          <Route exact path="/login" element={<Login mode={mode} />}></Route>
          <Route exact path="/sign-up" element={<SignUp mode={mode} />}></Route>
          <Route exact path="*" element={<Error />}></Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
