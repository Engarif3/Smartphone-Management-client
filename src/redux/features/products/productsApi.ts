import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["deleteAProduct"],
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

    // we can also use return like this removing the first bracket and compare this with getSingleProduct: builder.query
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["deleteAProduct"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productsApi;
