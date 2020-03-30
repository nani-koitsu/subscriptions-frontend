import React from "react";
import Spotify from "../../../assets/img/Spotify.png";
import "./Subscriptions.css";
import editIcon from "./svg/cycle.svg";
import actionIcon from "./svg/unread.svg";

const UserSubscription = props => {
  return (
    <div className="subscription-container">
      <div className="subscription-row">
        <div className="image-container">
          <img src={Spotify} className="sub-image"></img>
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
    </div>
  );
};

export default UserSubscription;
