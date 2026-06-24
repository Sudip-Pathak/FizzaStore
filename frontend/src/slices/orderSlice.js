import { ORDER_URL } from "../constant";
import PlaceOrderPage from "../pages/PlaceOrderPage";
import { apiSlice } from "./apiSlice";

const orderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDER_URL}/addorder`, // // The addorder comes from backend > routes > order.router.js
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/myorders`, // // Comes from backend controller > product.controller.js > getMyOrders (calling the api)
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: ORDER_URL, // // calling api for all the orders for the pages > admin > OrdersPage.jsx
      }),
    }),
    // // calling the api from routes > order.router.js which comes from oder.controller.js
    updateOrderStatus: builder.mutation({
      query: (data) => ({
        url: `${ORDER_URL}/${data.id}/updatestatus`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrderByIdQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderSlice;
