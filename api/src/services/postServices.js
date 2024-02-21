import { poolRequest, closePool, sql } from '../utils/dbConnect.js';

export const getPostsService = async () => {
    try {
        const result = await poolRequest().query("SELECT * FROM tbl_post");
        return result.recordset;
    } catch (error) {
        return error.message;
    }
};
export const getPostByIdService = async (postid) => {
    try {
        const result = await poolRequest()
            .input('post_id', sql.Int, postid)
            .query("SELECT * FROM tbl_post WHERE post_id = @post_id");
        return result.recordset;
    } catch (error) {
        return error.message;
    }
};
export const deletePostService = async (postid) => {
    try {
        const result = await poolRequest()
            .input('post_id', sql.Int, postid)
            .query("DELETE FROM tbl_post WHERE post_id = @post_id");
        return result;
    } catch (error) {
        return error;
    }
};
export const addPostService = async (post) => {
    try {
        const result = await poolRequest()
            .input('post_title', sql.VarChar, post.post_title)
            .input('post_content', sql.VarChar, post.post_content)
            .input('author_id', sql.Int, post.author_id) // Assuming user_id is provided
            .query("INSERT INTO tbl_post (post_title, post_content, author_id) VALUES (@post_title, @post_content, @author_id)");
        return result;
    } catch (error) {
        return error;
    }
};
export const updatePostService = async (postid, post) => {
    try {
        const result = await poolRequest()
            .input('post_id', sql.Int, postid)
            .input('post_title', sql.VarChar, post.post_title)
            .input('post_content', sql.VarChar, post.post_content)
            .input('author_id', sql.Int, post.author_id)
            .query("UPDATE tbl_post SET post_title = @post_title, post_content = @post_content, author_id = @author_id WHERE post_id = @post_id");
        return result;
    } catch (error) {
        return error;
    }
};

export const completePostService = async (id) => {
    try {
        const result = await poolRequest()
            .input('id', sql.Int, id)
            .query("UPDATE tbl_post SET completed = 1 WHERE id = @id");
        return result;
    } catch (error) {
        return error;
    }
};
