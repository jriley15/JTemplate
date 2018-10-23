import constants from '../constants/authConstants';
import apiURL from '../constants/apiURL';
import axios from 'axios';
import { push } from 'react-router-redux'


const AUTH_KEY = 'AUTH'

export const actionCreators = {


    login: inputFields => async (dispatch, getState) => {

        dispatch({ type: constants.LOGIN_REQUEST });

        let errors = [];

        inputFields.forEach(inputField => {
            if (!inputField.value && inputField.required) {
                errors.push({ key: inputField.id, message: 'Required Field' });
            }
        });

        if (errors === undefined || errors.length === 0) {
            let request = {};
            inputFields.forEach(inputField => {
                request = { ...request, [inputField.id]: inputField.value }
            });
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
                errors = error.response.data.errors;
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


    }


};