import api from "../../api/api";

export const fetchProducts = (qString) => async (dispatch) => {
    try {
        dispatch({type : "IS_FETCHING"});
        const {data} = await api.get(`/public/products?${qString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        })
        dispatch({type : "IS_SUCCESS"});
    } catch (error) {
        console.error(error);
        dispatch({
            type : "IS_ERROR",
            payload : error?.response?.data?.message || "FAILED TO FETCH PRODUCT",
        });
    }
}
export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({type : "CATEGORY_LOADER"});
        
        const {data} = await api.get(`/public/categories`);
        
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        })
        dispatch({type : "CATEGORY_SUCCESS"});
    } catch (error) {
        console.error(error);
        dispatch({
            type : "IS_ERROR",
            payload : error?.response?.data?.message || "FAILED TO FETCH CATEGORIES",
        });
    }
}