import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Auth"] as const,
  endpoints: (builder) => ({
    fetchUser: builder.query<void, void>({
      query: () => "/current_user",
      providesTags: ["Auth"],
    }),
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({ query: (body) => ({ url: "/login", method: "POST", body }) }),
    logoutUser: builder.mutation<void, void>({
      query: () => "/logout",
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useFetchUserQuery, useLogoutUserMutation } = authApi;
