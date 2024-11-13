import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getCategoriesProduct: builder.query<
      CATEGORY.GetCategoriesResponse,
      CATEGORY.GetCategoriesRequest
    >({
      query: (category) => ({
        url: `/get/get-categories/${category}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});

export const { useGetCategoriesProductQuery } = api;
