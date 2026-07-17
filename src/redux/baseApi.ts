import { getToken } from "@/service/auth.services";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "Permission",
    "STAFF_TYPE",
    "STATION",
    "COACH_MODEL",
    "COACH",
    "ROUTE",
    "TRAIN",
    "SCHEDULE",
  ],
});

export default baseApi;
