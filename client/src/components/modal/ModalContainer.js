import React, { Component } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import toggleModal from "../../actions/modals/isOpenAction";
import Modal from "./Modal";
import ShowsModal from "./ShowsModal";
import postTheaterAction from "../../actions/theater/postTheaterAction";
import postMovieAction from "../../actions/movie/postMovieAction";
import postShowAction from "../../actions/show/postShowAction";

class ModalContainer extends Component {
  constructor(props) {
    super(props);

    this.propsToTheater = ["name", "city"];
    this.propsToMovie = ["title", "duration"];
    this.propsToShow = ["movieId", "hallId", "date"];
    this.propsToHall = ["No"];
  }

  closeModal = e => {
    this.props.dispatch(toggleModal(false));
  };

  render() {
    switch (this.props.current) {
      case "theaters":
        return createPortal(
          <Modal
            postAction={postTheaterAction}
            title={this.props.current}
            path={this.props.path}
            closeModal={this.closeModal}
            inputFields={this.propsToTheater}
            modal={this.props.state.modals}
            dispatch={this.props.dispatch}
          />,
          document.getElementById("portals")
        );
      case "movies":
        return createPortal(
          <Modal
            postAction={postMovieAction}
            title={this.props.current}
            path={this.props.path}
            closeModal={this.closeModal}
            inputFields={this.propsToMovie}
            modal={this.props.state.modals}
            dispatch={this.props.dispatch}
          />,
          document.getElementById("portals")
        );
      case "shows":
        return createPortal(
          <ShowsModal
            postAction={postShowAction}
            title={this.props.current}
            path={this.props.path}
            closeModal={this.closeModal}
            inputFields={this.propsToShow}
            modal={this.props.state.modals}
            dispatch={this.props.dispatch}
            movies={this.props.state.movies}
            theaters={this.props.state.theaters}
            halls={this.props.state.halls}
          />,
          document.getElementById("portals")
        );
      case "halls":
        return createPortal(
          <Modal
            postAction={() => console.log(this.props.path)}
            title={this.props.current}
            path={this.props.path}
            closeModal={this.closeModal}
            inputFields={this.propsToHall}
            modal={this.props.state.modals}
            dispatch={this.props.dispatch}
          />,
          document.getElementById("portals")
        );
      default:
        return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps)(ModalContainer);
