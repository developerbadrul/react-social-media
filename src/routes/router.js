import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
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