'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/app/components/loader';

export default function UploadPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      toast.success('File uploaded successfully!');
    }
  };

  return (
    <div className='min-h-screen flex flex-col justify-center items-center py-12 px-6'>
      <Link
        href='/current-company'
        className='absolute top-6 left-6 text-white px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out'
      >
        Back
      </Link>

      <div className='bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-8 space-y-6'>
        <h2 className='text-3xl text-white text-center font-semibold'>
          Upload a File
        </h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor='file' className='text-white mb-2'>
              Select File:
            </label>
            <input
              type='file'
              id='file'
              onChange={handleFileChange}
              className='block w-full text-sm text-gray-400 file:border-0 file:text-white file:rounded-lg file:bg-blue-600 file:px-4 file:py-2 file:cursor-pointer hover:file:bg-blue-700 transition-all duration-300 ease-in-out'
            />
          </div>

          {file && (
            <div className='text-sm text-white mt-2'>
              <span className='font-semibold'>Selected File: </span>
              {file.name}
            </div>
          )}

          <button
            type='submit'
            className='w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out'
          >
            Upload
          </button>
        </form>
      </div>

      <ToastContainer position='bottom-right' />
    </div>
  );
}
