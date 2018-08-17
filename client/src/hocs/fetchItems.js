import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const mapStateToProps = state => ({
  fullState: { ...state }
});

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export const fetchItems = (WrappedComponent, propName) => {
  class withData extends Component {
    sendRequest = fetchData => {
      fetchData(this.props.dispatch);
    };

    render() {
      const props = { ...this.props };
      delete props.fullState;

      return (
        <WrappedComponent
          field={this.props.fullState[propName]}
          fetchData={this.sendRequest}
          {...props}
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
