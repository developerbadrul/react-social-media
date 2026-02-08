import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import usePrivateAxios from "../hooks/usePrivateAxios";
import { actions } from "../actions";
import ProfileInfo from "../components/Profile/ProfileInfo";
import MyPosts from "../components/Profile/MyPosts";

const Profile = () => {
    const { state, dispatch } = useProfile();
    const { auth } = useAuth();
    const { privateApi } = usePrivateAxios();

    useEffect(() => {
        dispatch({ type: actions.profile.DATA_FETCHING })
        const fetchProfile = async () => {
            try {

                const response = await privateApi.get(`/profile/${auth?.user?.id}`);

                if (response.status === 200) {
                    dispatch({
                        type: actions.profile.DATA_FETCHED,
                        data: response.data
                    })
                }

            } catch (error) {
                console.log(error);
                dispatch({
                    type: actions.profile.DATA_FETCH_ERROR,
                    error: actions.error
                })

            }
        }

        fetchProfile()
    }, [])

    if (state?.loding) {
        return <div> Fetching your Profile data...</div>;
    }

    return (
        <>
            <ProfileInfo />
            <MyPosts />
        </>
    );
};

export default Profile;