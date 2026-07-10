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
  }),
});

export const {
  useGetStaffTypesQuery,
  useCreateStaffTypeMutation,
  useGetSingleStaffTypeQuery,
} = staffTypeApi;
