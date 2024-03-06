import styles from "./auth.module.css"
import {useState} from "react";
import {ProductToken} from "../../api/product/product-token.tsx";
import {useAuthorizeMutation} from "../../api/product/product-api.tsx";
import {useNavigate} from "react-router-dom";
import {trace} from "../../trace/trace.tsx";

export function Auth() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errmsg, setErrMsg] = useState('')
    // const [answer, setAnswer] = useState("")
    const [authorize, {isSuccess, error, isLoading}] = useAuthorizeMutation()
    const navigate = useNavigate()

    const auth = async () => {
        setErrMsg("")
        const slogin = login
        const spassword = password
        setLogin("")
        setPassword("")
        ProductToken().InAuth()
        const answer = await authorize({login: slogin, password: spassword})
        ProductToken().OutAuth()
        try{
            if(!answer || !answer?.data[0]) {
                throw new Error("Wrong authorize or password")
            }
            const token = answer.data[0].token
            ProductToken().SetToken(token)
            navigate("/product")
        }
        catch(err) {
            console.error("error", err)
            setErrMsg(err)
        }
    }

    return <div>
        <input type="text"
               placeholder="login"
               value={login}
               onInput={(e) => setLogin(e.target.value)}
        />
        <input type="text"
               placeholder="password"
               value={password}
               onInput={(e) => setPassword(e.target.value)}
        />
        <button
            onClick={auth}
        >authorize</button>
        {
            errmsg && <><br/><span className={styles.error}>{errmsg.toString()}</span></>
        }
    </div>
}