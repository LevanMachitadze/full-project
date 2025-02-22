'use client';
import { useState, useEffect } from 'react';

export default function Stars() {
  const totalStars = 150;
  const [divState, setDivState] = useState(Array(totalStars).fill('off'));

  useEffect(() => {
    const states = ['off', 'medium', 'high'];

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * totalStars);
      const nextState = states[Math.floor(Math.random() * states.length)];

      setDivState((prevStates) => {
        const newStates = [...prevStates];
        newStates[randomIndex] = nextState;
        return newStates;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='absolute inset-0 w-full h-full flex items-center justify-center'>
      <div className='switchboard'>
        {divState.map((state, i) => (
          <div key={i} data-light={true} data-state={state}></div>
        ))}
      </div>
    </div>
  );
}
