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
    const [authorize, {isSuccess, error, isLoading}] = useAuthorizeMutation()
    const navigate = useNavigate()


    const auth = async () => {
        try{
            setErrMsg("")
            const answer = await authorize({login, password})
            if(!answer || !answer?.data[0]) {
                throw new Error("Wrong authorize or password")
            }
            const token = answer.data[0].token
            trace("token1")
            ProductToken().SetToken(token)
            console.log("token:", ProductToken().GetToken())
            navigate("/index")
            trace("token2")
        }
        catch(err) {
            console.error("error", err)
            setErrMsg(err)
        }
        setLogin("")
        setPassword("")
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