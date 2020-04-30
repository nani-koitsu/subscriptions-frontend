import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { addUserSubscription } from "../../../redux/action/subscriptionAction";
import "../../css/ModalContainer.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement("#root");

class SearchModal extends React.Component {
  state = {
    startDate: new Date(),
    price: 0,
    subscriptionType: "",
    subscriptionName: "",
    picture: "",
    daysPrior: '1'
  };

  openModal = () => {
    this.props.openModalHandler();
  };
  closeModal = () => {
    this.props.closeModalHandler();
  };

  handleDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = async (e) => {
    // console.log(`before submit`, this.state);
    e.preventDefault();
    // console.log(`after submit`, this.state);
    // console.log("MODALCONTAINER ON SUBMIT :", this.props.authUser.user.id);
    const {
      startDate,
      price,
      subscriptionType,
      subscriptionName,
      picture,
      daysPrior
    } = this.state;

    const submitObj = {
      startDate,
      price,
      subscriptionType,
      subscriptionName,
      picture,
      submittedBy: this.props.authUser.user.id,
      daysPrior
    };

    this.props
      .addUserSubscription(submitObj)
      .then(() => {
        this.setState({
          startDate: new Date(),
          price: 0,
          subscriptionType: "",
          subscriptionName: "",
          picture: "",
          daysPrior: '1'
        });
        this.closeModal();
      })

      .catch((e) => {
        console.log(e);
      });
  };

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.name !== this.props.name) {
      this.setState({
        subscriptionName: this.props.name,
        picture: this.props.picture,
      });
      console.log("picture ===", this.props.picture);
    }
  }

  render() {
    return (
      <div>
        <Modal
          onClick={this.openModal}
          isOpen={this.props.isOpen}
          onRequestClose={this.closeModal}
          className="modal-container__search"
          contentLabel="Example Modal"
        >
          {this.props.isOpen ? (
            <>
              {" "}
              <h1>{this.props.name}</h1>
              <img
                className="modal-image"
                src={this.props.picture}
                alt={this.props.name}
              ></img>
              <form onSubmit={this.onSubmit} className="form-info">
                <label htmlFor="">Due Date</label>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleDateChange}
                />
                <br />
                <label htmlFor="">Subscription Name</label>
                <input
                  type="text"
                  name="subscriptionName"
                  value={this.props.name}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="">Price</label>
                <input
                  type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
                <br />
                <label htmlFor="">Type of Subscription </label>
                <div className="custom-select" style={{ width: 175 }}>
                  <select name="subscriptionType" onChange={this.handleChange}>
                    <option value="0">Select Subscription:</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi Weekly">Bi Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <label htmlFor="">Reminder days prior: </label>
                <div className="daysPrior" style={{ width: 200 }}>
                  <select name="daysPrior" onChange={this.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <button type="submit">Submit</button>{" "}
                <button onClick={this.closeModal}>Cancel</button>
              </form>
            </>
          ) : (
            ""
          )}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authUser,
    userSubscriptions: state.userSubscriptions,
    cloudinaryImages: state.cloudinaryImages,
  };
};

export default connect(mapStateToProps, { addUserSubscription })(SearchModal);
