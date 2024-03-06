import styles from "./products.module.css"
import {useGetproductsQuery} from "../../api/product/product-api.tsx";
import {trace} from "../../trace/trace.tsx";

export function Products() {
    const {data, isLoading, isSuccess, error} = useGetproductsQuery()

    trace("page Products")
    if (error) {
        return <div>{error.error}</div>
    }

    if (isLoading) {
        return <h3>Loading...</h3>
    }
    return <>
        {
            isSuccess &&
            data.map((product) => (
                <div key={product.id} className={styles.line}>
                    <div>{product.id}</div>
                    <div>{product.brand}</div>
                    <div>{product.category}</div>
                    <div>{product.description}</div>
                    <div>{product.price}</div>
                    <div>{product.stock}</div>
                </div>

            ))
        }
    </>
}