import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthMsg } from 'src/common/constants';
import { AdminDto } from 'src/admin/dto/admin.dto';
import { AdminService } from 'src/admin/admin.service';

@Controller()
export class AuthController {
  constructor(private readonly service: AdminService) {}

  @MessagePattern(AuthMsg.REGISTER)
  register(@Payload() dto: AdminDto) {
    return this.service.register(dto);
  }

  @MessagePattern(AuthMsg.LOGIN)
  login(@Payload() dto: AdminDto) {
    return this.service.findOne(dto);
  }
}
