import * as axios from "axios";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp(props) {
  const URL = "https://leave-tracker-backend.herokuapp.com/employee";
  const [radio, setRadio] = useState("hr");
  const [showPassword, setShowPassword] = useState(false);
  const [eyeSlash, setEyeSlash] = useState(true);
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate();
  const [inputField, setInputField] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    leave: "",
  });
  const onSubmitForm = (event) => {
    event.preventDefault();
    if (
      inputField.firstName &&
      inputField.lastName &&
      inputField.phone &&
      inputField.email &&
      inputField.password
    ) {
      axios
        .post(URL, { ...inputField, role: radio, leave: 2 })
        .then((res) => console.log(res.data))
        .catch((e) => console.log(e));
        setShowErrorMsg(false)
        setShowSuccess(true)
        setTimeout(() => {
          navigate('/login')
        }, 500);
        setTimeout(() => {
          setShowSuccess(false)
        }, 3000);
    
    }else {
      setShowErrorMsg(true)
      setTimeout(() => {
        setShowErrorMsg(false)
      }, 3000);
    }
  };

  const inputsHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputField({ ...inputField, [name]: value });
  };

  const onNumberOnlyChange = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const isValid = new RegExp("[0-9]").test(keyValue);
    if (!isValid) {
      setShowErrorMsg(true)
     setTimeout(() => {
      setShowErrorMsg(false)
     }, 3000);
      event.preventDefault();
      return;
    }
  };

  const removeWhiteSpace = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    }
  };

  const toggleEyeIcon = () => {
    if (showPassword) {
      setEyeSlash(true);
      setShowPassword(false);
    } else {
      setShowPassword(true);
      setEyeSlash(false);
    }
  };
  return (
    <>
      <div class="error-notice" style={{display:showErrorMsg?'block':'none'}}>
        <div class="onerror danger">
          <strong>Error</strong>- Please Fill up the form
        </div>
      </div>

      <div class="error-notice" style={{display:showSuccess?'block':'none'}}>
        <div class="onerror success">
          <strong>Success</strong>- Sign in  successfully
        </div>
      </div>

      <div className="login">
        <form className="form" onSubmit={onSubmitForm}>
          <h2 className="mt-0 mb-0">Sign up</h2>
          <input
            className="mt-2 sign-up"
            name="firstName"
            maxLength="10"
            onKeyDown={removeWhiteSpace}
            value={inputField.firstName}
            onChange={inputsHandler}
            type="text"
            placeholder="First Name"
          />
          <input
            className="mt-2 sign-up"
            name="lastName"
            maxLength="10"
            onKeyDown={removeWhiteSpace}
            onChange={inputsHandler}
            value={inputField.lastName}
            type="text"
            placeholder="Last Name"
          />
          <input
            className="mt-2 sign-up"
            name="email"
            onKeyDown={removeWhiteSpace}
            onChange={inputsHandler}
            type="email"
            placeholder="Email"
          />
          <input
            className="mt-2 sign-up"
            name="phone"
            maxLength="10"
            minLength="10"
            onKeyPress={onNumberOnlyChange}
            onChange={inputsHandler}
            type="text"
            placeholder="Phone"
          />
          <input
            className="mt-2 sign-up password-input"
            name="password"
            maxLength="15"
            minLength="8"
            onKeyDown={removeWhiteSpace}
            onChange={inputsHandler}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <div className="eye-icon-container">
            <svg
              onClick={toggleEyeIcon}
              style={{ display: eyeSlash ? "block" : "none" }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye-slash"
              viewBox="0 0 16 16"
            >
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
            </svg>
            <svg
              onClick={toggleEyeIcon}
              style={{ display: eyeSlash ? "none" : "block" }}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
          </div>
          <input
            style={{ display: "none" }}
            type="radio"
            id="rdo1"
            checked
            value="hr"
            className="radio-input"
            name="role"
            onChange={(e) => setRadio(e.target.value)}
          />
          <label htmlFor="rdo1" className="radio-label mt-4">
            {" "}
            <span className="radio-border"></span>HR{" "}
          </label>

          <input
            style={{ display: "none" }}
            type="radio"
            value="employee"
            id="rdo3"
            className="radio-input"
            name="role"
            onChange={(e) => setRadio(e.target.value)}
          />
          <label htmlFor="rdo3" className="radio-label mt-3">
            <span className="radio-border"></span>Employee{" "}
          </label>
          <input
            style={{ background: props.mode }}
            type="submit"
            value={props.buttonValue}
            className="submit mt-4"
          />
          <div className="mt-3 dont-have-account">
            <span>Already have an account </span>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </>
  );
}
