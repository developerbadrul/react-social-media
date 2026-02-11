import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileProvider from "../providers/ProfileProvider";
import PostProvider from "../providers/PostProvider";

const RootLayout = () => {
    return (
        <>
            <ProfileProvider>
                <PostProvider>
                    <Navbar />
                    <Outlet />
                </PostProvider>
            </ProfileProvider>
        </>
    );
};

export default RootLayout;