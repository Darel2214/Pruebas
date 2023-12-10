import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'flowbite-react';
import axios from 'axios';

import { IoFootball } from 'react-icons/io5';

export const Matches = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(import.meta.env.VITE_API + '/api/v2/match');
      setData(data ?? []);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className='flex justify-center items-center flex-col gap-2'>
      <h3 className='dark:text-white text-lg italic'>Lista de Partidos</h3>

      <ListGroup className='w-80'>
        {data.map((item, index) => (
          <Link to={'/partido/' + item._id} key={index}>
            <ListGroup.Item icon={IoFootball} active={item.estado !== 'Activo'}>
              {item.equipo1} VS {item.equipo2} - {item.estado}
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </section>
  );
};
