import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from './actions/authActions';
import decode from 'jwt-decode';




class Startup extends Component {

    async componentWillMount() {

      //check if we have a token in local storage

      await this.props.getAuth();


      /*
      add a check on startup component that checks if access token is invalid
      if it is, sign user out and redirect them to login page
      */
      if (this.props.authenticated) {

        let dateNow = new Date();
        let decoded = decode(this.props.auth.accessToken);

        
        //console.log('decoded token: ', decoded);
      
        //check if access token is still valid (not expired)
        if (decoded.exp < dateNow.getTime()/1000) {

          //expired, use refresh token to get new one
          console.log('Token expired');

          //get new one from back-end

        }

      }


      /*
      add a check on startup component that checks if access token is expired
      if it is, use refresh token to grant a new one 
      */




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


