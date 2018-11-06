import React from 'react';
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/authActions';


class OAuth extends React.Component {

    constructor(props) {
        super(props);
    }


    googleResponse = (response) => {

          this.props.googleLogin(response.tokenId)
    
    };

    render() {
        return (
            <>
                <GoogleLogin
                    clientId="84984720032-ivtss75tjtl6n9kdpvl8ovger15fseqg.apps.googleusercontent.com"
                    onSuccess={this.googleResponse}
                    onFailure={this.googleResponse}
                    style={{ backgroundColor: 'none', border: 'none' }}
                    tag="div"
                    prompt="select_account"
                >
                    <GoogleButton />
                </GoogleLogin>
            </>
        );
    }
}

export default connect(
    state => state.auth,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(OAuth);
  