import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/authActions';
import "../resources/css/Login.css";
import renderErrors from "./sub/Errors";



class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {

      inputFields: [
        {
          id: 'Email',
          name: 'Email Address',
          required: true
        },
        {
          id: 'Password',
          name: 'Password',
          type: 'password',
          required: true
        }
      ]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.setInputField = this.setInputField.bind(this);
  }

  handleInputChange = e => {
    /*this.setState({
      [e.target.id]: e.target.value
    });*/

    this.setInputField(e.target.id, e.target.value);

  };

  setInputField(id, value) {
    let inputFieldState = [...this.state.inputFields];
    const index = inputFieldState.findIndex(inputField => inputField.id === id);
    inputFieldState[index].value = value;
    this.setState({ inputFields: inputFieldState });
  }

  submitLogin = e => {

    e.preventDefault();
    this.props.login(this.state.inputFields);

  };



  render() {
    return (

      <div className="login-container">

        <div className="container">
          <div className="row text-center">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <form className="form-login">
                <h1 className="h3 mb-3 font-weight-normal">Login</h1>

                {renderErrors('*', this.props.errors)}


                {this.state.inputFields.map(inputField => (
                  <div className="form-group left" key={inputField.id}>
                    <label htmlFor={inputField.id}>{inputField.name}</label>
                    <input id={inputField.id} className="form-control" type={inputField.type ? inputField.type : "text"} placeholder={"Enter " + inputField.name} autoFocus="" onChange={this.handleInputChange} />
                    {renderErrors(inputField.id, this.props.errors)}
                  </div>
                ))}


                <div className="checkbox mb-3">
                  <label>
                    <input type="checkbox" value="remember-me" /> Remember me
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
