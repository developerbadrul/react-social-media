import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileProvider from "../providers/ProfileProvider";
import PostProvider from "../providers/PostProvider";

const RootLayout = () => {
    return (
        <>
            <PostProvider>
                <ProfileProvider>
                    <Navbar />
                    <div className="mx-auto max-w-255 py-8">
                        <div className="container">
                            <Outlet />
                        </div>
                    </div>
                </ProfileProvider>
            </PostProvider>
        </>
    );
};

export default RootLayout;