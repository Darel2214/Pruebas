import React, { useState, useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Button } from 'flowbite-react';

export const Match = () => {
  const { id } = useParams();

  const [match, setMatch] = useState(null);

  const initData = async () => {
    const socket = io(import.meta.env.VITE_API);

    socket.emit('get-match', id);

    socket.on('match', (payload) => setMatch(payload));
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <section className='flex justify-center items-center flex-col gap-5'>
      {match && (
        <Fragment>
          <h3 className='dark:text-white text-lg italic'>
            {match?.equipo1} Vs {match?.equipo2}
          </h3>

          <article className='flex flex-row gap-10 justify-between items-center dark:text-white text-5xl'>
            <strong>{match?.marcador1}</strong>
            <p>-</p>
            <strong>{match?.marcador2}</strong>
          </article>

          <p className='dark:text-white italic'>{match?.mensajes[match.mensajes.length - 1]}</p>
        </Fragment>
      )}

      <Link to={'/'}>
        <Button gradientDuoTone='pinkToOrange'>Regresar</Button>
      </Link>
    </section>
  );
};
