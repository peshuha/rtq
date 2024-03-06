import Cookies from "universal-cookie";

export const ProductToken = () => {
    const CONST_KEY: string = "__token"

    return {
        SetToken: (token: string) => {
            localStorage.setItem(CONST_KEY, token)
            // const cookies = new Cookies()
            // cookies.set(CONST_KEY, token, {path: "/"})
        },
        GetToken: () => {
            return localStorage.getItem(CONST_KEY)
        },
        Reset: () => {
            localStorage.removeItem(CONST_KEY)
        }
    }
}
