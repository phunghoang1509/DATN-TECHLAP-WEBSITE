import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const graphicCardApi = createApi({
  reducerPath: "graphicCardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  tagTypes: ["GraphicCard", "AdminGraphicCards"],

  endpoints: (builder) => ({
    getGraphicCards: builder.query({
      query: (params) => ({
        url: "/graphicCards",
        params: {
          graphicCard: params?.graphicCard,
        },
      }),
    }),
    getGraphicCardDetails: builder.query({
      query: (id) => `/graphicCard/${id}`,
    }),
    getAdminGraphicCards: builder.query({
      query: () => `/admin/graphicCards`,
      providesTags: ["AdminGraphicCards"],
    }),
    createGraphicCard: builder.mutation({
      query(body) {
        return {
          url: "/admin/graphicCards",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AdminGraphicCards"],
    }),
    updateGraphicCard: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/graphicCard/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["GraphicCard", "AdminGraphicCards"],
    }),
  }),
});
export const {
  useGetGraphicCardsQuery,
  useGetAdminGraphicCardsQuery,
  useCreateGraphicCardMutation,
  useUpdateGraphicCardMutation,
  useGetGraphicCardDetailsQuery,
} = graphicCardApi;
