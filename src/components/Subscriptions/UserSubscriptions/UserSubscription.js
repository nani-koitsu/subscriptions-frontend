import React from "react";
import Spotify from "../../../assets/img/Spotify.png";
import "./Subscriptions.css";
import editIcon from "./svg/cycle.svg";
import actionIcon from "./svg/unread.svg";
// import { Image } from "cloudinary-react";

const UserSubscription = props => {
  return (
      <div className="subscription-row">
        <div className="image-container">
          {/* <Image cloudName="dg1xmeryg" publicId="dinnerly" /> */}
          <img
            src={`https://res.cloudinary.com/dg1xmeryg/image/upload/logos/#${props.name}.png`}
            className="sub-image"
            alt=""
          ></img>
        </div>
        <p className="sub-name">{props.subscriptionName}</p>
        <div className="spacer"></div>
        <div className="subscription-row-items">
          <ul>
            <li>{props.price}</li>
            <li>{props.subscriptionType}</li>
          </ul>
        </div>
        <button className="sub-button">
          <img src={editIcon} alt="edit-button" className="button-icon" />
        </button>
        <button className="sub-button">
          <img src={actionIcon} alt="action-button" className="button-icon" />
        </button>
      </div>
  );
};

export default UserSubscription;
