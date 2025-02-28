'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Loader from '../components/loader';

const CurrentCompany = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen text-gray-100 p-6 relative'>
        <h1 className='text-3xl sm:text-4xl font-bold mb-8 text-center'>
          Welcome to Your Dashboard!
        </h1>
        <p className='text-lg sm:text-xl mb-12 text-center'>
          Manage your company settings and options below.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl'>
          <Link href='./current-company/subscriptionPlan'>
            <div className='flex flex-col min-h-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-6 px-8 rounded-lg shadow-lg text-center cursor-pointer'>
              <h2 className='text-xl sm:text-2xl font-semibold mb-4'>
                Choose Subscription
              </h2>
              <p className='text-base sm:text-lg'>
                Select your preferred subscription plan
              </p>
            </div>
          </Link>

          <Link href='/current-company/add-employees'>
            <div className='flex flex-col min-h-full bg-green-600 hover:bg-green-700 transition-all text-white py-6 px-8 rounded-lg shadow-lg text-center cursor-pointer'>
              <h2 className='text-xl sm:text-2xl font-semibold mb-4'>
                Add Employees
              </h2>
              <p className='text-base sm:text-lg'>
                Invite employees to join your organization
              </p>
            </div>
          </Link>

          <Link href='/current-company/upload-file'>
            <div className='flex flex-col min-h-full bg-yellow-600 hover:bg-yellow-700 transition-all text-white py-6 px-8 rounded-lg shadow-lg text-center cursor-pointer'>
              <h2 className='text-xl sm:text-2xl font-semibold mb-4'>
                Upload Files
              </h2>
              <p className='text-base sm:text-lg'>
                Upload important documents and files
              </p>
            </div>
          </Link>

          <Link href='/current-company/billing'>
            <div className='flex flex-col min-h-full bg-purple-600 hover:bg-purple-700 transition-all text-white py-6 px-8 rounded-lg shadow-lg text-center cursor-pointer'>
              <h2 className='text-xl sm:text-2xl font-semibold mb-4'>
                Billing
              </h2>
              <p className='text-base sm:text-lg'>
                Manage your billing and payment details
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CurrentCompany;
