import constants from '../constants/registerConstants';
import apiURL from '../constants/apiURL';
import axios from 'axios';
import { push } from 'react-router-redux'


const AUTH_KEY = 'AUTH'

export const actionCreators = {


    register: user => async (dispatch, getState) => {    

      dispatch({ type: constants.REGISTER_REQUEST });
      const url = apiURL+'/User/Login';
      const response = await axios.post(url, {Email: user.Email, Password: user.Password}, {
          headers: {
              'Content-Type': 'application/json',
          }
          
      }).then(function (response) {
          const auth = response.data;
          dispatch({ type: constants.REGISTER_SUCCESS, auth });
          dispatch(push('/'));
          //store auth in localstorage
          localStorage.setItem(AUTH_KEY, auth);  
        
      })

      .catch(function (error) {
          const errors = error.response.data.errors;
          dispatch({ type: constants.REGISTER_FAILURE, errors });
      });
    }


  
  
  };