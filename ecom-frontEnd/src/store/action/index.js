import api from "../../api/api";

export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch({type : "IS_FETCHING"});
        const {data} = await api.get("/public/products");
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