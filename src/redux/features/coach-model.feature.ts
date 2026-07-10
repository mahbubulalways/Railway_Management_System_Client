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
      query: () => `/coach-model/all`,
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
