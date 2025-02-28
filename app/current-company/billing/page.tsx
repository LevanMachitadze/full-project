"use client";
import { axiosInstance } from "@/app/lib/axiosInstance";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Billing = () => {
  type BType = {
    totalCost: number;
    message: string;
    basePrice: number;
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [billing, setBilling] = useState<BType | null>(null);
  const router = useRouter();

  const onSubmit = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const token = getCookie("accessToken");

      if (!token) {
        throw new Error("No access token found.");
      }
      console.log(token, "token");
      const res = await axiosInstance.get("/company/billing-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res, "res");

      setBilling(res.data);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Billing failed");
    } finally {
      setLoading(false);
    }
  };

  console.log(billing, "billing");

  return (
    <div className="flex flex-col justify-center items-center max-w-[1440px] w-full m-auto h-screen">
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mb-4"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Billing Info"}
      </button>

      <div className="max-w-[500px] w-full bg-white min-h-[200px] rounded-xl flex flex-col justify-center items-center p-4">
        {billing?.totalCost ? (
          <div>
            <h1>{billing?.message}</h1>
          </div>
        ) : (
          <p className="text-gray-500">No billing data available.</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-base italic font-medium">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Billing;
