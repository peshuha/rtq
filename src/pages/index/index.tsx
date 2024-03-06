import {useNavigate} from "react-router-dom";
import {ProductToken} from "../../api/product/product-token.tsx";
import {useState} from "react";

export function Index() {
    const [token, setToken] = useState(ProductToken().GetToken())
    const navigate = useNavigate()
    return <div>
        <button
            onClick={()=> navigate("/product")}
        >Products</button>
        {
            !token &&
            <button
                onClick={() => navigate("/auth")}
            >Auth</button>
        }
        {
            token &&
            <button
                onClick={() => {
                    ProductToken().Reset()
                    setToken(ProductToken().GetToken())
                }}
            >Logout</button>
        }
    </div>
}