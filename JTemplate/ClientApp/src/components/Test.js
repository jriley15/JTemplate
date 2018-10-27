

import React from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

class Test extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
      return (
        <div>
          <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            buttonText="Login"
          />
          
        </div>  
        );
  }



}


export default connect(state => state.counter)(Test);



