import constants from '../constants/authConstants';
import apiURL from '../constants/apiURL';
import axios from 'axios';
import { push } from 'react-router-redux'


const AUTH_KEY = 'AUTH'

export const actionCreators = {


    login: user => async (dispatch, getState) => {    

      dispatch({ type: constants.LOGIN_REQUEST });
      const url = apiURL+'/User/Login';
      const response = await axios.post(url, {Email: user.Email, Password: user.Password}, {
          headers: {
              'Content-Type': 'application/json',
          }
      }).then(function (response) {
          const auth = response.data;
          dispatch({ type: constants.LOGIN_SUCCESS, auth });
          dispatch(push('/'));
          //store auth in localstorage
          localStorage.setItem(AUTH_KEY, auth);  
        
      })
      .catch(function (error) {
          const errors = error.response.data.errors;
          dispatch({ type: constants.LOGIN_FAILURE, errors });
      });
    },

    
    getAuth: () => async(dispatch, getState) => {

        const auth = localStorage.getItem(AUTH_KEY);

        if (auth != null) {
            console.log('found auth: ',auth);
            dispatch({ type: constants.AUTH_FOUND, auth });
        }

    },


    logout: () => async(dispatch, getState) => {
        
        localStorage.removeItem(AUTH_KEY);
        dispatch({ type: constants.AUTH_REMOVED });



    }
  
  
  };