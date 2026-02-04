import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useProfile from "../hooks/useProfile";
import usePrivateAxios from "../hooks/usePrivateAxios";
import { actions } from "../actions";

const Profile = () => {
    const { state, dispatch } = useProfile();
    const { auth } = useAuth();
    const { privateApi } = usePrivateAxios();

    useEffect(() => {
        dispatch({ type: actions.profile.DATA_FETCHING })
        const fetchProfile = async () => {
            try {
                console.log("user form auth", auth?.user?.id);
                // http://localhost:3000/profile/6fd3ed42-2275-4d5f-a436-e5a3bf586c56
                
                const response = await privateApi.get(`/profile/${auth?.user?.id}`);
                console.log(response);

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
        <div>
            profile page
        </div>
    );
};

export default Profile;