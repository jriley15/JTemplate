import constants from '../constants/authConstants';




const initialState = {
    authenticated: false,
    loggingIn: false,
    auth: {},
    errors: [],
    refreshing: false
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === constants.LOGIN_REQUEST) {
        return {
            ...state,
            loggingIn: true
        };
    }

    if (action.type === constants.LOGIN_SUCCESS) {
        return {
            ...state,
            auth: action.auth,
            authenticated: true,
            loggingIn: false,
            errors: []
        };
    }

    if (action.type === constants.LOGIN_FAILURE) {
        return {
            ...state,
            errors: action.errors,
            authenticated: false,
            loggingIn: false
        };
    }

    if (action.type === constants.AUTH_FOUND) {
        return {
            ...state,
            authenticated: true,
            auth: action.auth
        };
    }

    if (action.type === constants.AUTH_REMOVED) {
        return {
            ...state,
            authenticated: false,
            auth: {}
        };
    }

    if (action.type === constants.UNMOUNT) {
        return {
            ...state,
            errors: []
        };
    }

    
    if (action.type === constants.AUTH_REFRESH_REQUEST) {
        return {
            ...state,
            errors: [],
            refreshing: true
        };
    }

    if (action.type === constants.AUTH_REFRESH_SUCCESS) {
        return {
            ...state,
            auth: action.auth,
            authenticated: true,
            errors: [],
            refreshing: false
        };
    }

    if (action.type === constants.AUTH_REFRESH_FAILURE) {
        return {
            ...state,
            errors: action.errors,
            authenticated: false,
            refreshing: false
        };
    }


    return state;
};

export default reducer;