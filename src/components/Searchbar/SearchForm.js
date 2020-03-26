import React, { Component } from "react";

class SearchForm extends Component {
  render() {
    console.log("SEARCH FORM", this.props);
    return <div>{this.props.itemName}</div>;
  }
}

export default SearchForm;

//random change
