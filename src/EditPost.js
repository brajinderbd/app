import React, {Component} from "react";
import Header from "./Header";
import Footer from "./Footer";
import {getUsersPostApi} from "./Api";
import {connect} from 'react-redux';
import './App.css';
import {Link} from "react-router-dom";


class EditPost extends Component {

  state = {};

  componentDidMount() {
    const {userid} = this.fetchSearch();
    getUsersPostApi(userid);
  }

  fetchSearch = () => {

    const params = new URLSearchParams(window.location.search);
    const userid = params.get('userid');
    const username = params.get('username');
    return {userid, username};
  };

  handleUpdateClick = () => {
    const {obj} = this.state;
    const {onUpdate, postInfo} = this.props;
    onUpdate({obj, postInfo});
  };

  handleOnChangeBody = (e, postid, key) => {

    const {target: {value}} = e;
    const {postInfo = [], onBodyUpdate} = this.props;

    // const modifiedPostInfo = [...postInfo, postInfo[key].body = value];

    const modifiedPostInfo = postInfo.map((x) => {
      if (postid === x.id) {
        return {
          ...x,
          body: value,
          disabled: true,
        }
      } else {
        return {
          ...x,
          disabled: false,
        }
      }
    });

    const {userid} = this.fetchSearch();
    const obj = {id: postid, userid, title: postInfo[key].title, body: value};
    console.log(modifiedPostInfo, 'modifiedPostInfo');
    onBodyUpdate(modifiedPostInfo);

    this.setState({
      obj,
    });
  };


  render() {
    const {postInfo = [], updating} = this.props;
    const {userid, username} = this.fetchSearch();
    return (
      <React.Fragment>
        <Header/>
        <div className="defaultContainer">
          Edit Post for UserName: <span style={{color: '#cc0000'}}>{username} ({userid})</span>
        </div>
        <div style={{padding: '30px'}}>
          {
            postInfo.map((item, key) => {

              return (
                <React.Fragment>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '8px',
                    border: '1px solid black',
                    padding: '8px',
                    marginBottom: '12px',
                    backgroundColor: '#c6ecd9',

                  }}>
                    <div style={{padding: '2px', display: 'flex', alignItems: 'center'}}>
                        <span style={{color: '#808000', fontWeight: 'bold', minWidth: '50px'}}>
                          Post ({item.id}) </span>
                      <textarea className="textArea" value={item.body}
                                onChange={(e) => this.handleOnChangeBody(e, item.id, key)}/>
                    </div>
                    <div style={{marginTop: '10px', display: 'flex', justifyContent: 'space-between'}}>
                      <div style={{display: 'flex'}}>
                        <button onClick={this.handleUpdateClick} disabled={!item.disabled || false}>Update Post</button>
                        {updating && item.disabled ?
                          <div style={{marginLeft: '8px', fontSize: '15px', color: 'red'}}>...Updating</div> : ''}
                      </div>
                      <Link to={`/showphotos?userid=${userid}&username=${username}`}>
                        <button>Show Photos</button>
                      </Link>
                    </div>


                  </div>
                </React.Fragment>
              )

            })
          }

        </div>
        <Footer/>
      </React.Fragment>
    );
  }

}

const mapStateToProps = state => {
  return {
    postInfo: state.postInfo,
    updating: state.updating,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdate: (params) => dispatch({type: "updatePost", payload: params}),
    onBodyUpdate: (params) => dispatch({type: "updateBody", payload: params})
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPost);