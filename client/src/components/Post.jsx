import { useUpdatePostMutation, useDeletePostMutation } from "../features/posts/postsApi";
import { useState } from "react";
import UpdatePost from "../features/posts/UpdatePost";

const Post = ({ post }) => {
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await deletePost(post.post_id);
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <article className="card" key={post._id}>
      <h3>{post.post_title}</h3>
      <p>{post.post_content.substring(0, 100)}</p>
      <p>Post ID: {post.post_id}</p>
      <p>Author: {post.author_id}</p>
      <button onClick={handleUpdate} disabled={isUpdating || isDeleting}>
        {isUpdating ? 'Updating...' : 'Update'}
      </button>
      <button className="reda" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>

      {isEditing && (
        <UpdatePost
          post={post}
          onClose={() => setIsEditing(false)}
        />
      )}
    </article>
  );
};

export default Post;

// UpdatePost component remains the same
