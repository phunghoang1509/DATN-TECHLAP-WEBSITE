import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const colorsApi = createApi({
  reducerPath: "colorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  tagTypes: ["Color", "AdminColors"],

  endpoints: (builder) => ({
    getColors: builder.query({
      query: (params) => ({
        url: "/colors",
        params: {
          color: params?.color,
        },
      }),
    }),
    getColorDetails: builder.query({
      query: (id) => `/color/${id}`,
    }),
    getAdminColors: builder.query({
      query: () => `/admin/colors`,
      providesTags: ["AdminColors"],
    }),
    createColor: builder.mutation({
      query(body) {
        return {
          url: "/admin/colors",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AdminColors"],
    }),
    updateColor: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/color/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Color", "AdminColors"],
    }),
  }),
});
export const {
  useGetColorsQuery,
  useGetAdminColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useGetColorDetailsQuery,
} = colorsApi;
