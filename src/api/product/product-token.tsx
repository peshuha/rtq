import Cookies from "universal-cookie";

export const ProductToken = () => {
    const CONST_KEY: string = "__token"
    const CONST_AUTH_URL: string = "__auth"

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
        },
        InAuth: () => {
            localStorage.setItem(CONST_AUTH_URL, "Ok")
        },
        OutAuth: () => {
            localStorage.removeItem(CONST_AUTH_URL)
        },
        IsAuth: (): boolean => {
            const v = localStorage.getItem(CONST_AUTH_URL)
            if (v) {
                return true
            }
            return false
        }
    }
}
