import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true, versionKey: false, collection: 'administradores' })
export class Admin {
  @Prop()
  email: string;
  @Prop()
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
