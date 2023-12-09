import { Link } from 'react-router-dom';
import { ListGroup } from 'flowbite-react';
import { IoFootball } from 'react-icons/io5';

export const Matches = () => {
  return (
    <section className='flex justify-center items-center flex-col gap-2'>
      <h3 className='dark:text-white text-lg italic'>Lista de Partidos</h3>

      <ListGroup className='w-80'>
        <Link to={'/partido/1'}>
          <ListGroup.Item icon={IoFootball} active>
            Emelec VS Barcelona - Activo
          </ListGroup.Item>
        </Link>

        <Link to={'/partido/2'}>
          <ListGroup.Item icon={IoFootball}>Liga VS Barcelona - Finalizado</ListGroup.Item>
        </Link>

        <Link to={'/partido/3'}>
          <ListGroup.Item icon={IoFootball}>Emelec VS Delfin - Finalizado</ListGroup.Item>
        </Link>

        <Link to={'/partido/4'}>
          <ListGroup.Item icon={IoFootball} active>
            Liga VS Delfin - Activo
          </ListGroup.Item>
        </Link>
      </ListGroup>
    </section>
  );
};
