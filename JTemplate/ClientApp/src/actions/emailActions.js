import constants from '../constants/emailConstants';
import apiURL from '../constants/apiURL';
import axios from 'axios';
import { validateFields } from '../helpers/Validation';
import { setupRequest } from '../helpers/Form';

export const actionCreators = {

    confirm: token => async (dispatch, getState) => {

        dispatch({ type: constants.CONFIRM_REQUEST });

        let errors = [];

        if (token) {
            const url = apiURL + '/User/ConfirmEmail';
            await axios.get(url, {params: {
                
                Token: token

            }}).then(function (response) {
                dispatch({ type: constants.CONFIRM_SUCCESS });
            })
            .catch(function (error) {
                if (error.response) {
                    errors = error.response.data.errors;
                } else {
                    errors.push({key: "*", message: "No response from server"});
                }

                dispatch({ type: constants.CONFIRM_FAILURE, errors });
            });
        } else {
            errors.push({key: "*", message: "No token provided"});
            dispatch({ type: constants.CONFIRM_FAILURE, errors });
        }

    },
    resend: inputFields => async (dispatch, getState) => {

        dispatch({ type: constants.RESEND_REQUEST });

        let errors = validateFields(inputFields);

        if (errors === undefined || errors.length === 0) {
            let request = setupRequest(inputFields);

            const url = apiURL + '/User/ResendEmail';

            await axios.get(url, {params: request
              
            }).then(function (response) {

                dispatch({ type: constants.RESEND_SUCCESS });
    
            })
            .catch(function (error) {
                let errors = [];
                if (error.response) {
                    errors = error.response.data.errors;
                } else {
                    errors.push({key: "*", message: "No response from server"});
                }
    
                dispatch({ type: constants.CONFIRM_FAILURE, errors });
            });

        } else {
            dispatch({ type: constants.RESEND_FAILURE, errors });
        }


    },
    reset: () => async(dispatch, getState) => {

        dispatch({ type: constants.RESET_STATE });
    }




};