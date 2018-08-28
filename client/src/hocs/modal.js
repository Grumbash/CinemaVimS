import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import toggleModal from "../actions/modals/isOpenAction";
import postTheaterAction from "../actions/theater/postTheaterAction";

const mapStateToProps = state => ({
  state
});

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export const modal = (WrappedComponent, propName) => {
  class modal extends Component {
    sendRequest(path, payload) {
      postTheaterAction(path)(payload)(this.props.dispatch);
    }

    closeModal = e => {
      e.preventDefault();
      this.props.dispatch(toggleModal(false));
    };

    render() {
      return createPortal(
        <WrappedComponent
          postData={this.sendRequest}
          closeModal={this.closeModal}
          {...this.props}
        />,
        document.getElementById("portals")
      );
    }
  }
  modal.propTypes = { state: PropTypes.object.isRequired };

  modal.displayName = `modal(${getDisplayName(WrappedComponent)})`;

  return modal;
};

export default (WrapperComponent, propName) =>
  connect(mapStateToProps)(modal(WrapperComponent, propName));
