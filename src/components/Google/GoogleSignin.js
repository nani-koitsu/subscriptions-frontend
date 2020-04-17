import React, { Component } from "react";
import GoogleSvg from "./google-logo.svg";
import "./GoogleSignin.css";
class GoogleSignin extends Component {
  componentDidMount() {
    console.log("hello");
  }

  render() {
    return (
      <a
        className="custom-button"
        href='http://localhost:3001/users/authenticate/'
      >
        <img src={GoogleSvg} alt="google-signin" />
        <span>
          <div className="label">Sign In With Google</div>
        </span>
      </a>
    );
  }
}
export default GoogleSignin;
