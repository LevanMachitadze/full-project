import Image from 'next/image';
import Stars from '../components/stars';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <div className='absolute inset-0 -z-20'>
        <Image
          src='/webBg2.jpg'
          alt='background'
          layout='fill'
          objectFit='cover'
          quality={100}
          priority
        />
      </div>

      <div className='absolute inset-0 -z-10 pointer-events-none'>
        <Stars />
      </div>

      <div className='relative z-10'>{children}</div>
    </div>
  );
}
