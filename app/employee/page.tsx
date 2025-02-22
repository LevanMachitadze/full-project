'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .nonempty({ message: 'Password is required' }),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
        <div className='space-y-6'>
          <h2 className='text-2xl font-bold text-center'>Sign In</h2>
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type='email'
                placeholder='Email'
                {...register('email')}
                className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </div>
            <button
              type='submit'
              className='w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
