import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ramApi = createApi({
  reducerPath: "ramsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  tagTypes: ["Ram", "AdminRams"],

  endpoints: (builder) => ({
    getRams: builder.query({
      query: (params) => ({
        url: "/rams",
        params: {
          ram: params?.ram,
        },
      }),
    }),
    getRamDetails: builder.query({
      query: (id) => `/ram/${id}`,
    }),
    getAdminRams: builder.query({
      query: () => `/admin/rams`,
      providesTags: ["Adminrams"],
    }),
    createRam: builder.mutation({
      query(body) {
        return {
          url: "/admin/rams",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AdminRams"],
    }),
    updateRam: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/ram/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Ram", "AdminRams"],
    }),
  }),
});
export const {
  useGetRamsQuery,
  useGetAdminRamsQuery,
  useCreateRamMutation,
  useUpdateRamMutation,
  useGetRamDetailsQuery,
} = ramApi;
