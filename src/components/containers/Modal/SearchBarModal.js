import React from "react";

const SearchBarModal = props => {
  return (
    <>
      <div>I am a modal</div>
      <form>
        <button onClick={props.closeModal}>close</button>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </>
  );
};
export default SearchBarModal;
