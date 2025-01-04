const initialState = {
    isLoading: false,
    errorMessage: null
}

export const errorRreducer = (state = initialState ,action) => {
    switch (action.type) {
        case "IS_FETCHING":
            return{
                ...state,
                isLoading: true,
                errorMessage: null,
            }

        case "IS_SUCCESS":
            return{
                ...state,
                isLoading: false,
                errorMessage: null,
            }

        case "IS_ERROR":
            return{
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}