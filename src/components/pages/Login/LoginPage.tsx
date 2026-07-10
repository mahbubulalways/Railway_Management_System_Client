"use client";

import CustomInput from "@/components/reusable/CustomInput";
import { userLogin } from "@/service/actions/userLogin";
import { storeUserInLocalStorage } from "@/service/auth.services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type TLogin = {
  data: {
    auth: string;
    password: string;
  };
};

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    defaultValues: {
      data: { auth: "mhsabbir220@gmail.com", password: "12345678" },
    },
  });
  const router = useRouter();

  const onSubmt = async (data: FieldValues) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const result = await userLogin(data);
      setIsLoading(false);
      if (result?.success && result?.redirectPath) {
        storeUserInLocalStorage(result?.data?.token);
        router.push(result.redirectPath);
      } else {
        setErrorMsg(result?.message || "Something went wrong.");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error?.data?.message || "Something went wrong.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-2xl text-white">
            🚆
          </div>

          <h1 className="text-2xl font-bold text-black">Bangladesh Railway</h1>

          <p className="mt-2 text-sm text-gray-500">Login to your account</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmt)}>
          {errorMsg && (
            <p className="text-center text-sm text-red-500 mb-4">{errorMsg}</p>
          )}
          <div className="space-y-4">
            <CustomInput
              name="data.auth"
              placeholder="Enter email or phone number"
              register={register}
              error={errors.data?.auth}
              type="text"
              rules={{ required: "Email or phone number is required." }}
            />
            <CustomInput
              name="data.password"
              placeholder="Enter password"
              register={register}
              error={errors.data?.password}
              type="password"
              rules={{
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <label className="flex gap-2 text-gray-600 cursor-pointer w-max">
              <input type="checkbox" className="accent-green-600" />
              Remember me
            </label>

            <Link href="#" className="text-green-800 hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="
            w-full rounded-lg
            bg-green-700
            py-3
            font-semibold
            text-white
            transition
            cursor-pointer
            hover:bg-green-800
            disabled:bg-gray-500 
            disabled:cursor-default
            "
          >
            {isLoading ? "Logining" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?
          <Link href="/register" className="ml-1 font-semibold text-green-700">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
