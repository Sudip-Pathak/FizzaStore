import { PRODUCT_URL, UPLOAD_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getProducts: builder.query({
    //   query: () => ({
    //     url: PRODUCT_URL,
    //   }),
    //   providesTags: ["Product"], // // It is alsi used for caching data like refetch. Helps to link with the particular tag for caching.
    //   keepUnusedDataFor: 10, // // time that remians the loaded data in the cache (standard: 60s). So, that loaded data will not load in the time frame if clicked again.
    // }),

    // // the same above code but edited for adding pagination.
    getProducts: builder.query({
      query: ({ keyword, pageNumber, pageSize }) => ({
        url: PRODUCT_URL,
        params: { keyword, pageNumber, pageSize },
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 10,
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
      }),
      keepUnusedDataFor: 10,
    }),
    addProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"], // // When api is called, this will say that the product data is invalid and refetch it again. Means the cache has the exisitg data,
      // // clear that a update the new data after new data is updated.This helps to update and display the new data without page refersh as well as display the existing data as it is.
    }),
    bulkAddProducts: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/bulk`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data._id}`, // // This is done to for update button to update the product in ProductEditPage.jsx by calling the api from backend > controller > product.controller.js > upateProduct
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (formData) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: formData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data._id}/addreview`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/topproducts`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAdminStats: builder.query({
      query: () => ({
        url: `${PRODUCT_URL}/stats`,
      }),
      keepUnusedDataFor: 30,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useAddReviewMutation,
  useGetTopProductsQuery,
  useBulkAddProductsMutation,
  useGetAdminStatsQuery,
} = productSlice;
