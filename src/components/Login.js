import axios from "axios";
import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const URL = `https://leave-tracker-backend.herokuapp.com/employee?role=employee&email=kanishk.upadhyay@codinova.com`;
  const [emp, setEmployee] = useState([]);
  const navigate = useNavigate();

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
          localStorage.setItem('role',result[0].role)
          localStorage.setItem('userInfo',JSON.stringify(result))
          setShowErrorMsg(false);
          setShowSuccess(true);
          setTimeout(() => {
            navigate('/employees')
          }, 500);
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
        style={{ display: showErrorMsg ? "block" : "none" }}
      >
        <div class="onerror danger">
          <strong>Error</strong>- Please Fill up the form
        </div>
      </div>

      <div
        class="error-notice"
        style={{ display: userFound ? "block" : "none" }}
      >
        <div class="onerror danger">
          <strong>Error</strong>- User not found
        </div>
      </div>

      <div
        class="error-notice"
        style={{ display: showSuccess ? "block" : "none" }}
      >
        <div class="onerror success">
          <strong>Success</strong>- Sign in successfully
        </div>
      </div>
      <div className="login">
        <form className="form" onSubmit={submitForm}>
          <h2>{props.title}</h2>
          <input
            type="email"
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            minLength="8"
            maxLength="15"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            style={{ background: props.mode }}
            type="submit"
            value={props.buttonValue}
            className="submit"
          />
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
  buttonValue: "Sign In",
  footerText: `Don't have an account`,
};
