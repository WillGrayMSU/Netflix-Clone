import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { fetchMovieTrailer } from '../store/actions/index';
import Modal from '../components/UI/Modal';
import MovieDetails from '../components/movie/MovieDetails';

class MovieGenre extends Component {
   state = {
      toggleModal: false,
   }

   handleToggleModal = () => {
      this.setState({ toggleModal: true });
   }

   closeModal = () => {
      this.setState({ toggleModal: false })
   }

   render() {
      let netflixUrl = false;
      if (this.props.url === "/discover/tv?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&with_networks=213") {
         netflixUrl = true;
      }

      return (
         <>
            <div onClick={() => this.handleToggleModal()}
               className={"movieShowcase__container--movie" + (netflixUrl ? "__netflix" : "")}>
               <img src={this.props.posterUrl} className="movieShowcase__container--movie-image" />
               <h2>{this.props.movieName}</h2>
            </div>
            <Modal show={this.state.toggleModal} movie={this.props.movie} modalClosed={this.closeModal}>
               <MovieDetails movie={this.props.movie} />
            </Modal>
         </>
      )
   }
}

const mapStateToProps = (state) => {
    return { trailer: state.video }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchMovieTrailer }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(MovieGenre);