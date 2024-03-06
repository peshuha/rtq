import {configureStore} from "@reduxjs/toolkit"
import {productApi} from "../api/product/product-api.tsx";

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefault) => {
        return getDefault()
            .concat(productApi.middleware)
    }
})