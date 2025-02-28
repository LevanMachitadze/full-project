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
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function EmployeeSignIn() {
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
      const res = await axiosInstance.post("/employees-auth/sign-in", data);

      if (res.status === 201) {
        setCookie("accessToken", res.data.accessToken, { maxAge: 60 * 60 });

        router.push("/employee");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-56">
      <div className="max-w-[500px] w-full bg-white p-7 rounded-xl">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Sign In</h2>

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
                type="password"
                placeholder="Password"
                {...register("password")}
                className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.password ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full rounded px-4 py-2 text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
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
      </div>
    </div>
  );
}
