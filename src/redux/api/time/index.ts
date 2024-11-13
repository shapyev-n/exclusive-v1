import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTime: builder.query<TIME.GetTimeResponse, TIME.GetTimeRequest>({
      query: () => ({
        url: `/get/time`,
        method: "GET",
      }),
      providesTags: ["time"],
    }),
    updateTime: builder.mutation<TIME.PostTimeResponse, TIME.PostTimeRequest>({
      query: (data) => ({
        url: `/get/time`,
        method: "GET",
        body: data,
      }),
      invalidatesTags: ["time"],
    }),
  }),
});

export const { useGetTimeQuery, useUpdateTimeMutation } = api;
