import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productDataApi = createApi({
  reducerPath: "storeAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.escuelajs.co/api/v1/" }),
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: (name) => ({
        url: name,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductListQuery } = productDataApi;
