import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from './actions/authActions';




class Startup extends Component {

    componentDidMount() {

      //check if we have a token in local storage
      //will also need to verify the token and possibly refresh?
      this.props.getAuth();
    }

    render() {
      return (<div>{this.props.children}</div>);
    }
}
  

export default connect(
  state => state.auth,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Startup);


