import React from "react";
import Spotify from "../../../assets/img/Spotify.png";
import "./Subscriptions.css";
import editIcon from "./svg/cycle.svg";
import actionIcon from "./svg/unread.svg";

const trackedSubscription = props => (
  <>
    <div className="subscription-container">
      <div className="subscription-row">
        <div className="image-container">
          <img src={Spotify} alt="NetflixLogo" className="sub-image"></img>
        </div>
        <p className="sub-name">Spotify</p>
        <div className="spacer"></div>
        <div className="subscription-row-items">
          <ul>
            <li>Monthly</li>
            <li>Renews on Mar 25 2020</li>
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
  </>
);

export default trackedSubscription;
