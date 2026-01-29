import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileProvider from "../providers/ProfileProvider";

const RootLayout = () => {
    return (
        <>
            <ProfileProvider>
                <Navbar />
                <Outlet />
            </ProfileProvider>
        </>
    );
};

export default RootLayout;