import React, {Component} from 'react';
import HomePage from "./HomePage";
import Header from "./Header";
import Footer from "./Footer";

class Protected extends Component {

  render() {
    return (
      <React.Fragment>
        <Header/>
        <HomePage/>
        <Footer/>
      </React.Fragment>
    )
  }
}

export default Protected;