import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hardDiskApi = createApi({
  reducerPath: "hardDisksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  tagTypes: ["HardDisk", "AdminHardDisk"],

  endpoints: (builder) => ({
    gethardDisks: builder.query({
      query: (params) => ({
        url: "/hardDisks",
        paHardDisks: {
          hardDisk: params?.hardDisk,
        },
      }),
    }),
    getHardDiskDetails: builder.query({
      query: (id) => `/hardDisk/${id}`,
    }),
    getAdminHardDisks: builder.query({
      query: () => `/admin/hardDisks`,
      providesTags: ["AdminHardDisks"],
    }),
    createHardDisk: builder.mutation({
      query(body) {
        return {
          url: "/admin/hardDisks",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AdminHardDisks"],
    }),
    updateHardDisk: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/hardDisk/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["HardDisk", "AdminHardDisks"],
    }),
  }),
});
export const {
  useGethardDisksQuery,
  useGetAdminHardDisksQuery,
  useCreateHardDiskMutation,
  useUpdateHardDiskMutation,
  useGetHardDiskDetailsQuery,
} = hardDiskApi;
