import { createBrowserRouter } from "react-router-dom";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import Createproduct from "../features/product/pages/Createproduct.jsx";
import ViewProduct from "../features/product/pages/ViewProduct.jsx";
import Protected from "../component/Protected.jsx";
import Home from "../features/product/pages/Home.jsx";
import ProductDetails from "../features/product/pages/ProductDetails.jsx";


export const router = createBrowserRouter([
    {
        path: "/",
        element:<Home/>
            
    }, {
        path: "/details/:id",
        element:<ProductDetails/>
    },
    
    {
        path: "/register",
        element:<Register/>
    }, {
        path: "/login",
        element:<Login/>
    },
    {
        path: "/seller",
        children: [
            {
                path: "/seller/create",
                element: <Protected role="seller">
                     <Createproduct />
                </Protected>
            },
            {
                path: "/seller/view",
                element: <Protected role="seller">
                    <ViewProduct />
                </Protected> 
            }
        ]
    }
]);