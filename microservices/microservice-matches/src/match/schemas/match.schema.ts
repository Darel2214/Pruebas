import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MatchDocument = HydratedDocument<Match>;

@Schema({ timestamps: true, versionKey: false, collection: 'partidos' })
export class Match {
  @Prop()
  fecha: Date;
  @Prop()
  equipo1: string;
  @Prop()
  equipo2: string;
  @Prop()
  marcador1: number;
  @Prop()
  marcador2: number;
  @Prop([String])
  mensajes: string[];
}

export const MatchSchema = SchemaFactory.createForClass(Match);
