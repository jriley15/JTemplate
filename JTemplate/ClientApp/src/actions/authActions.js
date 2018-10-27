import constants from '../constants/authConstants';
import apiURL from '../constants/apiURL';
import axios from 'axios';
import { push } from 'react-router-redux'
import { validateFields } from '../helpers/Validation';
import { setupRequest } from '../helpers/Form';


const AUTH_KEY = 'AUTH';

export const actionCreators = {


    login: inputFields => async (dispatch, getState) => {

        dispatch({ type: constants.LOGIN_REQUEST });

        let errors = validateFields(inputFields);

        if (errors === undefined || errors.length === 0) {

            let request = setupRequest(inputFields);

            const url = apiURL + '/User/Login';

            await axios.post(url, request, {
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

                if (error.response) {
                    errors = error.response.data.errors;
                } else {
                    errors.push({key: "*", message: "No response from server"});
                }

                dispatch({ type: constants.LOGIN_FAILURE, errors });
             });

        } else {
            dispatch({ type: constants.LOGIN_FAILURE, errors });
        }
   
    },


    getAuth: () => async (dispatch, getState) => {

        const auth = localStorage.getItem(AUTH_KEY);

        if (auth != null) {
            dispatch({ type: constants.AUTH_FOUND, auth });
        }

    },


    logout: () => async (dispatch, getState) => {

        localStorage.removeItem(AUTH_KEY);
        dispatch({ type: constants.AUTH_REMOVED });
        dispatch(push('/'));


    },

    unmount: () => async(dispatch, getState) => {

        dispatch({ type: constants.UNMOUNT });
    }

};