import useProfile from "../../hooks/useProfile";
import PostCommentList from "./PostCommentList";
import avatarPic from "./../../assets/images/avatars/avatar_1.png"
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import usePrivateAxios from "../../hooks/usePrivateAxios";


const PostComments = ({ post }) => {

    const { state } = useProfile();
    const { auth } = useAuth();
    const [comments, setComments] = useState(() => post.comments);
    const [comment, setComment] = useState("");
    const { privateApi } = usePrivateAxios();

    const addComment = async (event) => {

        if (event.key === "Enter" && comment.trim()) {
            event.preventDefault();
            try {
                const response = await privateApi.patch(`/posts/${post.id}/comment`, { comment });
                if (response.status === 200) {
                    setComments([...response.data.comments])
                    setComment("");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const user = state?.user ?? auth?.user;

    const avatarSrc = user?.avatar ? `${import.meta.env.VITE_API_BASE_URL}/${user.avatar}` : avatarPic;

    return (
        <div>
            <div className="flex-center mb-3 gap-2 lg:gap-4">
                <img
                    className="max-w-7 max-h-7 rounded-full lg:max-h-8.5 lg:max-w-8.5"
                    src={avatarSrc}
                    alt="avatar"
                />

                <div className="flex-1">
                    <input
                        type="text"
                        className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-9.5"
                        name="post"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        onKeyDown={e => addComment(e)}
                        id="post"
                        placeholder="What's on your mind?"
                    />
                </div>
            </div>
            <div className="mt-4">
                <button className="text-gray-300 max-md:text-sm">
                    All Comment ▾
                </button>
            </div>

            <PostCommentList comments={comments} />
        </div>
    );
};

export default PostComments;