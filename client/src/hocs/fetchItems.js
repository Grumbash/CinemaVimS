import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import getData from "../actions/fetchActionCombine";

export const mapStateToProps = state => ({
  fullState: { ...state }
});

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export const fetchItems = (WrappedComponent, propName) => {
  class withData extends Component {
    getInfoToDispatch = (get, load, not_found, path) => {
      getData(get, load, not_found, path)(this.props.dispatch);
    };

    render() {
      return (
        <WrappedComponent
          field={this.props.fullState[propName]}
          getInfo={this.getInfoToDispatch}
        />
      );
    }
  }
  withData.propTypes = { fullState: PropTypes.object.isRequired };

  withData.displayName = `withData(${getDisplayName(WrappedComponent)})`;

  return withData;
};

export default (WrapperComponent, propName) =>
  connect(mapStateToProps)(fetchItems(WrapperComponent, propName));
