import { TQuery } from "@/interface/query";
import baseApi from "../baseApi";

const permissionApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET PERMISSIONS
    getPermission: builder.query({
      query: (payload: TQuery) =>
        `/permission/all?page=${payload?.page}&limit=${payload?.limit}`,
      providesTags: ["Permission"],
    }),

    // GET ALL PERMISSIONS NOT PAGINATION FOR CREATE STAFF TYPE
    getAllPermissionForStaffType: builder.query({
      query: () => `/permission/all-permissions`,
      providesTags: ["Permission"],
    }),
    // CREATE PERMISSION
    createPermisison: builder.mutation({
      query: (data) => ({
        url: "/permission",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Permission"],
    }),
  }),
});

export const {
  useGetPermissionQuery,
  useCreatePermisisonMutation,
  useGetAllPermissionForStaffTypeQuery,
} = permissionApi;
