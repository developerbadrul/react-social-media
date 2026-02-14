import useProfile from "../../hooks/useProfile";
import PostList from "../Posts/PostList";

const MyPosts = () => {
    const { state, dispatch } = useProfile();
    const posts = state?.posts;

    if (state?.loading) {
        return <p>post loading</p>
    }

    return (
        <>
            <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
            <PostList posts={posts} dispatchOwn={dispatch} />
        </>
    );
};

export default MyPosts;