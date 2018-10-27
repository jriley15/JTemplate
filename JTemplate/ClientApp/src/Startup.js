import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from './actions/authActions';




class Startup extends Component {

    componentWillMount() {

      //check if we have a token in local storage
      //will also need to verify the token and possibly refresh?
      this.props.getAuth();

      //check if access token has expired

      //if not, verify with api that access token is still valid

      //if expired, use refresh token for new one


    }

    render() {
      return (<React.Fragment>{this.props.children}</React.Fragment>);
    }
}
  

export default connect(
  state => state.auth,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Startup);


