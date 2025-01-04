import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./ProductReducer";
import { errorRreducer } from "./ErrorReducer";

export const store = configureStore({
    reducer: {
        products : productReducer,
        errors : errorRreducer,
    },
    preloadedState: {}
})

export default store;