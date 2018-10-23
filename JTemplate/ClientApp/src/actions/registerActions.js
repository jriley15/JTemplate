import constants from '../constants/registerConstants';
import apiURL from '../constants/apiURL';
import axios from 'axios';


export const actionCreators = {

    register: inputFields => async (dispatch, getState) => {

        dispatch({ type: constants.REGISTER_REQUEST });

        let errors = [];

        inputFields.forEach(inputField => {       
            if (!inputField.value && inputField.required) {
                errors.push({key: inputField.id, message: 'Required Field'});
            } 
        });
        
        if (errors === undefined || errors.length === 0) {
            let request = {};
            inputFields.forEach(inputField => {       
                request = {...request, [inputField.id]: inputField.value}
            });

            const url = apiURL + '/User/Register';
            await axios.post(url, request, {
                headers: {
                    'Content-Type': 'application/json',
                }

            }).then(function (response) {
                //const auth = response.data
                dispatch({ type: constants.REGISTER_SUCCESS });
                //dispatch(push('/'));

                //console.log('success: ', response);

            })
            .catch(function (error) {
                errors = error.response.data.errors;
                dispatch({ type: constants.REGISTER_FAILURE, errors });
            });

        } else {
            dispatch({ type: constants.REGISTER_FAILURE, errors });
        }

    },

    mount: () => async (dispatch, getState) => {

        dispatch({ type: constants.REGISTER_MOUNT });
    },




};