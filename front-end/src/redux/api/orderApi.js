import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Order", "AdminOrders"],
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: "/orders/new",
          method: "POST",
          body,
        };
      },
    }),
    MyOrders: builder.query({
      query: () => `/me/orders`,
    }),
    orderDetails: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ["Order"],
    }),
    stripeCheckoutSession: builder.mutation({
      query(body) {
        return {
          url: "/payment/checkout_session",
          method: "POST",
          body,
        };
      },
    }),
    getDashboardSales: builder.query({
      query: ({ startDate, endDate }) =>
        `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
    }),
    getAminOrders: builder.query({
      query: () => `/admin/orders`,
      providesTags: ["AdminOrders"],
    }),
    updateOrder: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/orders/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query(id) {
        return {
          url: `/admin/orders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminOrders"],
    }),
    deleteMyOrder: builder.mutation({
      query(id) {
        return {
          url: `/me/orders/${id}`,
          method: "DELETE",
        };
      },
    }),
    updateOrderMe: builder.mutation({
      query(id) {
        return {
          url: `/me/orders/${id}`,
          method: "PUT",
        };
      },
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useLazyGetDashboardSalesQuery,
  useStripeCheckoutSessionMutation,
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useGetAminOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useDeleteMyOrderMutation,
  useUpdateOrderMeMutation,
} = orderApi;
