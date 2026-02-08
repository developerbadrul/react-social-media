import { useState } from "react";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import useProfile from "../../hooks/useProfile";
import { actions } from "../../actions";
import CheckIcon from "../../assets/icons/check.svg";
import EditIcon from "../../assets/icons/edit.svg";

const Bio = () => {
    const { state, dispatch } = useProfile();
    const { privateApi } = usePrivateAxios();

    const [bio, setBio] = useState("");
    const [editMode, setEditMode] = useState(false);

    const startEdit = () => {
        setBio(state?.user?.bio ?? "");
        setEditMode(true);
    }

    const handleBioEdit = async () => {

        if (!bio.trim()) return;

        if (bio?.trim() === state?.user?.bio?.trim()) {
            setEditMode(false);
            return
        }

        dispatch({ type: actions.profile.DATA_FETCHING });

        try {
            const response = await privateApi.patch(`/profile/${state?.user?.id}`, { bio });
            if (response?.status === 200) {
                dispatch({
                    type: actions.profile.USER_DATA_EDITED,
                    data: response.data,
                });
            }
            setEditMode(false)
        } catch (error) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    }

    const handleKeyDown = (e) => {
        // console.log("listen key down", e);

        if (e.key === "Escape") {
            setEditMode(false);
            setBio(state?.user?.bio ?? "");
        }


        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleBioEdit()
        }
    }

    return (
        <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
                {!editMode ? (
                    <p className="leading-[188%] text-gray-400 lg:text-lg">
                        {state?.user?.bio}
                    </p>
                ) : (
                    <textarea
                        autoFocus
                        disabled={state?.loading}
                        className='p-2 leading-[188%] text-gray-600 lg:text-lg rounded-md'
                        value={bio}
                        rows={4}
                        cols={55}
                        onChange={(e) => setBio(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                )}
            </div>
            {!editMode ? (
                <button
                    className="flex-center h-7 w-7 rounded-full"
                    onClick={startEdit}
                >
                    <img src={EditIcon} alt="Edit" />
                </button>
            ) : (
                <button
                    className="flex-center h-7 w-7 rounded-full"
                    disabled={state?.loading}
                    onClick={handleBioEdit}
                >
                    <img src={CheckIcon} alt="Check" />
                </button>
            )}
        </div>
    );
};

export default Bio;