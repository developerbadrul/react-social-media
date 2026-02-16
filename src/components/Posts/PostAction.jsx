import CommentIcon from "../../assets/icons/comment.svg";
import LikeIcon from "../../assets/icons/like.svg";
import LikeFilledIcon from "./../../assets/icons/like-filled.svg";
import ShareIcon from "../../assets/icons/share.svg";
import useAuth from "../../hooks/useAuth";
import usePrivateAxios from "../../hooks/usePrivateAxios";

const PostAction = ({ commentCount, likes, postId, onLike }) => {
    const { auth } = useAuth();
    const { privateApi } = usePrivateAxios();
    const userId = auth?.user?.id;
    const liked = likes?.includes(userId);

    const handleLike = async () => {
        if (!userId) return;

        let updatedLikes;

        if (liked) {
            updatedLikes = likes.filter(id => id !== userId);
        } else {
            updatedLikes = [...likes, userId]
        }

        onLike(updatedLikes);

        try {
            const response = await privateApi.patch(`/posts/${postId}/likes`);

            if (response.status !== 200) {
                throw Error("Somthing Wrong")
            }

        } catch (error) {
            console.log(error);
            onLike(likes)
        }
    }
    return (
        <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
            <button
                className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
                onClick={handleLike}
            >
                <img src={liked ? LikeFilledIcon : LikeIcon} alt="Like" />
                <span>Like {likes?.length ?? 0}</span>
            </button>

            <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
                <img src={CommentIcon} alt="Comment" />
                <span>Comment({commentCount ?? 0})</span>
            </button>

            <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
                <img src={ShareIcon} alt="Share" />
                <span>Share</span>
            </button>
        </div>
    );
};

export default PostAction;