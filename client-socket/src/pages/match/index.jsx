import { useParams } from 'react-router-dom';

import { Header } from '@/components/header';
import { Match } from '@/components/match';

export const MatchPage = () => {
  const { id } = useParams();

  console.log('id', id);

  return (
    <main className='bg-slate-400 h-screen dark:bg-gray-800 flex flex-col justify-center items-center'>
      <Header />

      <Match />
    </main>
  );
};
