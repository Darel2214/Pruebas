import { DarkThemeToggle } from 'flowbite-react';

import IconImg from '@/assets/images/icon.png';

export const Header = () => {
  return (
    <header className='flex flex-row gap-5 justify-center items-center h-24'>
      <img src={IconImg} alt='Fulbito App Icon' className='h-full' />
      <h1 className='dark:text-white font-bold text-2xl'>Fulbito APP</h1>
      <DarkThemeToggle />
    </header>
  );
};
