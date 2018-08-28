import React, { Component } from "react";
import modalHOC from "../../hocs/modal";
import Modal from "./Modal";

class ModalContainer extends Component {
  constructor(props) {
    super(props);

    this.propToModalView = null;
  }

  componentWillMount() {
    const arrOfProps = Object.keys(
      this.props.state[this.props.path.slice(1, this.props.path.length)]
        .payload[0]
    );
    // eslint-disable-next-line
    this.propToModalView = arrOfProps.filter(propName => {
      if (propName !== "_id" && propName !== "__v") return propName;
    });
  }

  render() {
    return (
      <div>
        <Modal
          path={this.props.path}
          closeModal={this.props.closeModal}
          postData={this.props.postData}
          inputFields={this.propToModalView}
        />
      </div>
    );
  }
}

export default modalHOC(ModalContainer);
