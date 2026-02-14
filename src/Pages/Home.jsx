import { useEffect } from "react";
import PostList from "../components/Posts/PostList";
import usePost from "../hooks/usePost";
import usePrivateAxios from "../hooks/usePrivateAxios";
import { actions } from "../actions";
import NewPost from "../components/Posts/NewPost";

const Home = () => {
    const { state, dispatch } = usePost();
    const { privateApi } = usePrivateAxios();

    useEffect(() => {
        dispatch({ type: actions.post.DATA_FETCHING });

        const fetchPost = async () => {
            try {
                const response = await privateApi.get(`/posts`);
                if (response.status === 200) {
                    dispatch({
                        type: actions.post.DATA_FETCHED,
                        data: response.data
                    })
                }
            } catch (error) {
                console.error(error);
                dispatch({
                    type: actions.post.DATA_FETCH_ERROR,
                    error: error.message,
                });
            }
        }

        fetchPost()
    }, [privateApi, dispatch])

    if (state?.loading) {
        return <div> Post Loading...</div>;
    }

    if (state?.error) {
        return <div> Error in fatching posts {state?.error?.message}</div>;
    }

    return (
        <>
            <NewPost />
            <PostList posts={state?.posts} />
        </>
    );
};

export default Home;