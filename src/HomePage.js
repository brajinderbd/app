import React, {Component, useEffect, useState} from "react";
import logo from './ziggle-tech.jpg';
import {getUsersApi} from './Api'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Carousel from './carousel.js';


class HomePage extends Component {

  componentDidMount() {
    console.log(this.props, 'mount props');
    getUsersApi();
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps, 'prev-props');
    console.log(this.props, 'new props');
  }

  handleClick = () => {
    console.log('handle click');
  };

  // useEffect(() => {
  //   console.log('useEffect');
  //   // getUsersApi();
  // });

  render() {
    const {userInfo = []} = this.props || {};
    return (
      <React.Fragment>

        <div className="defaultContainer">
          Home Page
        </div>
        <Carousel/>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '20px'}}>
          <img src={logo} style={{width: '500px'}} alt="oops"/>
          <div style={{maxWidth: '550px'}}>Strategy, Design & Technology Services Agency.
            We are an award-winning digital transformation agency. We provide strategy, design and technology services
            to mid-level enterprises.
          </div>
        </div>
        <div style={{
          textAlign: 'center',
          backgroundColor: '#ffd699',
          padding: '4px',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>USER
          DETAILS:
        </div>
        <div
          style={{display: 'flex', flexWrap: 'wrap', padding: '6px', marginBottom: '100px'}}>
          {
            userInfo.map((item) => {
              return (
                <div key={item.id} style={{
                  margin: '8px',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid black',
                  borderRadius: '8px'
                }}>
                  <div>
                    name: {item.name}
                  </div>
                  <div>
                    Email: {item.email}
                  </div>
                  <div>
                    UserName: {item.username}
                  </div>
                  <div style={{marginTop: '10px'}}>
                    <Link to={`/editpost?userid=${item.id}&username=${item.username}`}>
                      <button style={{backgroundColor: '#ff7733'}} onClick={this.handleClick}>
                        Edit Post
                      </button>
                    </Link>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div>
        </div>
      </React.Fragment>
    )
  }

}


const mapStateToProps = state => {
  console.log(state, 'state inside in HomePage.js');
  return {
    userInfo: state.userInfo,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     onAgeUp: () => dispatch({type: "abc", value: 1}),
//     onAgeDown: () => dispatch({type: "AGE_DOWN", value: 1})
//   };
// };
export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(HomePage);