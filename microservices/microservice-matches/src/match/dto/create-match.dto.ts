import { IsNotEmpty } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  fecha: Date;

  @IsNotEmpty()
  hora: string;

  @IsNotEmpty()
  equipo1: string;

  @IsNotEmpty()
  equipo2: string;

  @IsNotEmpty()
  marcador1: number;

  @IsNotEmpty()
  marcador2: number;

  @IsNotEmpty()
  mensajes: any[string];

  @IsNotEmpty()
  estado: string;
}
