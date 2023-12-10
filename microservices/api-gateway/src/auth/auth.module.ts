import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';

import { AuthController } from './auth.controller';

@Module({
  imports: [ProxyModule],
  controllers: [AuthController],
})
export class AuthModule {}
