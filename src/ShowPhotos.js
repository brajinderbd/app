import React, {Component} from "react";
import Header from "./Header";
import Footer from "./Footer";
import {connect} from 'react-redux';
import {getUsersAlbums, getPhotosOfTheUserFromAlbum} from './Api.js'
import './App.css';
import {Link} from "react-router-dom";


class ShowPhotos extends Component {

  state = {
    counter: 0,
    images: [],
  };

  componentDidMount() {

    const {userid} = this.fetchSearch();
    getUsersAlbums(userid);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    if (JSON.stringify(prevProps.photosInfo) !== JSON.stringify(this.props.photosInfo)) {
      this.pushPhotos(this.props.photosInfo);
    }
  }

  fetchSearch = () => {
    const params = new URLSearchParams(window.location.search);
    const userid = params.get('userid');
    const username = params.get('username');
    return {userid, username};
  };

  handleAlbumClick = (albumId, albumsInfo) => {
    getPhotosOfTheUserFromAlbum(albumId, albumsInfo);
  };

  pushPhotos = (photosInfo) => {
    console.log(photosInfo, 'info');
    const {counter} = this.state;
    const images = [];

    console.log(counter, 'counter');


    for (let i = 7 * counter; i < (photosInfo.length < (7 * (counter + 1)) ? photosInfo.length : (7 * (counter + 1))); i += 1) {
      console.log('loops');
      images.push(photosInfo[i]);
    }

    this.setState({
      images,
    })
  };

  render() {
    const {albumsInfo = [], photosInfo = [], loadingPhotos} = this.props;
    const {userid, username} = this.fetchSearch();
    const {counter, images = []} = this.state;
    return (
      <React.Fragment>
        <Header/>
        <div className="defaultContainer">
          Show Photos
        </div>
        <div style={{textAlign: 'center', backgroundColor: '#ffe680', padding: '2px'}}>No. of Albums of the user: <span
          style={{color: '#cc0000', fontWeight: 'bold'}}>{username}</span></div>
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '6px'}}>
          {albumsInfo.map((item) => {
            return (
              <div style={{
                borderRadius: '8px',
                padding: '8px',
                margin: '8px',
                border: '1px solid black',
                cursor: 'pointer'
              }}
                   onClick={() => this.handleAlbumClick(item.id, albumsInfo)}>
                Album ID: {item.id}

              </div>
            )
          })}
        </div>
        <div style={{textAlign: 'center', backgroundColor: '#808000', padding: '6px'}}>
          Pagination: [{counter + 1}/{Math.ceil(photosInfo.length / 7)}]
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
          <button style={{fontSize: '20px'}} onClick={() => {
            this.setState({counter: counter - 1}, () => {
              this.pushPhotos(photosInfo);
            })
          }} disabled={counter === 0}>Prev
          </button>
          <button style={{fontSize: '20px'}} onClick={() => {
            this.setState({counter: counter + 1}, () => {
              this.pushPhotos(photosInfo);
            })
          }} disabled={counter + 1 === Math.ceil(photosInfo.length / 7)}>Next
          </button>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', padding: '35px', minHeight:'488px'}}>
          {images.map((item) => {
            return (
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <span>({item.id})-Title: {`${item.title.substring(0, 5)}....`}</span>
                <img
                  style={{width: '200px', marginRight: '30px', marginBottom: '30px'}}
                  src={item.url}
                  alt='oops'

                />
              </div>

            )
          })}
        </div>
        <Footer/>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state => {
  // console.log(state, 'state inside in EditPost.js');
  return {
    albumsInfo: state.albumsInfo,
    photosInfo: state.photosInfo,
    loadingPhotos: state.loadingPhotos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateAlbumsInfo: (params) => dispatch({type: "updateAlbumsInfo", payload: params}),
    // onBodyUpdate: (params) => dispatch({type: "updateBody", payload: params})
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPhotos);