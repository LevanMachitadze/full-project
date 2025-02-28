"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/app/lib/axiosInstance";
import { getCookie, setCookie } from "cookies-next";

const employeeSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  // name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  // surname: z
  //   .string()
  //   .min(2, { message: 'Surname must be at least 2 characters' }),
  // birthDate: z.string().nonempty({ message: 'Birth date is required' }),
  // idNumber: z.string().length(11, { message: 'ID number must be 11 digits' }),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

export default function AddEmployee() {
  const [showAddAnother, setShowAddAnother] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: EmployeeFormData) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const token = getCookie("accessToken");
      const response = await axiosInstance.post("/company/add-employee", data, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("API Response:", response);
      if (response.status === 201) {
        // localStorage.setItem('token', response.data.token);
        setCookie("accessToken", response.data.accessToken, {
          maxAge: 60 * 60,
        });
        router.push("/current-company/verify");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "verify failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add Employee</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full rounded border px-3 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>
          {/* 
          <div className='flex space-x-2'>
            <div className='w-1/2'>
              <input
                type='text'
                placeholder='Name'
                {...register('name')}
                className='w-full rounded border px-3 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {errors.name && (
                <p className='text-red-400 text-sm'>{errors.name.message}</p>
              )}
            </div>
            <div className='w-1/2'>
              <input
                type='text'
                placeholder='Surname'
                {...register('surname')}
                className='w-full rounded border px-3 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              {errors.surname && (
                <p className='text-red-400 text-sm'>{errors.surname.message}</p>
              )}
            </div>
          </div>

          <div>
            <input
              type='date'
              {...register('birthDate')}
              className='w-full rounded border px-3 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.birthDate && (
              <p className='text-red-400 text-sm'>{errors.birthDate.message}</p>
            )}
          </div>

          <div>
            <input
              type='text'
              placeholder='ID Number'
              {...register('idNumber')}
              className='w-full rounded border px-3 py-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.idNumber && (
              <p className='text-red-400 text-sm'>{errors.idNumber.message}</p>
            )}
          </div> */}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Add Employee
          </Button>
        </form>

        {/* {showAddAnother && (
          <div className='mt-6 p-4 bg-gray-700 rounded-lg text-center'>
            <p className='mb-2'>Employee added successfully!</p>
            <Button
              onClick={() => setShowAddAnother(false)}
              className='bg-green-600 hover:bg-green-700'
            >
              Add Another Employee
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
}
