import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  tagTypes: ["Category", "AdminCategories"],

  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (params) => ({
        url: "/categories",
        params: {
          category: params?.category,
        },
      }),
    }),
    getCategoryDetails: builder.query({
      query: (id) => `/category/${id}`,
    }),
    getAdminCategories: builder.query({
      query: () => `/admin/categories`,
      providesTags: ["AdminCategories"],
    }),
    createCategory: builder.mutation({
      query(body) {
        return {
          url: "/admin/categories",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AdminCategories"],
    }),
    updateCategory: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/category/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Category", "AdminCategories"],
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  useGetAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryDetailsQuery,
} = categoryApi;
