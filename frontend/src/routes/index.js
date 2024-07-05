import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Forgetpassword from "../pages/Forgetpassword";
import SignUp from "../pages/SignUp";
import Admin from "../pages/Admin";
import Alluser from "../pages/Alluser";
import Products from "../pages/Products";
import CategoryWiseProduct from "../Components/CategoryWiseProduct";
import ProductDetails from "../pages/ProductDetails";
import ViewUserCart from "../pages/ViewUserCart";
import SearchProduct from "../pages/SearchProduct";
import BuyNow from "../Components/BuyNow";
const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forget-password",
        element: <Forgetpassword />,
      },
      {
        path: "Sign-Up",
        element: <SignUp />,
      },
      {
        path:"product-category/:categoryName",   //dynamic segment of url /: this is params
        element:<CategoryWiseProduct/>
      },
      {
        path:"buyNow/:id",
        element:<BuyNow/>
      },
      
      {
        path:"product-details/:id",
        element:<ProductDetails/>,
        
        },
          {
            path:"details/:id",
            element:<ProductDetails/>
          },

      {
        path:"viewCart",
        element:<ViewUserCart/>
      },
      {
        path:"search",
        element:<SearchProduct/>
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "all-users",
            element: <Alluser />

          },
          {
            path:"products",
            element:<Products/>
          }
        ],
      }
    ]
  }
]
)
export default router;
