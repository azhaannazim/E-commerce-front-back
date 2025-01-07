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
export const addToCart = (data, qty = 1, toast) => 
    (dispatch, getState) => {
        // Find the product
        const { products } = getState().products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        // Check for stocks
        const isQuantityExist = getProduct.quantity >= qty;

        // If in stock -> add
        if (isQuantityExist) {
            dispatch({ type: "ADD_CART", payload: {...data, quantity: qty}});
            toast.success(`${data?.productName} added to the cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            // error
            toast.error("Out of stock");
        }
};
