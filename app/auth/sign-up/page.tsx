'use client';

import { useForm } from 'react-hook-form';

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-bold text-center'>Sign Up</h2>

      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type='text'
            placeholder='Name of Company'
            {...register('companyName', {
              required: 'Company Name is required',
            })}
            className='w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.companyName && (
            <p className='text-red-500 text-sm'>{errors.companyName.message}</p>
          )}
        </div>

        <div>
          <input
            type='email'
            placeholder='Email'
            {...register('email', { required: 'Email is required' })}
            className='w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type='password'
            placeholder='Password'
            {...register('password', { required: 'Password is required' })}
            className='w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.password && (
            <p className='text-red-500 text-sm'>{errors.password.message}</p>
          )}
        </div>

        <div>
          <input
            type='text'
            placeholder='Country'
            {...register('country', { required: 'Country is required' })}
            className='w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.country && (
            <p className='text-red-500 text-sm'>{errors.country.message}</p>
          )}
        </div>

        <div>
          <input
            type='text'
            placeholder='Industry'
            {...register('industry', { required: 'Industry is required' })}
            className='w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.industry && (
            <p className='text-red-500 text-sm'>{errors.industry.message}</p>
          )}
        </div>

        <button
          type='submit'
          className='w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700'
        >
          Sign Up
        </button>
      </form>

      <p className='text-center text-sm'>
        Already have an account?
        <a href='/auth/sign-in' className='text-blue-600 hover:underline ml-1'>
          Sign In
        </a>
      </p>
    </div>
  );
}
