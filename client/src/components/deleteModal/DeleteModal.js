import React, { Component } from "react";
import closeDelete from "../../actions/modals/closeDeleteAction";
import remove from "../../actions/deleteAction";
import { connect } from "react-redux";

export class DeleteModal extends Component {
  removeOnClick = e => {
    this.props.remove(
      this.props.path,
      this.props.purposeOfRemoval,
      this.props.goBack,
      this.props.pathToBack
    );
  };
  render() {
    if (this.props.purposeOfRemoval) {
      return (
        <div className="modal-dialog modal-dialog-centered modal-react">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Delete{" "}
                {this.props.purposeOfRemoval.name ||
                  this.props.purposeOfRemoval.title ||
                  "this"}{" "}
                ?
              </h5>
              <button
                type="button"
                className="close"
                onClick={this.props.closeModal}
              >
                <span aria-hidden="true">
                  <i className="fa fa-times" />
                </span>
              </button>
            </div>
            <div className="modal-body" />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.props.closeModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.removeOnClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    }

    return "";
  }
}

const mapStateToProps = state => ({
  modal: state.modals.isDeleteOpen
});

const mapDispatchToProps = dispatch => {
  return {
    remove: (path, target, push, pushPath) => {
      dispatch(remove(path, target, push, pushPath));
    },
    closeModal: () => {
      dispatch(closeDelete());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteModal);
