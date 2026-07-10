import { TQuery } from "@/interface/query";
import baseApi from "../baseApi";

const coachApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // CREATE COACH
    createCoach: builder.mutation({
      query: (data) => ({
        url: "/coach/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["COACH"],
    }),

    // GET ALL COACH
    getAllCoach: builder.query({
      query: (payload: TQuery) =>
        `/coach/all?search=${payload.search}&page=${payload?.page}&limit=${payload?.limit}`,
      providesTags: ["COACH"],
    }),

    // GET SINGLE COACH
    getCoachOptions: builder.query({
      query: () => `/coach/options`,
      providesTags: ["COACH"],
    }),

    // GET SINGLE COACH
    getSingleCoach: builder.query({
      query: (id: string) => `/coach/single/${id}`,
      providesTags: ["COACH"],
    }),
  }),
});

export const {
  useCreateCoachMutation,
  useGetAllCoachQuery,
  useGetSingleCoachQuery,
  useGetCoachOptionsQuery,
} = coachApi;
