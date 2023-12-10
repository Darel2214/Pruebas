import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { AdminDto } from './dto/admin.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private model: Model<Admin>) {}

  async register(dto: AdminDto): Promise<any> {
    dto.password = await bcrypt.hash(dto.password, 10);
    const admin = new this.model(dto);
    admin.save();
    return { message: 'Administrador Creado Exitosamente!' };
  }

  async findOne(dto: AdminDto): Promise<any> {
    const { email, password } = dto;

    const admin = await this.model.findOne({ email }).exec();

    if (!admin) {
      return { message: 'Administrador No Registrado!', success: false };
    }

    const isSamePassword = await bcrypt.compare(password, admin.password);

    if (!isSamePassword) {
      return { message: 'Contraseña Incorrecta!', success: false };
    }

    const name = admin.email.split('@')[0];

    return { message: `Bienvenido ${name}!`, success: true };
  }
}
