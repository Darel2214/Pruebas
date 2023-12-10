import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Report {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  fecha: string;

  @Field(() => String)
  hora: string;

  @Field(() => String)
  equipo1: string;

  @Field(() => String)
  equipo2: string;

  @Field(() => Int)
  marcador1: number;

  @Field(() => Int)
  marcador2: number;

  @Field(() => [String])
  mensajes: string[];

  @Field(() => String)
  estado: string;
}
