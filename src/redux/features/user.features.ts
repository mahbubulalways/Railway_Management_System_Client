import baseApi from "../baseApi";

const userApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createStaffAccount: builder.mutation({
      query: (data) => ({
        url: "/user/create-staff",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["STAFF"],
    }),

    getStaffSidebarOptions: builder.query({
      query: () => `/user/options`,
    }),
  }),
});

export const { useCreateStaffAccountMutation, useGetStaffSidebarOptionsQuery } =
  userApi;
