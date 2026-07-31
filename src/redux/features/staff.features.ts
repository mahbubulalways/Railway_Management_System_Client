import baseApi from "../baseApi";

const staffTypeApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET STAFF TYPES
    getStaffTypes: builder.query({
      query: (payload) =>
        `/staff-type/all?page=${payload?.page}&limit=${payload?.limit}`,
      providesTags: ["STAFF_TYPE"],
    }),

    // GET STAFF TYPES
    getSingleStaffType: builder.query({
      query: (id) => `/staff-type/single/${id}`,
      providesTags: ["STAFF_TYPE"],
    }),

    // CREATE StaffType
    createStaffType: builder.mutation({
      query: (data) => ({
        url: "/staff-type/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["STAFF_TYPE"],
    }),

    //  GET STAFF TYPE OPTIONS
    getStaffTypeOption: builder.query({
      query: () => `/staff-type/option`,
    }),

    // GET STAFF
    getAllStaff: builder.query({
      query: (payload) =>
        `/staff/all?page=${payload?.page}&limit=${payload?.limit}`,
      providesTags: ["STAFF"],
    }),

    // GET SINGLE STAFF
    getSingleStaff: builder.query({
      query: (id) => `/staff/single/${id}`,
      providesTags: ["STAFF"],
    }),

    // GET STAFFS OF A STATION (STATION MANAGER)
    getStaffOfAStation: builder.query({
      query: () => `/staff/station`,
    }),
  }),
});

export const {
  useGetStaffTypesQuery,
  useCreateStaffTypeMutation,
  useGetSingleStaffTypeQuery,
  useGetStaffTypeOptionQuery,
  useGetAllStaffQuery,
  useGetSingleStaffQuery,
  useGetStaffOfAStationQuery,
} = staffTypeApi;
