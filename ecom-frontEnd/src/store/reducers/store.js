import { configureStore } from "@reduxjs/toolkit";
import {ProductReducer} from "./ProductReducer";
import { ErrorReducer } from "./ErrorReducer";
import { CartReducer } from "./cartReducer";
import { AuthReducer } from "./authReducer";
import { PaymentMethodReducer } from "./PaymentMethodReducer";

const user = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : null;

const cartItems = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];

const selectUserCheckoutAddress = localStorage.getItem("CHECKOUT_ADDRESS")
        ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
        : [];
    
const initialState = {
    auth : {user : user},
    carts : {cart : cartItems},
}  

export const store = configureStore({
    reducer: {
        products : ProductReducer,
        errors : ErrorReducer,
        carts: CartReducer,
        auth: AuthReducer,
        payment: PaymentMethodReducer,
    },
    preloadedState: initialState,
})

export default store;