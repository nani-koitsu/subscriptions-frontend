import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import "./ModalContainer.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     width: '500px',

//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)"
//   }
// };

Modal.setAppElement("#root");
class ModalContainer extends React.Component {
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

  onSubmit = e => {
    e.preventDefault();
    console.log(this.props.subscription);
    let { createdBy } = this.props.authUser.user.id;
    const { startDate, price, subscriptionType, subscriptionName } = this.props;
    const submitObj = {
      startDate,
      price,
      subscriptionType,
      subscriptionName,
      createdBy
    };
    this.props
      .addUserSubscription(submitObj)
      .then(() => {
        this.setState({
          startDate: new Date(),
          price: 0,
          subscriptionType: "",
          subscriptionName: ""
        });
      })
      .catch(e => {
        console.log(e);
      });
    console.log(this.state);
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
          style={customStyles}
          contentLabel="Example Modal"
        >
          {this.props.isOpen ? (
            <>
              {" "}
              <h1>{this.props.name}</h1>
              <img
                className="search-image"
                src={require(`../../../assets/img/${this.props.name}.png`)}
                alt={this.props.name}
              ></img>
              <form onSubmit={this.onSubmit}>
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
                    <option value="Montly">Montly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <button>Submit</button>{" "}
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
    userSubscriptions: state.userSubscriptions
  };
};

export default connect(mapStateToProps, { addUserSubscription })(
  ModalContainer
);
