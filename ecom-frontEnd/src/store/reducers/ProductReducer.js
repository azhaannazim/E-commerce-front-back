const initialState = {
    products: null,
    categories : [],
    pagination : {},
};

const productReducer = (state = initialState , action) => {
    switch (action.type) {
        case "FETCH_PRODUCTS":
            return{
                ...state,
                products: action.payload,
                pagination :{
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage
                }
            };
        case "FETCH_CATEGORIES":
            // console.log("Redux Categories:", action.payload);
            return{
                ...state,
                categories: action.payload,
                pagination :{
                    ...state.pagination,
                    pageNumber: action.pageNumber,
                    pageSize: action.pageSize,
                    totalElements: action.totalElements,
                    totalPages: action.totalPages,
                    lastPage: action.lastPage
                }
            };
    
        default:
            return state;
    }
}
export default productReducer;