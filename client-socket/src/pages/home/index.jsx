import { Matches } from '@/components/matches';
import { Header } from '@/components/header';

export const HomePage = () => {
  return (
    <main className='bg-slate-400 h-screen dark:bg-gray-800 flex flex-col justify-center items-center'>
      <Header />
      <Matches />
    </main>
  );
};
