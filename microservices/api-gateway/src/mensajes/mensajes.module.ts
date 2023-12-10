import { Module } from '@nestjs/common';
import { MensajesGateway } from './mensajes.gateway';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  providers: [MensajesGateway],
})
export class MensajesModule {}
