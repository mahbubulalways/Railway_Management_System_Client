import { TQuery } from "@/interface/query";
import baseApi from "../baseApi";

const trainApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // CREATE TRAIN
    createTrain: builder.mutation({
      query: (data) => ({
        url: "/train/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TRAIN"],
    }),

    // GET ALL TRAIN
    getAllTrain: builder.query({
      query: (query: TQuery) =>
        `/train/all?page=${query?.page}&limit=${query?.limit}&search=${query.search}`,
      providesTags: ["TRAIN"],
    }),

    // GET SINGLE TRAIN
    getSingleTrain: builder.query({
      query: (id: string) => `/train/single/${id}`,
      providesTags: ["TRAIN"],
    }),

    // ADD COACH TO TRAIN
    addCoachsToTrain: builder.mutation({
      query: (data) => ({
        url: "/train/add-coach",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TRAIN"],
    }),
  }),
});

export const {
  useCreateTrainMutation,
  useGetAllTrainQuery,
  useGetSingleTrainQuery,
  useAddCoachsToTrainMutation,
} = trainApi;
