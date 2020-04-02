import React from "react";
import { connect } from "react-redux";
import "./SearchBar.css";
import SearchModal from "../containers/Modal/SearchModal";
class SearchBar extends React.Component {
  state = {
    searchSuggestions: [],
    isSelected: false,
    selected: "",
    isOpen: false,
    name: "",
    picture: ""
  };

  componentDidMount() {
    if (!this.props.authUser.isAuthenticated) {
      this.props.history.push("/signin");
    }
  }

  handleTextOnChange = e => {
    const value = e.target.value;
    let searchSuggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      searchSuggestions = this.props.authUser.subscriptionsList
        .sort()
        .filter(item => regex.test(item));
    }
    this.setState({ searchSuggestions, text: value });
  };

  handleOnClick = info => {
    this.openModalHandler(info);
    // const value = e.target.alt;
    // console.log(value);
    // this.setState({
    //   isSelected: true,
    //   selected: value
    // });
  };

  renderSearch = () => {
    const { searchSuggestions } = this.state;
    if (searchSuggestions.length === 0) {
      return null;
    }
    return (
      <ul className="sub-list">
        {searchSuggestions.map((item, index) => (
          <li
            className="sub-item"
            key={index}
            onClick={() =>
              this.handleOnClick({
                name: item,
                picture: `https://res.cloudinary.com/dg1xmeryg/image/upload/logos/${item}.png`
              })
            }
          >
            <img
              className="search-image"
              src={`https://res.cloudinary.com/dg1xmeryg/image/upload/logos/${item}.png`}
              alt={item}
            ></img>
            <p className="search-button">{item}</p>
          </li>
        ))}
      </ul>
    );
  };

  openModalHandler = info => {
    this.setState({
      isOpen: !this.state.isOpen,
      name: info.name,
      picture: info.picture
    });
    console.log(this.state)
  };

  closeModalHandler = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      name: "",
      picture: ""
    });
  };

  render() {
    return (
      <div className="search-container">
        <input
          onChange={this.handleTextOnChange}
          placeholder="Subscription Name"
          type="text"
          className="input-field"
        />

        {this.renderSearch()}
        <SearchModal
          openModalHandler={this.openModalHandler}
          isOpen={this.state.isOpen}
          closeModalHandler={this.closeModalHandler}
          name={this.state.name}
          picture={this.state.picture}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authUser: state.authUser
  };
};
export default connect(mapStateToProps, {})(SearchBar);
