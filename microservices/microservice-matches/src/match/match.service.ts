import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';

@Injectable()
export class MatchService {
  private registros: Match[] = [
    {
      id: 1,
      fecha: new Date(),
      equipo1: 'Barcelona',
      equipo2: 'liga',
      marcador1: 1,
      marcador2: 5,
      mensajes: ['dasdasd'],
    },
    {
      id: 2,
      fecha: new Date(),
      equipo1: 'Barcelona',
      equipo2: 'liga',
      marcador1: 1,
      marcador2: 5,
      mensajes: ['dasdasd', 'dasdasd', 'dasdasd', 'dasdasd'],
    },
  ];

  create(createMatchDto: CreateMatchDto) {
    const element = new Match();
    this.registros.sort((a, b) => b.id - a.id);
    element.id = this.registros[0].id + 1;
    element.fecha = createMatchDto.fecha;
    element.equipo1 = createMatchDto.equipo1;
    element.equipo2 = createMatchDto.equipo2;
    element.marcador1 = createMatchDto.marcador1;
    element.marcador2 = createMatchDto.marcador2;
    element.mensajes = createMatchDto.mensajes;
    this.registros.push(element);
    return element;
  }

  findAll() {
    return this.registros;
  }

  findOne(id: number) {
    return this.registros.find((item) => item.id === Number(id));
  }

  update(updateMatchDto: UpdateMatchDto) {
    const element = this.findOne(updateMatchDto.id);
    element.fecha = updateMatchDto.fecha;
    element.equipo1 = updateMatchDto.equipo1;
    element.equipo2 = updateMatchDto.equipo2;
    element.marcador1 = updateMatchDto.marcador1;
    element.marcador2 = updateMatchDto.marcador2;
    element.mensajes = updateMatchDto.mensajes;

    this.registros = this.registros.map((item) => {
      if (item.id === updateMatchDto.id) {
        return element;
      }
      return item;
    });

    return element;
  }

  remove(id: number) {
    const element = this.findOne(id);

    this.registros = this.registros.filter((item) => item.id !== Number(id));

    return element;
  }
}
