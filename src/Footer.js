import React, {Component} from "react";

import './App.css';


class Footer extends Component {

  render() {
    return (
      <div className="footerContainer">

        {/*<div className="footerBoxFirstChild"/>*/}

        <div className='footerBox'>
          <div>Address: Palk street</div>
          <div>Copyright: 2020 Copyright</div>
          <div>USA based Company </div>
        </div>

      </div>
    );
  }

}

export default Footer;