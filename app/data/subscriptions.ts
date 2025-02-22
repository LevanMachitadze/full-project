export const subscriptions = {
  free: {
    name: 'Free Tier',
    description: 'Upload up to 10 files and have 1 employee.',
    price: 'Free',
    files: 10,
    employees: 1,
    backgroundColor: 'bg-gray-400',
  },
  basic: {
    name: 'Basic',
    description:
      'Upload up to 100 files and have 0-10 employees. $5 per employee/month.',
    price: '$5/employee',
    files: 100,
    employees: '0-10',
    backgroundColor: 'bg-blue-600',
  },
  premium: {
    name: 'Premium',
    description:
      'Upload up to 1000 files and have unlimited employees. $300/month. $0.5 per extra file over 1000.',
    price: '$300/month',
    files: 1000,
    employees: 'Unlimited',
    backgroundColor: 'bg-yellow-500',
  },
};
