import { DEMANDS_URL } from "../constant";
import { apiSlice } from "./apiSlice";

const demandsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDemands: builder.query({
      query: () => ({
        url: DEMANDS_URL,
      }),
      providesTags: ["Demand"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetDemandsQuery } = demandsSlice;
