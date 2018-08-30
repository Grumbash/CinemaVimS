import React from "react";
import { connect } from "react-redux";
import openDeleteModalAction from "../../actions/modals/openDeleteAction.js";
import "./deleteButton.css";

const DeleteButton = props => {
  const openModal = e => {
    props.openModal(props.id);
  };
  return (
    <button className="btn btn-danger delete-btn" onClick={openModal}>
      {" "}
      <i className="fa fa-times" />{" "}
    </button>
  );
};

const mapStateToProps = state => ({
  openDeleteModal: state.modal
});

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => {
      dispatch(openDeleteModalAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteButton);
