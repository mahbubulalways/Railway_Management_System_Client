import { TQuery } from "@/interface/query";
import baseApi from "../baseApi";

const scheduleApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // CREATE SCHEDULE
    createSchedule: builder.mutation({
      query: (data) => ({
        url: "/schedule/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SCHEDULE"],
    }),

    //  GET TRAIN ROUTE OPTIONS
    getTrainRouteOptions: builder.query({
      query: () => `/schedule/train-route-options`,
      providesTags: ["TRAIN", "ROUTE"],
    }),

    //  GET TRAIN ROUTE OPTIONS
    getAllSchedule: builder.query({
      query: (query: TQuery) =>
        `/schedule/all?page=${query?.page}&limit=${query?.limit}&search=${query.search}`,
      providesTags: ["SCHEDULE"],
    }),

    // GET SINGLE ROUTE
    getSingleRoute: builder.query({
      query: (id: string) => `/route/single/${id}`,
      providesTags: ["ROUTE"],
    }),
  }),
});

export const {
  useCreateScheduleMutation,
  useGetTrainRouteOptionsQuery,
  useGetSingleRouteQuery,
  useGetAllScheduleQuery,
} = scheduleApi;
