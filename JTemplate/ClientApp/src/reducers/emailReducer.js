import constants from '../constants/emailConstants';


const initialState = {
    success: false,
    errors: [],
    loading: false
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === constants.CONFIRM_REQUEST) {
        return {
            ...state,
            loading: true,
            errors: []
        };
    }

    if (action.type === constants.CONFIRM_SUCCESS) {
        return {
            ...state,
            success: true,
            loading: false,
            errors: []
        };
    }

    if (action.type === constants.CONFIRM_FAILURE) {
        return {
            ...state,
            errors: action.errors,
            success: false,
            loading: false
        };
    }

    if (action.type === constants.RESEND_REQUEST) {
        return {
            ...state,
            loading: true,
            errors: []
        };
    }

    if (action.type === constants.RESEND_SUCCESS) {
        return {
            ...state,
            success: true,
            loading: false,
            errors: []
        };
    }

    if (action.type === constants.RESEND_FAILURE) {
        return {
            ...state,
            errors: action.errors,
            success: false,
            loading: false
        };
    }

    if (action.type === constants.RESET_STATE) {
        return {
            initialState
        };
    }


    return state;
};

export default reducer;