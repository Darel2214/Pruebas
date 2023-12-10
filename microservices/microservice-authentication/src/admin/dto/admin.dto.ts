import { IsNotEmpty } from 'class-validator';

export class AdminDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
