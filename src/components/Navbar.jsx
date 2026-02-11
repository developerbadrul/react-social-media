import { Link } from "react-router-dom";
import Logo from "./../assets/images/logo.svg"
import Home from "./../assets/icons/home.svg"
import Notification from "./../assets/icons/notification.svg"
import avatarPic from "./../assets/images/avatars/avatar_1.png"
import useProfile from "../hooks/useProfile";
import useAuth from "../hooks/useAuth";
import Logout from "./Logout";


const Navbar = () => {
    const { state } = useProfile();
    const { auth } = useAuth();

    const user = state?.user ?? auth?.user;

    const avatarSrc = user?.avatar ? `${import.meta.env.VITE_API_BASE_URL}/${user.avatar}` : avatarPic;

    return (
        <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-medium-dark py-4">
            <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
                {/* <!-- Logo --> */}
                <Link to="/">
                    <img className="max-w-25 rounded-full lg:max-w-32.5" src={Logo} />
                </Link>
                {/* <!-- nav links  --> */}

                <div className="flex items-center space-x-4">
                    <Link to="/" className="btn-primary">
                        <img src={Home} alt="Home" />
                        Home
                    </Link>
                    <button className="icon-btn">
                        <img src={Notification} alt="Notification" />
                    </button>

                    <Logout />

                    <Link to="/profile" className="flex-center ml-8! gap-3">
                        <span className="text-lg font-medium lg:text-xl">{user?.firstName} {user?.lastName}</span>
                        <img className="max-h-8 max-w-8 lg:max-h-11 lg:max-w-11 rounded-full"
                            src={avatarSrc} alt="avatar" />
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;