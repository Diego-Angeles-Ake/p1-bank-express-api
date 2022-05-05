import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1' }),
  tagTypes: ['Transfer'],
  endpoints: (builder) => ({
    signUser: builder.mutation({
      query: (data) => ({
        url: '/users/signup',
        method: 'POST',
        body: data,
      }),
    }),
    logUser: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Transfer'],
    }),
    getTranfers: builder.query({
      query: (id) => `/users/${id}/history`,
      providesTags: ['Transfer'],
    }),
    getUserInfo: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ['Transfer'],
    }),
    createTransfer: builder.mutation({
      query: (data) => ({
        url: '/transfers',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Transfer'],
    }),
  }),
});

export const {
  useSignUserMutation,
  useLogUserMutation,
  useGetTranfersQuery,
  useGetUserInfoQuery,
  useCreateTransferMutation,
} = apiSlice;
