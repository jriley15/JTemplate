import constants from '../constants/authConstants';
import apiURL from '../constants/apiURL';
import axios from 'axios';
import { push } from 'react-router-redux'
import { validateFields } from '../helpers/Validation';
import { setupRequest } from '../helpers/Form';


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
                storeAuth(auth);
                

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

        const auth = getAuth();


        if (auth != null) {
            dispatch({ type: constants.AUTH_FOUND, auth });
        }

    },


    logout: () => async (dispatch, getState) => {

        deleteAuth();

        dispatch({ type: constants.AUTH_REMOVED });
        dispatch(push('/'));


    },

    unmount: () => async(dispatch, getState) => {

        dispatch({ type: constants.UNMOUNT });
    }

};



const storeAuth = (auth) => {

    localStorage.setItem(constants.EMAIL_ADDRESS, auth.email);
    localStorage.setItem(constants.ACCESS_TOKEN, auth.accessToken);
    localStorage.setItem(constants.REFRESH_TOKEN, auth.refreshToken);
    localStorage.setItem(constants.USER_ID, auth.id);

}

const getAuth = () => {

    var auth = {};

    auth.email = localStorage.getItem(constants.EMAIL_ADDRESS);
    auth.accessToken = localStorage.getItem(constants.ACCESS_TOKEN);
    auth.refreshToken = localStorage.getItem(constants.REFRESH_TOKEN);
    auth.id = localStorage.getItem(constants.USER_ID);

    for (let key in auth) {
        if (auth[key] == null || auth[key] == undefined) {
            return null;
        }
    }
    
    return auth;
}

const deleteAuth = () => {
    
    localStorage.removeItem(constants.EMAIL_ADDRESS);
    localStorage.removeItem(constants.ACCESS_TOKEN);
    localStorage.removeItem(constants.REFRESH_TOKEN);
    localStorage.removeItem(constants.USER_ID);
}