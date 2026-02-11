import { useRef } from "react";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import useProfile from "../../hooks/useProfile";
import { actions } from "../../actions";
import EditIcon from "../../assets/icons/edit.svg";
import avatarPic from "./../../assets/images/avatars/avatar_1.png"



const ProfileImage = () => {
    const { state, dispatch } = useProfile();
    const { privateApi } = usePrivateAxios();
    const fileUploaderRef = useRef();

    const updateImageDisplay = async (e) => {
        const file = e.target?.files[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("avatar", file);


            const response = await privateApi.post(`/profile/${state?.user?.id}/avatar`, formData)

            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
                    data: response.data
                })
            }

            e.target.value = "";
        } catch (error) {
            console.log("image upload error", error);
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message
            })
        }
    }

    const handleButtonClick = (e) => {
        e.preventDefault();
        fileUploaderRef.current.click()
    }


    return (
        <div className="relative mb-8 max-h-45 max-w-45 rounded-full lg:mb-11 lg:max-h-54.5 lg:max-w-54.5">
            <img
                className="max-w-full rounded-full"
                src={
                    state?.user?.avatar
                        ? `${import.meta.env.VITE_API_BASE_URL}/${state.user.avatar}`
                        : avatarPic
                }
                alt={state?.user?.firstName}
            />

            <form id="form" encType="multipart/form-data">
                <button
                    className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
                    onClick={handleButtonClick}
                    type="submit"
                >
                    <img src={EditIcon} alt="Edit" />
                </button>
                <input
                    id="file"
                    type="file"
                    accept="image/*"
                    ref={fileUploaderRef}
                    onChange={updateImageDisplay}
                    hidden
                />
            </form>
        </div>
    );
};

export default ProfileImage;