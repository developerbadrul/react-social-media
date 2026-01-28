import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import RootLayout from "../layouts/RootLayout";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    // privete route
    {
        Component: PrivateRoute,
        children: [
            {
                path: "/",
                Component: RootLayout,
                children: [
                    {
                        path: "profile",
                        Component: Profile
                    },
                    {
                        path: "/",
                        Component: Home,
                        index: true
                    },
                ]
            },
        ]
    },
    // public route
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/registration",
        Component: Registration
    }
]);



export default router;