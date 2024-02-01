import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/create-product",
        method: "POST",
        body: productInfo,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
} = productsApi;
