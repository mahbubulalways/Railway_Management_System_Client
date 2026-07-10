// userLogin.ts
"use server";

import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import setAccessToken from "./setTokenCookie";
import { IToken } from "@/interface/token";

export const userLogin = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      },
    );
    const result = await res.json();

    if (result?.success) {
      await setAccessToken(result?.data?.token);
      const redirectPath = getRoleBaseRedirect(result?.data?.token);
      return { ...result, redirectPath };
    }
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getRoleBaseRedirect = (token: string) => {
  const info = jwtDecode(token) as IToken;
  switch (info?.role) {
    case "STAFF":
      return "/dashboard/staff";
    case "ADMIN":
      return "/dashboard/admin";
    case "SUPER_ADMIN":
      return "/dashboard/admin";
    default:
      return "/";
  }
};
