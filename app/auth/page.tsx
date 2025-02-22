import Link from 'next/link';

export default function AuthPage() {
  return (
    <div>
      <div className='w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl text-center'>
        <h1 className='text-3xl font-bold text-gray-900'>Welcome to Swift</h1>
        <p className='mt-3 text-gray-600'>
          Please sign in or create an account to continue.
        </p>

        <div className='mt-6 '>
          <Link href='/auth/sign-in'>
            <button className='w-full rounded-lg bg-blue-600 px-6 py-3 mb-2 text-white text-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'>
              Sign In
            </button>
          </Link>
          <Link href='/auth/sign-up'>
            <button className='w-full rounded-lg bg-green-600 px-6 py-3 text-white text-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-green-700 focus:ring-4 focus:ring-green-300'>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
