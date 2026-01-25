import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    },
    {
        path: "/profile",
        Component: Profile
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