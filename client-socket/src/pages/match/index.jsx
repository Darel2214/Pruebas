import { Header } from '@/components/header';
import { Match } from '@/components/match';

export const MatchPage = () => {
  return (
    <main className='bg-slate-400 h-screen dark:bg-gray-800 flex flex-col justify-center items-center'>
      <Header />

      <Match />
    </main>
  );
};
