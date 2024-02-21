import { useDeletePostMutation } from '../features/posts/postsApi'; // Import the useDeletePostMutation hook

const Post = ({ post }) => {
  const [deletePost, { isLoading }] = useDeletePostMutation(); // Initialize the delete mutation

  const handleDelete = async () => {
    try {
      await deletePost(post.post_id); // Execute the delete mutation with the post ID
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <article className="card" key={post._id}>
      <h3>{post.post_title}</h3>
      <p>{post.post_content.substring(0, 100)}</p>
      <p>Author: {post.author_id}</p>
      <button onClick={handleDelete} disabled={isLoading}> {/* Disable button during loading */}
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>
    </article>
  );
};

export default Post;
