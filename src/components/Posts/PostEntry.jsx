import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
import usePrivateAxios from "../../hooks/usePrivateAxios";
import useProfile from "../../hooks/useProfile";
import AddPhoto from "../../assets/icons/addPhoto.svg"
import { actions } from "../../actions";
import Field from "../Field";
import { useEffect, useState } from "react";

const PostEntry = ({ onCreate }) => {
    const { auth } = useAuth();
    const { dispatch } = usePost();
    const { privateApi } = usePrivateAxios();
    const { state: profile } = useProfile();
    const [preview, setPreview] = useState();

    const user = profile?.user ?? auth?.user;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm();

    const selectedPhoto = watch("photo");

    const handlePostSubmit = async (data) => {
        // console.log(data);
        dispatch({ type: actions.post.DATA_FETCHING });
        try {
            const formData = new FormData();

            formData.append("content", data.content);

            if (data.photo?.[0]) {
                formData.append("image", data.photo[0])
                formData.append("postType", "file")
            }

            console.dir("new post", formData);

            const response = await privateApi.post(`/posts`, formData);
            if (response.status === 200) {
                dispatch({
                    type: actions.post.DATA_CREATED,
                    data: response.data
                });

                if (preview) {
                    URL.revokeObjectURL(preview);
                    setPreview(null)
                }

                onCreate();
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: actions.post.DATA_FETCH_ERROR,
                error: error?.message
            })
        }
    }

    const removeImage = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
            setPreview(null)
        }
    }


    useEffect(() => {
        if (selectedPhoto?.[0]) {
            const objectUrl = URL.createObjectURL(selectedPhoto[0]);
            setPreview(objectUrl)

            return () => {
                URL.revokeObjectURL(objectUrl);
            };
        }

    }, [selectedPhoto])

    console.log("preview", preview);

    return (
        <div className="card relative">
            <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
                Create Post
            </h6>
            <form onSubmit={handleSubmit(handlePostSubmit)}>
                <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
                    <div className="flex items-center gap-3">
                        <img
                            className="max-w-10 max-h-10 rounded-full lg:max-h-14.5 lg:max-w-14.5"
                            src={`${import.meta.env.VITE_API_BASE_URL}/${user?.avatar
                                }`}
                            alt="avatar"
                        />
                        <div>
                            <h6 className="text-lg lg:text-xl">
                                {user?.firstName} {user?.lastName}{" "}
                            </h6>

                            <span className="text-sm text-gray-400 lg:text-base">
                                Public
                            </span>
                        </div>
                    </div>

                    <label
                        className="btn-primary cursor-pointer text-gray-100!"
                        htmlFor="photo"
                    >
                        <img src={AddPhoto} alt="Add Photo" />
                        Add Photo
                    </label>
                    <input
                        {...register("photo")}
                        type="file"
                        id="photo"
                        className="hidden"
                    />
                </div>

                {preview && (
                    <div className="relative mt-4 w-auto">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-h-80 rounded-lg object-cover"
                        />

                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 rounded-full bg-black/60 px-3 py-1 text-sm text-white hover:bg-black"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <Field label="" error={errors.content}>
                    <textarea
                        {...register("content", {
                            required: "Adding some text is mandatory!",
                        })}
                        name="content"
                        id="content"
                        placeholder="Share your thoughts..."
                        className="h-30 w-full bg-transparent focus:outline-none lg:h-4"
                    ></textarea>
                </Field>



                <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
                    <button
                        disabled={isSubmitting}
                        className="auth-input bg-green-500 font-bold text-deepDark transition-all hover:opacity-90"
                        type="submit"
                    >
                        {isSubmitting ? "Posting" : "Post"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostEntry;