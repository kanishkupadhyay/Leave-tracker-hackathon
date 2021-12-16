import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loggedIn, setUserName, setRole } from '../store/reducers/ui'
import { useDispatch } from "react-redux";


export default function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = () => {
    const result = `https://leave-tracker-backend.herokuapp.com/employee?email=${email}&password=${password}`;
    return axios.get(result);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (email && password) {
      let result;
      fetchData().then((data) => {
        result = data.data;
        if (result.length) {
          localStorage.setItem('role', result[0].role)
          localStorage.setItem('userInfo', JSON.stringify(result))
          setShowErrorMsg(false);
          setShowSuccess(true);
          dispatch(loggedIn());
          dispatch(setUserName());
          dispatch(setRole())
          if (localStorage.getItem('role') === 'hr') {
            setTimeout(() => {
              navigate('/employees')
            }, 500);
          } else {
            setTimeout(() => {
              navigate('/my-info')
            }, 500);
          }
          setTimeout(() => {
            setShowSuccess(false);
          }, 3000);
        } else {
          setUserFound(true)
          setTimeout(() => {
            setUserFound(false)
          }, 3000);
        }
      });
    } else {
      setShowErrorMsg(true);
      setTimeout(() => {
        setShowErrorMsg(false);
      }, 3000);
      setShowSuccess(false);
    }
  };

  return (
    <>
      <div
        class="error-notice"
        style={{ display: showErrorMsg ? "block" : "none" }}>
        <div class="onerror danger">
          <strong>Error</strong>- Please Fill up the form
        </div>
      </div>

      <div
        class="error-notice"
        style={{ display: userFound ? "block" : "none" }}>
        <div class="onerror danger">
          <strong>Error</strong>- {props.errorMessage}
        </div>
      </div>

      <div
        class="error-notice"
        style={{ display: showSuccess ? "block" : "none" }}>
        <div class="onerror success">
          <strong>Success</strong>- {props.successMessage}
        </div>
      </div>
      <div className="login">
        <form className="form" onSubmit={submitForm}>
          <h2>{props.title}</h2>
          <input type="email" placeholder="Username" onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" placeholder="Password" minLength="8" maxLength="15" onChange={(e) => setPassword(e.target.value)}
          />
          <input style={{ background: props.mode }} type="submit" value={props.buttonValue} className="submit"/>
          <div className="mt-3 dont-have-account">
            <span>{props.footerText} </span>
            <Link to="/sign-up">{props.buttonValue}</Link>
          </div>
        </form>
      </div>
    </>
  );
}

Login.defaultProps = {
  title: "Login",
  buttonValue: "Sign up",
  footerText: `Don't have an account?`,
  successMessage: 'Logged in successfully',
  errorMessage: 'Invalid Credentials'
};
