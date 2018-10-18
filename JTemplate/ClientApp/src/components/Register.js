import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../actions/registerActions';
import "./Register.css";

class Register extends Component {



  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  renderRegister() {
    return (
      <div className="register-container">
        <div className="container">
        <div className="row text-center">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <form className="form-register">
            
            <h1 className="h3 mb-3 font-weight-normal">Create an account</h1>
  
            <label htmlFor="inputFirstName" className="sr-only">First Name</label>
            <input type="firstName" id="inputFirstName" className="form-control" placeholder="First Name" autoFocus=""/>
  
            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
            <input type="lastName" id="inputLastNameName" className="form-control" placeholder="Last Name" autoFocus=""/>
  
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus=""/>
  
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
  
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
            <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
          </form>
          </div>
        </div>
      </div>
    </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderRegister()}
      </div>
    );
  }

}

export default connect(
  state => state.register,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Register);
