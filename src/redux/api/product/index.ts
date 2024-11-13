import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      PRODUCTS.GetProductsResponse,
      PRODUCTS.GetProductsRequest
    >({
      query: () => ({
        url: `/get/product`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    addToBasket: builder.mutation({
      query: (id) => ({
        url: `/add/basket`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["product"],
    }),
    getItemProduct: builder.query<
      PRODUCTS.getItemsResponse,
      PRODUCTS.getItemsRequest
    >({
      query: (id) => ({
        url: `/get/get-item/${id}`,
        method: "GET",
      }),
      providesTags: ["details"],
    }),

  }),
});

export const {
  useGetProductsQuery,
  useAddToBasketMutation,
  useGetItemProductQuery,
} = api;
