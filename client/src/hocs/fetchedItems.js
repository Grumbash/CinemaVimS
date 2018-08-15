import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const mapStateToProps = state => ({});

export const mapDispatchToProps = {};

export const hocComponentName = WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.propTypes = {};

  return hocComponent;
};

export default WrapperComponent =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(hocComponentName(WrapperComponent));
