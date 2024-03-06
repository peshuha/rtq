import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ProductToken} from "./product-token.tsx";
import {TProduct, TUserLogin} from "./product-class.tsx";
import {authPath} from "../../App.tsx";
import {trace} from "../../trace/trace.tsx";


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3001/",
        prepareHeaders: headers => {
            const token = ProductToken().GetToken()
            trace("productApi:token")
            trace(token)
            console.log(`used token ${token}`)
            if (token) {
                console.log(`token is not null`)
                headers.set('Set-Cookie', `MyToken ${token}`)
                console.log(headers)
            }
            else {
                console.log("navigate to auth")
                document.location.href = authPath
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