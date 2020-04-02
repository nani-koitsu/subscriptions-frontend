import React from "react";
import { connect } from "react-redux";
import "./SearchBar.css";
import ModalContainer from "../containers/Modal/ModalContainer";
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
      let searchableKeys = Object.keys(
        this.props.cloudinaryImages.cloudinaryList
      );
      searchSuggestions = searchableKeys
        .sort()
        .filter(item => regex.test(item));
    }
    this.setState({ searchSuggestions, text: value });
  };

  handleOnClick = info => {
    this.openModalHandler(info);
  };

  renderSearch = () => {
    const { cloudinaryList } = this.props.cloudinaryImages;
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
                picture: cloudinaryList[`${item}`]
              })
            }
          >
            <img
              className="search-image"
              src={cloudinaryList[`${item}`]}
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
  };

  closeModalHandler = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      name: "",
      picture: ""
    });
  };

  render() {
    // console.log(
    //   "searched with array",
    //   this.props.cloudinaryImages.cloudinaryList["adobe"]
    // );
    // console.log(Object.keys(this.props.cloudinaryImages.cloudinaryList));
    return (
      <div className="search-container">
        <input
          onChange={this.handleTextOnChange}
          placeholder="Subscription Name"
          type="text"
          className="input-field"
        />

        {this.renderSearch()}
        <ModalContainer
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
    authUser: state.authUser,
    cloudinaryImages: state.cloudinaryImages
  };
};
export default connect(mapStateToProps, {})(SearchBar);
