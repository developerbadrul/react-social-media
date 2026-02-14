import PostCard from "./PostCard";

const PostList = ({ posts }) => {
    if (!posts || posts.length === 0) return;

    const sortedPosts = Array.from(posts).sort((a, b) => {
        return new Date(b.createAt) - new Date(a.createAt)
    })
    return (
        sortedPosts.map((post) => <PostCard key={post.id} post={post} />)
    );
};

export default PostList;