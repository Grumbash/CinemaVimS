import React, { Component } from "react";
import { connect } from "react-redux";
import toggleModal from "../../actions/modals/isOpenAction";
class OpneModalButton extends Component {
  openModal = e => {
    e.preventDefault();
    this.props.dispatch(toggleModal(true));
  };

  render() {
    return (
      <div>
        {this.props.user.isAdmin && (
          <button
            type="button"
            className="btn btn-success"
            onClick={this.openModal}
          >
            <i className="fa fa-plus" /> <span>Add {this.props.text}</span>
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProps)(OpneModalButton);
