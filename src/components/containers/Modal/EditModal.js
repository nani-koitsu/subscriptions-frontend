import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { deleteSubscriptionById, editSubscriptionById } from '../../../redux/action/subscriptionAction';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditModal extends Component {

    state = {
        startDate: new Date(this.props.info.startDate * 1000),
        price: this.props.info.price,
        subscriptionType: this.props.info.subscriptionType,
        subscriptionName: this.props.info.subscriptionName,
        image: this.props.info.picture,
        subID: this.props.info._id,
        daysPrior: this.props.info.daysPrior
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
        console.log(event.target);
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    deleteSub = () => {
        this.props.deleteSubscriptionById(this.state.subID)
            .then(() => {
                console.log("success")
                this.closeModal();
            })
            
    };

    onSubmit = (event) => {
        event.preventDefault();

        this.props.editSubscriptionById(this.state)
            .then(() => {
                this.closeModal()
            })
            .catch(error => {
                console.log(error)
            })
    };

    render() {
        return (
            <div className="edit-modal">
                <Modal
                    onClick={this.openModal}
                    isOpen={this.props.isOpen}
                    onRequestClose={this.closeModal}
                    className="modal-container__search"
                >
                    {this.props.isOpen ? (
                        <>
                            {" "}
                            <h1>{this.state.subscriptionName}</h1>
                            <img
                                className="modal-image"
                                src={this.state.image}
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
                                    <select
                                        name="subscriptionType"
                                        onChange={this.handleChange}
                                        defaultValue={this.state.subscriptionType}
                                    >
                                        <option value="0">Select Subscription:</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Bi Weekly">Bi Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select>
                                </div>
                                <label htmlFor="">Reminder days prior: </label>
                                    <div className="daysPrior" style={{ width: 200 }}>
                                    <select 
                                        name="daysPrior" 
                                        onChange={this.handleChange}
                                        defaultValue={this.state.daysPrior}
                                    >
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
                            <button onClick={this.deleteSub}>Delete Subscription</button>
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
        subscriptions: state.subscriptions
    };
};

export default connect(mapStateToProps, { deleteSubscriptionById, editSubscriptionById })(EditModal);
