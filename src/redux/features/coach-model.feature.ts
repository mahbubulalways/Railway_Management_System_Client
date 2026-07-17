import { TQuery } from "@/interface/query";
import baseApi from "../baseApi";

const coachModelApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET COACH MODEL OPTIONS
    getCoachModelOptions: builder.query({
      query: () => `/coach-model/options`,
      providesTags: ["COACH_MODEL"],
    }),

    // GET ALL COACH MODEL
    getAllCoachModel: builder.query({
      query: (payload: TQuery) =>
        `/coach-model/all?search=${payload.search}&page=${payload?.page}&limit=${payload?.limit}`,
      providesTags: ["COACH_MODEL"],
    }),
    getSingleCoachModel: builder.query({
      query: (id: string) => `/coach-model/single/${id}`,
      providesTags: ["COACH_MODEL"],
    }),
    // CREATE COACH MODEL
    createCoachModel: builder.mutation({
      query: (data) => ({
        url: "/coach-model/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["COACH_MODEL"],
    }),
  }),
});

export const {
  useGetCoachModelOptionsQuery,
  useGetAllCoachModelQuery,
  useGetSingleCoachModelQuery,
  useCreateCoachModelMutation,
} = coachModelApi;
