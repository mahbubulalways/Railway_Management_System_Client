import baseApi from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    sellerRegister: builder.mutation({
      query: (data) => ({
        url: "/accounts/register/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useSellerRegisterMutation } = authApi;
