import constants from '../constants/registerConstants';
import apiURL from '../constants/apiURL';
import axios from 'axios';
import { validateFields } from '../helpers/Validation';
import { setupRequest } from '../helpers/Form';


export const actionCreators = {

    register: inputFields => async (dispatch, getState) => {

        dispatch({ type: constants.REGISTER_REQUEST });

        let errors = validateFields(inputFields);
        
        if (errors === undefined || errors.length === 0) {
            let request = setupRequest(inputFields);

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

                if (error.response) {
                    errors = error.response.data.errors;
                } else {
                    errors.push({key: "*", message: "No response from server"});
                }

                dispatch({ type: constants.REGISTER_FAILURE, errors });
            });

        } else {
            dispatch({ type: constants.REGISTER_FAILURE, errors });
        }

    },

    unmount: () => async(dispatch, getState) => {

        dispatch({ type: constants.UNMOUNT });
    }



};