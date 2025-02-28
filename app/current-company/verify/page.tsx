"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { axiosInstance } from "../../lib/axiosInstance";

const signInSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  otpCode: z.string().length(6, { message: "OTP code must be 6 digits" }),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function Verify() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await axiosInstance.post("/employees-auth/verify", data);

      if (res.status === 201) {
        setCookie("accessToken", res.data.accessToken, { maxAge: 60 * 60 });
        router.push("/current-company/sign-in");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-56">
      <div className="max-w-[500px] w-full bg-white p-7 rounded-xl">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Verify</h2>

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <InputField label="First Name" register={register("firstName")} error={errors.firstName} />
            <InputField label="Last Name" register={register("lastName")} error={errors.lastName} />
            <InputField type="email" label="Email" register={register("email")} error={errors.email} />
            <InputField type="password" label="Password" register={register("password")} error={errors.password} />
            <InputField type="text" label="OTP Code" register={register("otpCode")} error={errors.otpCode} />

            <button
              type="submit"
              className={`w-full rounded px-4 py-2 text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
            <Link href="/current-company/resend-verification">
            <button
              type="submit"
              className={`w-full rounded px-4 py-2 text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled={loading}
            >
             Resend Verification
            </button>
            </Link>
          </form>

          <p className="text-center text-sm">
            Don't have an account?
            <Link href="/auth/sign-up" className="text-blue-600 hover:underline ml-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


function InputField({ type = "text", label, register, error }: any) {
  return (
    <div>
      <input
        type={type}
        placeholder={label}
        {...register}
        className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
          error ? "border-red-500" : "focus:ring-blue-500"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
