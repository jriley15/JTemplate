import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from './actions/authActions';
import decode from 'jwt-decode';




class Startup extends Component {

    async componentWillMount() {

      //check if we have a token in local storage

      await this.props.getAuth();


      //if not, verify with api that access token is still valid

      this.authCheck();
    }

    componentDidUpdate() {

      this.authCheck();

    }

    async authCheck() {
      if (this.props.authenticated && !this.props.refreshing) {

        let dateNow = new Date();
        let decoded = decode(this.props.auth.accessToken);

        //check if access token is still valid (not expired)
        if (decoded.exp < dateNow.getTime()/1000) {

          //use refresh token to renew access token
          await this.props.refreshAuth(this.props.auth.refreshToken);
        }
      }
    }



    render() {
      return (<React.Fragment>{this.props.children}</React.Fragment>);
    }
}
  

export default connect(
  state => state.auth,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Startup);


