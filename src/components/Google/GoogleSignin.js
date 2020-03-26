import React, { Component } from "react";
import GoogleSvg from "./google-logo.svg";
import "./GoogleSignin.css";
class GoogleSignin extends Component {
  componentDidMount() {
    console.log("hello");
  }

  render() {
    return (
      <button className="custom-button">
        <img src={GoogleSvg} alt="google-signin" />
        <span>
          <div className="label">Sign In With Google</div>
        </span>
      </button>
    );
  }
}
export default GoogleSignin;
