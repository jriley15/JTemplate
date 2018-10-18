import constants from '../constants/registerConstants';


const initialState = {
    success: false,
    errors: [],
    loading: false
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === constants.REGISTER_REQUEST) {
        return {
            ...state,
            loading: true
        };
    }

    if (action.type === constants.REGISTER_SUCCESS) {
        return {
            ...state,
            success: true,
            loading: false,
            errors: []
        };
    }

    if (action.type === constants.REGISTER_FAILURE) {
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