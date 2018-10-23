import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/registerActions';
import "../resources/css/Register.css";
import renderErrors from "./sub/Errors";

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {

      inputFields: [
        { 
          id: 'FirstName',
          name: 'First Name',
          required: false 
        },
        { 
          id: 'LastName',
          name: 'Last Name',
          required: false 
        },
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
        },
        { 
          id: 'PasswordConfirm',
          name: 'Confirm Password',
          type: 'password',
          required: true 
        }
      ]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderSuccess = this.renderSuccess.bind(this);
    this.setInputField = this.setInputField.bind(this);
  }


  componentWillMount() {
    this.props.mount();
  }

  componentWillReceiveProps(nextProps) {
  }

  handleInputChange = e => {
    /*this.setState({
      [e.target.id]: { ...this.state[e.target.id], value: e.target.value }
    });
    */
    this.setInputField(e.target.id, e.target.value);
  };


  setInputField(id, value) {
    let inputFieldState = [...this.state.inputFields];
    const index = inputFieldState.findIndex(inputField => inputField.id === id);
    inputFieldState[index].value = value;
    this.setState({inputFields: inputFieldState});
  }

  submitRegister = e => {
    e.preventDefault();
    this.props.register(this.state.inputFields);
  };


  render() {
    if (this.props.success) {
      return (<this.renderSuccess />);
    } else {
      return (<this.renderForm />);
    }
  }

  renderSuccess() {
    return (
      <div className="register-container">
        <div className="container">
          <div className="row text-center">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <form className="form-register">

                <h1 className="h3 mb-3 font-weight-normal">Successfully registered</h1>
                <p>Your account has been created, <a href="/login">login here.</a></p>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }



  renderForm() {

    return (
      <div className="register-container">
        <div className="container">
          <div className="row text-center">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <form className="form-register">
                <h1 className="h3 mb-3 font-weight-normal">Create an account</h1>

                {renderErrors('*', this.props.errors)}

                {this.state.inputFields.map(inputField =>(
                  <div className="form-group left" key={inputField.id}>
                    <label htmlFor={inputField.id}>{inputField.name}</label>
                    <input id={inputField.id} className="form-control" type={inputField.type ? inputField.type : "text"} placeholder={"Enter "+inputField.name} autoFocus="" onChange={this.handleInputChange} />
                    {renderErrors(inputField.id, this.props.errors)}
                  </div>
                ))}

                <button className="btn btn-lg btn-primary btn-block" onClick={this.submitRegister}>{this.props.loggingIn ? "Loading.." : "Sign Up"}</button>
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
  state => state.register,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Register);
