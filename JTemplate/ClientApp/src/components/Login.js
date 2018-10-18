import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/authActions';
import "./Login.css";



class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.renderErrors = this.renderErrors.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });

  };


  renderErrors() {
    const listErrors = this.props.errors.map((error) =>
      <li key={error.key}>{error.key}: {error.message}</li>
    );

    return (<ul>{listErrors}</ul>)
  }  

  submitLogin = e => {

    e.preventDefault();

    if (this.state.inputEmail != null && this.state.inputPassword != null)
      this.props.login({Email: this.state.inputEmail, Password: this.state.inputPassword});

  };



  render() {
    return (

      <div className="login-container">
        
        <div className="container">
        <div className="row text-center">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <form className="form-login">
            <h1 className="h3 mb-3 font-weight-normal">Login</h1>

            {this.renderErrors()}

            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus="" onChange={this.handleInputChange}/>
  
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={this.handleInputChange}/>
  
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me"/> Remember me
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.submitLogin}>{this.props.loggingIn ? "Logging in" : "Login"}</button>
            <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
          </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

 

export default connect(
  state => state.auth,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Login);
