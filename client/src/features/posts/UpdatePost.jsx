import { useUpdatePostMutation } from "./postsApi";
import { useState } from "react";

const UpdatePost = () => {
  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postId, setPostId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (postId === "" || title === "" || content === "") {
        alert("Please fill in all fields");
      } else {
        await updatePost({
          id: postId,
          post_title: title,
          post_content: content,
          author_id: 1,
        });
        closeModal();
      }
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  return (
    <section className="modal-form">
      <h3>Update Your Post</h3>
      <button className="b-t-n" onClick={openModal}>Click Me to Update your post</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <form onSubmit={handleSubmit} className="form">
              <label className="form-input" htmlFor="postId">
                Post ID:
                <input
                  type="text"
                  id="postId"
                  name="postId"
                  value={postId}
                  onChange={(e) => setPostId(e.target.value)}
                />
              </label>
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
                <button className="red" type="button" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default UpdatePost;
