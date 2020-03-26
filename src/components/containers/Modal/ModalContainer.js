import React from "react";
import Modal from "react-modal";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: '500px',

    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

export default class ModalContainer extends React.Component {

  state = {
    startDate: new Date(),
    price: 0,
    subscriptionType: ''
  }

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
    })
  }


  onSubmit = e => {
    e.preventDefault();
    console.log(this.state)
  }
  render() {
    let name = '';
   
    if (this.props.info !== null) {
      name = this.props.info.name;
    }

    return (
      <div>
      <Modal
        onClick={this.openModal}
        isOpen={this.props.isOpen}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {
          this.props.isOpen ? ( <> <h1>{name}</h1>
            <img
                  className="search-image"
                  src={require(`../../../assets/img/${name}.png`)}
                  alt={name}
                ></img>
                <form onSubmit={this.onSubmit}>
                <label htmlFor="">Due Date</label>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleDateChange}
                  />
                  <br />
                  <label htmlFor="">Price</label>
                  <input type="number" name='price' value={this.state.price} onChange={this.handleChange} />
                  <br />
                  <label htmlFor="">Type of Subscription </label>
                  <div className="custom-select" style={{width:200}}>
                    <select name='subscriptionType' onChange={this.handleChange}>
                      <option value="0">Select Subscription:</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Bi Weekly">Bi Weekly</option>
                      <option value="Montly">Montly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                  <button>Submit</button> <button onClick={this.closeModal}>Cancel</button>
                </form>
                </>

                ) : ''
        }
      </Modal>
    </div>
    )
  }
}
