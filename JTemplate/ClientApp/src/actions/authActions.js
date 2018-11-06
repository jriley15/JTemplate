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


    logout: (accessToken) => async (dispatch, getState) => {

        /*let errors = [];
        const url = apiURL + '/User/Logout';
        await axios.get(url, {params: {
            
            Token: accessToken

        }}).then(function (response) {

            console.log('Logged out');
        })
        .catch(function (error) {
            if (error.response) {
                errors = error.response.data.errors;
                console.log('error: ',errors);
            } else {
                errors.push({key: "*", message: "No response from server"});
            }

            console.log('Failed to logout: ',errors);
        });*/


        deleteAuth();
        dispatch({ type: constants.AUTH_REMOVED });
        dispatch(push('/'));

    },

    unmount: () => async(dispatch, getState) => {

        dispatch({ type: constants.UNMOUNT });
    },


    refreshAuth: (refreshToken) => async(dispatch, getState) => {

        console.log('refreshing auth');

        dispatch({ type: constants.AUTH_REFRESH_REQUEST });
        deleteAuth();

        let errors = [];

        if (refreshToken) {
            const url = apiURL + '/User/RefreshToken';
            await axios.get(url, {params: {
                
                Token: refreshToken

            }}).then(function (response) {

                const auth = response.data;
                
                storeAuth(auth);

                dispatch({ type: constants.AUTH_REFRESH_SUCCESS, auth });
                console.log('success');
            })
            .catch(function (error) {
                if (error.response) {
                    errors = error.response.data.errors;
                    console.log('error: ',errors);
                } else {
                    errors.push({key: "*", message: "No response from server"});
                }

                dispatch({ type: constants.AUTH_REFRESH_FAILURE, errors });
            });
        } else {
            errors.push({key: "*", message: "No token provided"});
            dispatch({ type: constants.AUTH_REFRESH_FAILURE, errors });
        }
    },

    googleLogin: token => async (dispatch, getState) => {

        dispatch({ type: constants.LOGIN_REQUEST });

        let errors = [];

        if (token) {

            const url = apiURL + '/User/GoogleLogin';

            await axios.get(url, {params: {
                
                Token: token

            }}).then(function (response) {
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