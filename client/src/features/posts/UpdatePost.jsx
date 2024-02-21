import { useUpdatePostMutation } from "./postsApi";
import { useState } from "react";
import ReactDOM from "react-dom";

const UpdatePost = ({ post, onClose }) => {
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [title, setTitle] = useState(post.post_title);
  const [content, setContent] = useState(post.post_content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePost({
        id: post.post_id,
        post_title: title,
        post_content: content,
        author_id: 1,
      });
      onClose(); // Close the modal after updating
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  // Create a portal container outside the component's parent
  const portalContainer = document.getElementById("portal-container");
  if (!portalContainer) {
    console.error("Portal container not found.");
    return null;
  }

  return ReactDOM.createPortal(
    <div className="section-container">
          <section className="modal-form">
      <h3>Update Your Post</h3>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-input" htmlFor="postTitle">
          Title:
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="form-input" htmlFor="postContent">
          Content:
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <div className="button-container">
          <button className="green" type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Post"}
          </button>
          <button className="red" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </section>
    </div>
,
    portalContainer
  );
};

export default UpdatePost;