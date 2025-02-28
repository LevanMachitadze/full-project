"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { axiosInstance } from "../../lib/axiosInstance";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  otpCode: z.string().min(6, { message: "otp code is required" }),
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
      const res = await axiosInstance.post("/auth/verify", data);

      if (res.status === 201) {
        setCookie("accessToken", res.data.accessToken, { maxAge: 60 * 60 });

        router.push("/auth/sign-in");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Verify </h2>

      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="otpCode"
            {...register("otpCode")}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.otpCode ? "border-red-500" : "focus:ring-blue-500"
            }`}
          />
          {errors.otpCode && (
            <p className="text-red-500 text-sm">{errors.otpCode.message}</p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full rounded px-4 py-2 text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Verify..." : "Verify"}
        </button>
      </form>

      <p className="text-center text-sm">
        Don't have an account?
        <Link
          href="/auth/sign-up"
          className="text-blue-600 hover:underline ml-1"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
