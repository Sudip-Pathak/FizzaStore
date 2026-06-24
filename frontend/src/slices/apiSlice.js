// // We use this slice to call prodcuts and user api (or order api).

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // When sending FormData (file uploads), do NOT set Content-Type.
    // The browser must set it automatically with the correct multipart boundary.
    // fetchBaseQuery sets 'content-type: application/json' by default which breaks uploads.
    return headers;
  },
});

export const apiSlice = createApi({
  // // Creating api slice.
  baseQuery,
  tagTypes: ["Product", "User", "Order"], // // Used for caching the data so that in future data need not have to be reloaded.
  endpoints: (builder) => ({}),
});
