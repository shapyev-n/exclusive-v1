import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<AUTH.GetMeResponse, AUTH.GetMeRequest>({
      query: () => ({
        url: `/auth/get-me`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    login: builder.mutation<AUTH.LoginResponse, AUTH.LoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
       signup: builder.mutation<AUTH.SignupResponse, AUTH.SignupRequest>({
      query: (data) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation, useSignupMutation } = api;
