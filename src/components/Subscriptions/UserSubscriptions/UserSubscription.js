import React, { Component } from "react";
import Spotify from "../../../assets/img/Spotify.png";
import "./Subscriptions.css";
// import editIcon from "./svg/cycle.svg";
import actionIcon from "./svg/unread.svg";
// import { Image } from "cloudinary-react";

import EditModal from '../../containers/Modal/EditModal';

class UserSubscription extends Component {

  state = {
    isOpen: false,
    name: "",
    subscriptionName: '',
    subscriptionType: '',
    price: '',
    startDate: '',
    id: ''
  }
  
  handleOnClick = () => {
    this.openModalHandler(this.props)
  }

  openModalHandler = info => {
    this.setState({
      isOpen: !this.state.isOpen,
      name: info.subscriptionName,
    })
    
  }

  closeModalHandler = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      name: '',
      picture: ''
    });
  };

  render () {
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
        <p className="sub-name">{this.props.subscriptionName}</p>
        <div className="spacer"></div>
        <div className="subscription-row-items">
          <ul>
            <li>{this.props.price}</li>
            <li>{this.props.subscriptionType}</li>
          </ul>
        </div>
        {/* <button className="sub-button">
          <img src={editIcon} alt="edit-button" className="button-icon" />
        </button> */}
        <button className="sub-button" onClick={this.handleOnClick}>
          <img src={actionIcon} alt="action-button" className="button-icon" />
        </button>
        <EditModal
          openModalHandler={this.openModalHandler}
          isOpen={this.state.isOpen}
          closeModalHandler={this.closeModalHandler}
          info={this.props}
        />
      </div>
      );
    
  }
};

export default UserSubscription;
