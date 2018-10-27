import constants from '../constants/passwordConstants';
import apiURL from '../constants/apiURL';
import axios from 'axios';
import { push } from 'react-router-redux'
import { validateFields } from '../helpers/Validation';
import { setupRequest } from '../helpers/Form';


export const actionCreators = {


   

    emailPasswordReset: inputFields => async(dispatch, getState) => {

        dispatch({ type: constants.EMAIL_PASSWORD_RESET_REQUEST });

        let errors = validateFields(inputFields);

        if (errors === undefined || errors.length === 0) {
            let request = setupRequest(inputFields);

            const url = apiURL + '/User/SendPasswordReset';

            await axios.get(url, {params: request
              
            }).then(function (response) {

                dispatch({ type: constants.EMAIL_PASSWORD_RESET_SUCCESS});
    
            })
            .catch(function (error) {
                let errors = [];
                if (error.response) {
                    errors = error.response.data.errors;
                } else {
                    errors.push({key: "*", message: "No response from server"});
                }
    
                dispatch({ type: constants.EMAIL_PASSWORD_RESET_FAILURE, errors });
            });

        } else {
            dispatch({ type: constants.EMAIL_PASSWORD_RESET_FAILURE, errors });
        }


    },
    reset: () => async(dispatch, getState) => {

        dispatch({ type: constants.RESET_STATE });
    },


    resetPassword: inputFields => async(dispatch, getState) => {

        dispatch({ type: constants.PASSWORD_RESET_REQUEST });

        let errors = validateFields(inputFields);

        
        if (errors === undefined || errors.length === 0) {
            let request = setupRequest(inputFields);

            const url = apiURL + '/User/ResetPassword';

            await axios.post(url, request, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {

                dispatch({ type: constants.PASSWORD_RESET_SUCCESS});
    
            })
            .catch(function (error) {
                let errors = [];
                if (error.response) {
                    errors = error.response.data.errors;
                } else {
                    errors.push({key: "*", message: "No response from server"});
                }
    
                dispatch({ type: constants.PASSWORD_RESET_FAILURE, errors });
            });

        } else {
            dispatch({ type: constants.PASSWORD_RESET_FAILURE, errors });
        }



    }



};