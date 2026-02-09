import useProfile from "./useProfile";

export const useAvatar = (post) => {
    const { state } = useProfile();

    const isMe = post?.author?.id === state?.user?.id;
    const avatar = isMe ? `${state?.user?.avatar}` : `${post?.author?.avatar}`;

    const avatarURL = `${import.meta.env.VITE_API_BASE_URL}/${avatar}`;


    return { avatarURL };
};


