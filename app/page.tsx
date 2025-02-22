'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleSelection = (role: 'company' | 'employee') => {
    if (role === 'company') {
      router.push('/auth');
    } else {
      router.push('/employee');
    }
    closeModal();
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-transparent'>
      <div className='text-center text-white px-6 sm:px-8 md:px-12 lg:px-16'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8'>
          Welcome to Our Swift Website!
        </h1>
        <p className='text-lg sm:text-xl md:text-2xl mb-8'>
          Ready to get started? Click below to begin.
        </p>
        <button
          onClick={openModal}
          className='bg-blue-500 text-white py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-xl'
        >
          Get Started
        </button>
      </div>

      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={closeModal}
          className='fixed inset-0 z-50'
        >
          <div className='flex justify-center items-center min-h-screen bg-black bg-opacity-50'>
            <Dialog.Panel className='bg-white p-6 sm:p-8 md:p-10 lg:p-12 w-80 sm:w-96 md:w-1/2 lg:w-1/3'>
              <h2 className='text-2xl sm:text-3xl font-bold text-center mb-6'>
                Choose Your Role
              </h2>
              <div className='space-y-4'>
                <button
                  onClick={() => handleSelection('company')}
                  className='w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all'
                >
                  Company
                </button>
                <button
                  onClick={() => handleSelection('employee')}
                  className='w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all'
                >
                  Employee
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Home;
