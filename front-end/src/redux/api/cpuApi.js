import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cpuApi = createApi({
  reducerPath: "cpusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  tagTypes: ["Cpu", "AdminCpus"],

  endpoints: (builder) => ({
    getCpu: builder.query({
      query: (params) => ({
        url: "/cpus",
        params: {
          cpu: params?.cpu,
        },
      }),
    }),
    getCpuDetails: builder.query({
      query: (id) => `/cpu/${id}`,
    }),
    getAdminCpus: builder.query({
      query: () => `/admin/cpus`,
      providesTags: ["AdminCpus"],
    }),
    createCpu: builder.mutation({
      query(body) {
        return {
          url: "/admin/cpus",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AdminCpus"],
    }),
    updateCpu: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/cpu/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Cpu", "AdminCpus"],
    }),
  }),
});
export const {
  useGetCpuQuery,
  useGetAdminCpusQuery,
  useCreateCpuMutation,
  useUpdateCpuMutation,
  useGetCpuDetailsQuery,
} = cpuApi;
