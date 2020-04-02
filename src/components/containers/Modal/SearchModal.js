import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { addUserSubscription } from "../../../redux/action/subscriptionAction";
import "./ModalContainer.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement("#root");

class SearchModal extends React.Component {
  state = {
    startDate: new Date(),
    price: 0,
    subscriptionType: "",
    subscriptionName: ""
  };

  openModal = () => {
    this.props.openModalHandler();
  };
  closeModal = () => {
    this.props.closeModalHandler();
  };

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    console.log("MODALCONTAINER ON SUBMIT :", this.props.authUser.user.id);
    const {
      startDate,
      price,
      subscriptionType,
      subscriptionName,
      image
    } = this.state;

    const submitObj = {
      startDate,
      price,
      subscriptionType,
      subscriptionName,
      image,
      submittedBy: this.props.authUser.user.id
    };

    this.props
      .addUserSubscription(submitObj)
      .then(() => {
        this.setState({
          startDate: "",
          price: 0,
          subscriptionType: "",
          subscriptionName: ""
        });
        this.closeModal();
      })
      .catch(e => {
        console.log(e);
      });
    // console.log(this.state);
  };

  componentDidUpdate(prevProp, prevState) {
    if (prevProp.name !== this.props.name) {
      this.setState({
        subscriptionName: this.props.name
      });
    }
  }

  render() {
    return (
      <div>
        <Modal
          onClick={this.openModal}
          isOpen={this.props.isOpen}
          onRequestClose={this.closeModal}
          className='modal-container__search'
          contentLabel="Example Modal"
        >
          {this.props.isOpen ? (
            <>
              {" "}
              <h1>{this.props.name}</h1>
              <img
<<<<<<< HEAD:src/components/containers/Modal/ModalContainer.js
                className="search-image"
                src={this.props.picture}
=======
                className="modal-image"
                src={require(`../../../assets/img/${this.props.name}.png`)}
>>>>>>> 6f7ace8110c025751737ebea033db105f94410fa:src/components/containers/Modal/SearchModal.js
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
                <div className="custom-select" style={{ width: 200 }}>
                  <select name="subscriptionType" onChange={this.handleChange}>
                    <option value="0">Select Subscription:</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi Weekly">Bi Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
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

const mapStateToProps = state => {
  return {
    authUser: state.authUser,
    userSubscriptions: state.userSubscriptions,
    cloudinaryImages: state.cloudinaryImages
  };
};

export default connect(mapStateToProps, { addUserSubscription })(
  SearchModal
);