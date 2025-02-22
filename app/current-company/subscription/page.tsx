'use client';

import { useEffect, useState } from 'react';
import { subscriptions } from '../../data/subscriptions';
import Link from 'next/link';
import Loader from '@/app/components/loader';

const ChooseSubscription = () => {
  const [selectedSubscription, setSelectedSubscription] =
    useState<keyof typeof subscriptions>('free');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handleSubscriptionChange = (
    subscription: keyof typeof subscriptions
  ) => {
    setSelectedSubscription(subscription);
  };

  const currentSubscription = subscriptions[selectedSubscription];

  return (
    <>
      <div className='relative'>
        <Link
          href='/current-company'
          className='absolute top-6 left-6 text-white px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out'
        >
          Back
        </Link>

        <div className='flex flex-col items-center justify-center min-h-screen text-white p-6'>
          <h1 className='text-4xl font-bold mb-8 text-center'>
            Choose Your Subscription
          </h1>
          <p className='text-xl mb-12 text-center'>
            Select a subscription plan to fit your needs.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
            {Object.keys(subscriptions).map((key) => {
              const subscriptionKey = key as keyof typeof subscriptions;
              const { name, description, price, backgroundColor } =
                subscriptions[subscriptionKey];

              return (
                <div
                  key={key}
                  className={`${
                    selectedSubscription === subscriptionKey
                      ? 'border-4 border-blue-500'
                      : 'border'
                  } ${backgroundColor} hover:bg-opacity-80 transition-all text-white py-6 px-8 rounded-lg shadow-lg cursor-pointer`}
                  onClick={() => handleSubscriptionChange(subscriptionKey)}
                >
                  <input
                    type='radio'
                    id={key}
                    name='subscription'
                    value={key}
                    checked={selectedSubscription === subscriptionKey}
                    onChange={() => handleSubscriptionChange(subscriptionKey)}
                    className='hidden'
                  />
                  <h2 className='text-2xl font-semibold mb-4'>{name}</h2>
                  <p className='text-lg mb-4'>{description}</p>
                  <p className='text-lg font-semibold'>{price}</p>
                </div>
              );
            })}
          </div>

          <div className='mt-8'>
            <h2 className='text-3xl font-bold'>You have selected:</h2>
            <div className='mt-4'>
              <h3 className='text-2xl font-semibold'>
                {currentSubscription.name}
              </h3>
              <p className='text-lg'>{currentSubscription.description}</p>
              <p className='text-lg font-semibold'>
                {currentSubscription.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseSubscription;
