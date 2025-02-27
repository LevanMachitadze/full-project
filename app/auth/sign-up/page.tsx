'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import Link from 'next/link';

const signUpSchema = z.object({
  companyName: z.string().nonempty({ message: 'Company Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  country: z.string().nonempty({ message: 'Country is required' }),
  industry: z.string().nonempty({ message: 'Industry is required' }),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post(
        'http://localhost:3001/auth/sign-up',
        data
      );

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);

        router.push('/auth/sign-in');
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Sign-up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold text-center'>Sign Up</h2>

      {errorMessage && (
        <p className='text-red-500 text-center'>{errorMessage}</p>
      )}

      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type='text'
            placeholder='Company Name'
            {...register('companyName')}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.companyName ? 'border-red-500' : 'focus:ring-blue-500'
            }`}
          />
          {errors.companyName && (
            <p className='text-red-500 text-sm'>{errors.companyName.message}</p>
          )}
        </div>

        <div>
          <input
            type='email'
            placeholder='Email'
            {...register('email')}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500' : 'focus:ring-blue-500'
            }`}
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type='password'
            placeholder='Password'
            {...register('password')}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.password ? 'border-red-500' : 'focus:ring-blue-500'
            }`}
          />
          {errors.password && (
            <p className='text-red-500 text-sm'>{errors.password.message}</p>
          )}
        </div>

        <div>
          <input
            type='text'
            placeholder='Country'
            {...register('country')}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.country ? 'border-red-500' : 'focus:ring-blue-500'
            }`}
          />
          {errors.country && (
            <p className='text-red-500 text-sm'>{errors.country.message}</p>
          )}
        </div>

        <div>
          <input
            type='text'
            placeholder='Industry'
            {...register('industry')}
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.industry ? 'border-red-500' : 'focus:ring-blue-500'
            }`}
          />
          {errors.industry && (
            <p className='text-red-500 text-sm'>{errors.industry.message}</p>
          )}
        </div>

        <button
          type='submit'
          className={`w-full rounded px-4 py-2 text-white ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      <p className='text-center text-sm'>
        Already have an account?
        <Link
          href='/auth/sign-in'
          className='text-blue-600 hover:underline ml-1'
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
