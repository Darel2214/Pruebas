import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';

export const Match = () => {
  return (
    <section className='flex justify-center items-center flex-col gap-5'>
      <h3 className='dark:text-white text-lg italic'>Emelec Vs Barcelona</h3>

      <article className='flex flex-row gap-10 justify-between items-center dark:text-white text-5xl'>
        <strong>5</strong>
        <p>-</p>
        <strong>1</strong>
      </article>

      <p className='dark:text-white italic'>Falta de Jugador Pepito</p>

      <Link to={'/'}>
        <Button gradientDuoTone='pinkToOrange'>Regresar</Button>
      </Link>
    </section>
  );
};
