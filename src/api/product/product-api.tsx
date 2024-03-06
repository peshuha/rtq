import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ProductToken} from "./product-token.tsx";
import {TProduct, TUserLogin} from "./product-class.tsx";
import {authPath, in_auth} from "../../App.tsx";
import {trace} from "../../trace/trace.tsx";


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/",
        prepareHeaders: headers => {
            const token = ProductToken().GetToken()
            if (token) {
                console.log(`use token ${token}`)
                headers.set('Set-Cookie', `MyToken ${token}`)
            }
            else {
                if(!ProductToken().IsAuth()) {
                    document.location.href = authPath
                }
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        authorize: builder.mutation<TUserLogin, {login: string, password: string}>({
            query: ({login, password}) => ({
                url: (!login || !password) ? undefined : `users?login=${login}&password=${password}`,
                method: "GET"
            })
        }),
        getproducts: builder.query<TProduct[], void>({
            query: () => 'product'
        })
    })
})


export const {
    useAuthorizeMutation,
    useGetproductsQuery
} = productApi;