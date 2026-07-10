import baseApi from "../baseApi";

const stationApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET ALL STATIONS
    getAllStations: builder.query({
      query: (payload) =>
        `/station/public?search=${payload.search}&page=${payload?.page}&limit=${payload?.limit}`,
      providesTags: ["STATION"],
    }),
    // GET SINGLE STATION
    getSingleStation: builder.query({
      query: (id) => `/station/public/${id}`,
      providesTags: ["STATION"],
    }),

    // GET STATION OPTIONS
    getStationOptins: builder.query({
      query: () => `/station/options`,
      providesTags: ["STATION"],
    }),
    // CREATE STATION
    createStation: builder.mutation({
      query: (data) => ({
        url: "/station/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["STATION"],
    }),
  }),
});

export const {
  useGetAllStationsQuery,
  useGetSingleStationQuery,
  useCreateStationMutation,
  useGetStationOptinsQuery,
} = stationApi;
