import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MatchDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;
}
