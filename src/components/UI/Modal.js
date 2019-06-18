import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { fetchMovieTrailer } from '../../store/actions/index';
import Aux from '../../hoc/Aux';
import Backdrop from './Backdrop'
import YouTube from 'react-youtube';


class Modal extends Component {

    componentDidUpdate(prevProps) {
        if( this.props.show ) {
            this.props.fetchMovieTrailer(this.props.movie.id);
        }
    }

    render() {

    const backgroundStyle = {
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.props.movie.backdrop_path || this.props.movie.poster_path})`,
        display: "flex",
        "flex-direction": "row"
    }
    
    let hasTrailer = false;
    if (this.props.show && this.props.trailer) {
        hasTrailer = true;
    }

    //const trailerURl = `https://www.youtube.com/watch?v=${props.movie.}`;

    return (
        <Aux>
            <Backdrop show={this.props.show} toggleBackdrop={this.props.modalClosed} />
            <div
                style={backgroundStyle}
                className={(this.props.show ? "modal show" : "modal hide")}>
                {this.props.children}
                {hasTrailer && 
                    <div className="trailer">
                        <YouTube
                            videoId={this.props.trailer}
                            opts = {{
                                height: '521',
                                width: '1250',
                                playerVars: { // https://developers.google.com/youtube/player_parameters
                                autoplay: 1,
                                controls: 0,
                                disablekb: 1,
                                modestbranding: 1
                                    }
                                }}
                        />
                    </div>
                }
            </div>
        </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return { trailer: state.trailer.video }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchMovieTrailer }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Modal);
