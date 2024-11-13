import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getSearch: builder.query({
      query: (query) => ({
        url: "/search",
        method: "GET",
        params: { q: query },
      }),
      providesTags: ["search"],
    }),
  }),
});

export const { useGetSearchQuery } = api;
