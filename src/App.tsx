import {Products} from "./pages/product/products.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.tsx";
import {Auth} from "./pages/auth/auth.tsx";
import {ProductToken} from "./api/product/product-token.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Index} from "./pages/index";

const router = createBrowserRouter([
    {path: "/index", element: <Index />},
    {path: "/", element: <Index />},
    {path: "/product", element: <Products />},
    {path: "/auth", element: <Auth />}
]);

// Адрес аутификации products
export let authPath: string = ""

function App() {

    // Адрес аутификации products
    const auth = router.routes.filter((item) => (
        item?.element?.type?.name === "Auth"
    ))

    if (!auth) {
        return <h3>Неверно настроенное приложение. Сообщите разработчику</h3>
    }

    authPath = auth[0]?.path
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    )
}

export default App

