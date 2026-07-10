import { TQuery } from "@/interface/query";
import baseApi from "../baseApi";

const routeApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // CREATE ROUTE
    createRoute: builder.mutation({
      query: (data) => ({
        url: "/route/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ROUTE"],
    }),

    // GET ALL ROUTE
    getAllRoute: builder.query({
      query: (query: TQuery) =>
        `/route/all?page=${query?.page}&limit=${query?.limit}&search=${query.search}`,
      providesTags: ["ROUTE"],
    }),

    // GET SINGLE ROUTE
    getSingleRoute: builder.query({
      query: (id: string) => `/route/single/${id}`,
      providesTags: ["ROUTE"],
    }),
  }),
});

export const {
  useCreateRouteMutation,
  useGetAllRouteQuery,
  useGetSingleRouteQuery,
} = routeApi;
