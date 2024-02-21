import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => 'posts',
      providesTags: ['Posts']
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post
      }),
      invalidatesTags: ['Posts']
    }),
    updatePost: builder.mutation({
      query: (post) => ({
        url: `posts/${post.id}`,
        method: 'PUT',
        body: post
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Posts'],
    })
  })
});

export const { useUpdatePostMutation,useDeletePostMutation, useGetPostsQuery, useAddPostMutation } = postsApi;
