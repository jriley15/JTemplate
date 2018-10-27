import constants from '../constants/passwordConstants';


const initialState = {
    success: false,
    errors: [],
    loading: false
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === constants.EMAIL_PASSWORD_RESET_REQUEST) {
        return {
            ...state,
            loading: true,
            errors: []
        };
    }

    if (action.type === constants.EMAIL_PASSWORD_RESET_SUCCESS) {
        return {
            ...state,
            success: true,
            loading: false,
            errors: []
        };
    }

    if (action.type === constants.EMAIL_PASSWORD_RESET_FAILURE) {
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

    if (action.type === constants.PASSWORD_RESET_REQUEST) {
        return {
            ...state,
            loading: true,
            errors: []
        };
    }

    if (action.type === constants.PASSWORD_RESET_SUCCESS) {
        return {
            ...state,
            success: true,
            loading: false,
            errors: []
        };
    }

    if (action.type === constants.PASSWORD_RESET_FAILURE) {
        return {
            ...state,
            errors: action.errors,
            success: false,
            loading: false
        };
    }

    return state;
};

export default reducer;