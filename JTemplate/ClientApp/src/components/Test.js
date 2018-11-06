

import React from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

export default class Test extends React.Component {
  constructor(props) {
    super(props);

  }



  googleResponse = (response) => {
    /*const tokenBlob = new Blob([JSON.stringify({ tokenId: response.tokenId }, null, 2)], { type: 'application/json' });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch(config.GOOGLE_AUTH_CALLBACK_URL, options)
      .then(r => {
        r.json().then(user => {
          const token = user.token;
          console.log(token);
          //this.props.login(token);
        });
      })*/

      let token =  response.tokenId

      console.log('token: ',token);


  };


  render() {
      return (
        <div>
          <GoogleLogin
            clientId="84984720032-ivtss75tjtl6n9kdpvl8ovger15fseqg.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.googleResponse}
            onFailure={this.googleResponse}
          />
          
        </div>  
        );
  }



}




