import React, { Component } from "react";
import "../css/Subscriptions.css";
// import editIcon from "./svg/cycle.svg";
import actionIcon from "./svg/unread.svg";
import EditModal from "../containers/Modal/EditModal";

class Subscription extends Component {
  state = {
    isOpen: false,
    name: "",
    subscriptionName: "",
    subscriptionType: "",
    price: "",
    startDate: "",
    picture: "",
    id: "",
    daysPrior: ''
  };

  handleOnClick = () => {
    this.openModalHandler(this.props);
  };

  openModalHandler = (info) => {
    this.setState({
      isOpen: !this.state.isOpen,
      name: info.subscriptionName,
    });
  };

  closeModalHandler = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      name: "",
      picture: "",
    });
  };

  render() {
    return (
      <div className="subscription-row">
        <div className="image-container">
          <img
            src={this.props.picture}
            className="sub-image"
            alt={this.props.name}
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
}

export default Subscription;
