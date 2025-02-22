export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
        {children}
      </div>
    </div>
  );
}
