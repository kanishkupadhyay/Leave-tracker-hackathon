import React from "react";
import { Link } from "react-router-dom";
export default function Login(props) {
  return (
    <>
      <div className="login">
        <div className="form">
          <h2>{props.title}</h2>
          <input type="email" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <input style={{background:props.mode}} type="submit" value={props.buttonValue} className="submit" />
          <div className="mt-3 dont-have-account">
             <span>{props.footerText} </span>
             <Link to="/sign-up">{props.buttonValue}</Link>
              </div>
        </div>
      </div>
    </>
  );
}
Login.defaultProps = {
   title:'Login',
   buttonValue:'Sign In',
   footerText:`Don't have an account`
}