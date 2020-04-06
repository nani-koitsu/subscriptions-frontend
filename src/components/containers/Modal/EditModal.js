import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditModal extends Component {
    constructor(props) {
        super(props)
        // let date = parse(props.info.startDate)

        // console.log(date)
        this.state = {
            startDate: new Date(),
            price: props.info.price,
            subscriptionType: props.info.subscriptionType,
            subscriptionName: props.info.subscriptionName,
            image: ''
        }
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
        });
    };

    render() {
        console.log(this.props)
        return (
            <div className="edit-modal">
                <Modal
                    onClick={this.openModal}
                    isOpen={this.props.isOpen}
                    onRequestClose={this.closeModal}
                    className='modal-container__search'
                >
                    {this.props.isOpen ? (
                        <>
                            {" "}
                            <h1>{this.state.subscriptionName}</h1>
                            <img
                                className="modal-image"
                                src={require(`../../../assets/img/${this.state.subscriptionName}.png`)}
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
                                    value={this.state.subscriptionName}
                                    onChange={this.handleChange}
                                />
                                <br />
                                <label htmlFor="">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    defaultValue={this.state.price}
                                    onChange={this.handleChange}
                                />
                                <br />
                                <label htmlFor="">Type of Subscription </label>
                                <div className="custom-select" style={{ width: 200 }}>
                                    <select name="subscriptionType" onChange={this.handleChange}
                                        defaultValue={this.state.subscriptionType}>
                                        <option value="0">Select Subscription:</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Bi Weekly">Bi Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select>
                                </div>
                                <button type='submit'>Submit</button>{" "}
                                <button onClick={this.closeModal}>Cancel</button>
                            </form>
                            <button>Delete Subscription</button>
                        </>
                    ) : ''}
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authUser: state.authUser
    };
};

export default connect(mapStateToProps, null)(EditModal)